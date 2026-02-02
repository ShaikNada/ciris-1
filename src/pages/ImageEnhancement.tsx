import React, { useState, useRef } from 'react';
import { ImagePlus, Upload, Sliders, Download, RotateCcw, Sun, Contrast, Droplets, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ImageEnhancement: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [sharpness, setSharpness] = useState([100]);
  const [zoom, setZoom] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetFilters = () => {
    setBrightness([100]);
    setContrast([100]);
    setSaturation([100]);
    setSharpness([100]);
    setZoom(1);
  };

  const imageStyle = {
    filter: `brightness(${brightness[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%)`,
    transform: `scale(${zoom})`
  };

  const presetFilters = [
    { name: 'Original', brightness: 100, contrast: 100, saturation: 100 },
    { name: 'High Contrast', brightness: 100, contrast: 150, saturation: 100 },
    { name: 'Night Vision', brightness: 150, contrast: 120, saturation: 50 },
    { name: 'Enhanced Detail', brightness: 110, contrast: 130, saturation: 90 },
    { name: 'Desaturated', brightness: 100, contrast: 110, saturation: 0 },
    { name: 'Vivid', brightness: 105, contrast: 120, saturation: 140 }
  ];

  const applyPreset = (preset: typeof presetFilters[0]) => {
    setBrightness([preset.brightness]);
    setContrast([preset.contrast]);
    setSaturation([preset.saturation]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ImagePlus className="w-7 h-7 text-primary" />
            Image Enhancement
          </h1>
          <p className="text-muted-foreground mt-1">
            Advanced image processing for evidence clarity
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetFilters} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button className="gradient-primary text-primary-foreground gap-2" disabled={!selectedImage}>
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Preview */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Image Preview</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                    disabled={!selectedImage}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground w-16 text-center">{Math.round(zoom * 100)}%</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                    disabled={!selectedImage}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-secondary/50 rounded-lg overflow-hidden flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded evidence"
                    className="max-w-full max-h-full object-contain transition-all duration-200"
                    style={imageStyle}
                  />
                ) : (
                  <div
                    className="flex flex-col items-center justify-center cursor-pointer w-full h-full hover:bg-secondary/70 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Click to upload image</p>
                    <p className="text-sm text-muted-foreground">or drag and drop</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </CardContent>
          </Card>

          {/* Presets */}
          <Card className="bg-card border-border mt-4">
            <CardHeader>
              <CardTitle className="text-base">Quick Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {presetFilters.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    className="text-xs h-auto py-2"
                    onClick={() => applyPreset(preset)}
                    disabled={!selectedImage}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="w-5 h-5" />
                Adjustments
              </CardTitle>
              <CardDescription>Fine-tune image parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    Brightness
                  </Label>
                  <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
                </div>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  min={0}
                  max={200}
                  step={1}
                  disabled={!selectedImage}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Contrast className="w-4 h-4" />
                    Contrast
                  </Label>
                  <span className="text-sm text-muted-foreground">{contrast[0]}%</span>
                </div>
                <Slider
                  value={contrast}
                  onValueChange={setContrast}
                  min={0}
                  max={200}
                  step={1}
                  disabled={!selectedImage}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    Saturation
                  </Label>
                  <span className="text-sm text-muted-foreground">{saturation[0]}%</span>
                </div>
                <Slider
                  value={saturation}
                  onValueChange={setSaturation}
                  min={0}
                  max={200}
                  step={1}
                  disabled={!selectedImage}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <ImagePlus className="w-4 h-4" />
                    Sharpness
                  </Label>
                  <span className="text-sm text-muted-foreground">{sharpness[0]}%</span>
                </div>
                <Slider
                  value={sharpness}
                  onValueChange={setSharpness}
                  min={0}
                  max={200}
                  step={1}
                  disabled={!selectedImage}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">AI Enhancement</CardTitle>
              <CardDescription>Automated image restoration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2" disabled={!selectedImage}>
                <span className="w-2 h-2 rounded-full bg-primary" />
                Denoise Image
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" disabled={!selectedImage}>
                <span className="w-2 h-2 rounded-full bg-accent" />
                Super Resolution
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" disabled={!selectedImage}>
                <span className="w-2 h-2 rounded-full bg-warning" />
                Face Enhancement
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" disabled={!selectedImage}>
                <span className="w-2 h-2 rounded-full bg-info" />
                Low-light Restoration
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full" disabled={!selectedImage}>
                Save as PNG
              </Button>
              <Button variant="outline" className="w-full" disabled={!selectedImage}>
                Save as JPEG
              </Button>
              <Button variant="outline" className="w-full" disabled={!selectedImage}>
                Add to Evidence
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageEnhancement;
