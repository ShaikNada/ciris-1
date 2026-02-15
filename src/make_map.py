import pandas as pd
import geopandas as gpd
import folium

import os

# ----------------------------
# SETTINGS
# ----------------------------
# Determine the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

# Point to the files in the data subdirectory
# Note: The actual files on disk currently have double extensions (.csv.csv and .geojson.json)
CRIME_CSV = os.path.join(DATA_DIR, "telangana_ipc_2014_long.csv.csv")
GEOJSON = os.path.join(DATA_DIR, "telangana_districts.geojson.json")

# Extract filename for output path relative to script location
# We save to the public/ folder so the React app can serve it as a static asset
OUT_HTML = os.path.join(BASE_DIR, "..", "public", "crime_map.html")

# Option A: set this to False to map ONLY the 10 admin districts (cleanest)
# Option B: set this to True to "fold" police units into nearby districts (approx)
FOLD_POLICE_UNITS = True

# ----------------------------
# 1) Load crime data
# ----------------------------
df = pd.read_csv(CRIME_CSV)

# remove "Total" row
df = df[df["District"].str.strip().str.lower() != "total"].copy()

# ----------------------------
# 2) (Optional) fold police units to district names in the GeoJSON
# GeoJSON has these district names:
# ADILABAD, HYDERABAD, KARIMNAGAR, KHAMMAM, MAHABUBNAGAR,
# MEDAK, NALGONDA, NIZAMABAD, RANGAREDDY, WARANGAL
# ----------------------------
if FOLD_POLICE_UNITS:
    fold_map = {
        "Hyderabad City": "HYDERABAD",
        "Secunderabad Railway": "HYDERABAD",   # approximation
        "Warangal Urban": "WARANGAL",          # approximation
        "Cyberabad": "RANGAREDDY",             # approximation
        "Mahaboob Nagar": "MAHABUBNAGAR",
        "Ranga Reddy": "RANGAREDDY",
    }
    df["DIST_KEY"] = df["District"].replace(fold_map)
else:
    # only normalize spellings that should match the 10 districts
    name_fix = {
        "Mahaboob Nagar": "MAHABUBNAGAR",
        "Ranga Reddy": "RANGAREDDY",
        "Warangal Urban": "WARANGAL",
        "Hyderabad City": "HYDERABAD",
    }
    df["DIST_KEY"] = df["District"].replace(name_fix)

df["DIST_KEY"] = df["DIST_KEY"].astype(str).str.upper().str.strip()

# ----------------------------
# 3) Aggregate: total crimes per district
# ----------------------------
totals = df.groupby("DIST_KEY", as_index=False)["COUNT"].sum().rename(columns={"COUNT": "TOTAL_CRIMES"})

# Top crime type per district
top = (
    df.sort_values(["DIST_KEY", "COUNT"], ascending=[True, False])
      .groupby("DIST_KEY", as_index=False)
      .first()[["DIST_KEY", "CRIME_TYPE", "COUNT"]]
      .rename(columns={"CRIME_TYPE": "TOP_CRIME", "COUNT": "TOP_CRIME_COUNT"})
)

summary = totals.merge(top, on="DIST_KEY", how="left")

# ----------------------------
# 4) Load GeoJSON boundaries
# ----------------------------
gdf = gpd.read_file(GEOJSON)

# In this GeoJSON, district name field is "D_N"
gdf["DIST_KEY"] = gdf["D_N"].astype(str).str.upper().str.strip()

# Join crime summary onto polygons
gdf = gdf.merge(summary, on="DIST_KEY", how="left")

from folium.features import DivIcon

# ----------------------------
# 5) Build interactive map
# ----------------------------
minx, miny, maxx, maxy = gdf.total_bounds

# Add a small buffer to the bounds so the user can pan slightly around the edges
buffer = 0.5
bounds_padded = [[miny - buffer, minx - buffer], [maxy + buffer, maxx + buffer]]

# Create map with restrictions
m = folium.Map(
    tiles="cartodbpositron",
    min_zoom=7,           # Prevent zooming out too far (world view)
    max_bounds=True,      # Restrict panning
    min_lat=miny - buffer,
    max_lat=maxy + buffer,
    min_lon=minx - buffer,
    max_lon=maxx + buffer
)

# Fit the map to the padded bounds
m.fit_bounds(bounds_padded)


# ----------------------------
# 5.1) Add Choropleth (The Colors)
# ----------------------------
folium.Choropleth(
    geo_data=gdf.to_json(),
    data=gdf,
    columns=["DIST_KEY", "TOTAL_CRIMES"],
    key_on="feature.properties.DIST_KEY",
    fill_color="YlOrRd",     # Yellow -> Orange -> Red
    fill_opacity=0.7,
    line_opacity=0.2,
    legend_name="Total crimes (2014)"
).add_to(m)

# ----------------------------
# 5.2) Add Tooltip Layer (Transparent)
# ----------------------------
# We add a second layer just for the tooltip.
# It MUST be transparent so we see the Choropleth colors underneath.
tooltip = folium.GeoJsonTooltip(
    fields=["D_N", "TOTAL_CRIMES", "TOP_CRIME", "TOP_CRIME_COUNT"],
    aliases=["District:", "Total crimes:", "Top crime:", "Top crime count:"],
    localize=True
)

folium.GeoJson(
    gdf.to_json(),
    tooltip=tooltip,
    style_function=lambda x: {
        'color': 'transparent',
        'fillColor': 'transparent',
        'weight': 0,
        'fillOpacity': 0
    },
    highlight_function=lambda x: {
        'weight': 3,
        'color': '#666',
        'fillOpacity': 0
    }
).add_to(m)

# ----------------------------
# 6) Add static labels for Districts
# ----------------------------
# Ensure we map over a copy to avoid SettingWithCopy warnings if any
gdf_labels = gdf.copy()
# Calculate centroids (representative points are better for labels as they are guaranteed to be inside polygon)
gdf_labels["centroid"] = gdf_labels.geometry.representative_point()

for _, row in gdf_labels.iterrows():
    # skip if no geometry or name
    if row.geometry is None:
        continue
    
    # Text to display
    label_text = row["D_N"]
    
    # Add a marker with a text icon
    folium.Marker(
        location=[row.centroid.y, row.centroid.x],
        icon=DivIcon(
            icon_size=(150,36),
            icon_anchor=(75, 18),
            html=f'<div style="font-size: 8pt; font-weight: bold; color: black; text-align: center; white-space: nowrap;">{label_text}</div>'
        )
    ).add_to(m)

m.save(OUT_HTML)
print("✅ Saved:", OUT_HTML)

# ----------------------------
# 7) Quick check: which districts didn't match?
# ----------------------------
missing = set(summary["DIST_KEY"]) - set(gdf["DIST_KEY"])
if missing:
    print("⚠️ These crime units were not found in the GeoJSON and won't be colored as polygons:")
    print(missing)