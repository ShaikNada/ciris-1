import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, PieChart, Map, Calendar } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line
} from 'recharts';
import { mockCrimeTrends, mockRegionalData, mockCrimeStats } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CrimeAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');

  const pieData = [
    { name: 'Theft', value: 35, color: 'hsl(217, 91%, 60%)' },
    { name: 'Assault', value: 20, color: 'hsl(0, 84%, 60%)' },
    { name: 'Fraud', value: 25, color: 'hsl(38, 92%, 50%)' },
    { name: 'Vandalism', value: 10, color: 'hsl(142, 76%, 36%)' },
    { name: 'Other', value: 10, color: 'hsl(280, 65%, 60%)' }
  ];

  const resolutionData = [
    { month: 'Jul', resolved: 78, pending: 22 },
    { month: 'Aug', resolved: 82, pending: 18 },
    { month: 'Sep', resolved: 75, pending: 25 },
    { month: 'Oct', resolved: 85, pending: 15 },
    { month: 'Nov', resolved: 88, pending: 12 },
    { month: 'Dec', resolved: 92, pending: 8 },
    { month: 'Jan', resolved: 90, pending: 10 }
  ];

  const heatmapData = [
    { hour: '00:00', mon: 2, tue: 3, wed: 1, thu: 2, fri: 4, sat: 8, sun: 6 },
    { hour: '04:00', mon: 1, tue: 1, wed: 1, thu: 1, fri: 2, sat: 3, sun: 2 },
    { hour: '08:00', mon: 5, tue: 6, wed: 5, thu: 7, fri: 6, sat: 4, sun: 3 },
    { hour: '12:00', mon: 8, tue: 9, wed: 10, thu: 8, fri: 12, sat: 7, sun: 5 },
    { hour: '16:00', mon: 12, tue: 11, wed: 13, thu: 14, fri: 15, sat: 10, sun: 8 },
    { hour: '20:00', mon: 7, tue: 8, wed: 9, thu: 10, fri: 14, sat: 12, sun: 9 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-primary" />
            Crime Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive crime rate analysis and visualization
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Crime Rate</p>
                <p className="text-3xl font-bold">{mockCrimeStats.crimeRate}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-accent" />
              </div>
            </div>
            <p className="text-xs text-accent mt-2">↓ 5.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Solve Rate</p>
                <p className="text-3xl font-bold">71.5%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-xs text-primary mt-2">↑ 3.8% improvement</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-3xl font-bold">12m</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-accent" />
              </div>
            </div>
            <p className="text-xs text-accent mt-2">↓ 2 min faster</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Officers</p>
                <p className="text-3xl font-bold">234</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-xs text-primary mt-2">↑ 12 more deployed</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="trends">Crime Trends</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="resolution">Resolution Rate</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Monthly Crime Trends</CardTitle>
              <CardDescription>Crime type distribution over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockCrimeTrends}>
                    <defs>
                      <linearGradient id="areaTheft" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="areaAssault" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="areaFraud" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                    <XAxis dataKey="month" stroke="hsl(215, 20%, 65%)" />
                    <YAxis stroke="hsl(215, 20%, 65%)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(222, 47%, 14%)',
                        border: '1px solid hsl(217, 33%, 20%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="theft" stroke="hsl(217, 91%, 60%)" fill="url(#areaTheft)" />
                    <Area type="monotone" dataKey="assault" stroke="hsl(0, 84%, 60%)" fill="url(#areaAssault)" />
                    <Area type="monotone" dataKey="fraud" stroke="hsl(38, 92%, 50%)" fill="url(#areaFraud)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Crime Type Distribution</CardTitle>
                <CardDescription>Percentage breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(222, 47%, 14%)',
                          border: '1px solid hsl(217, 33%, 20%)',
                          borderRadius: '8px'
                        }}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Detailed statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.value}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resolution">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Case Resolution Rate</CardTitle>
              <CardDescription>Monthly resolved vs pending cases percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resolutionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                    <XAxis dataKey="month" stroke="hsl(215, 20%, 65%)" />
                    <YAxis stroke="hsl(215, 20%, 65%)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(222, 47%, 14%)',
                        border: '1px solid hsl(217, 33%, 20%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="resolved" stackId="a" fill="hsl(142, 76%, 36%)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="pending" stackId="a" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  District-wise Analysis
                </CardTitle>
                <CardDescription>Crime statistics by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockRegionalData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
                      <XAxis type="number" stroke="hsl(215, 20%, 65%)" />
                      <YAxis dataKey="region" type="category" stroke="hsl(215, 20%, 65%)" width={100} fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(222, 47%, 14%)',
                          border: '1px solid hsl(217, 33%, 20%)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="solved" fill="hsl(142, 76%, 36%)" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="pending" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Regional Statistics</CardTitle>
                <CardDescription>Detailed breakdown by district</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRegionalData.map((region, index) => {
                    const solveRate = Math.round((region.solved / region.crimes) * 100);
                    return (
                      <div key={region.region} className="p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{region.region}</span>
                          <span className="text-sm text-muted-foreground">{region.crimes} cases</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-accent">✓ {region.solved} solved</span>
                          <span className="text-warning">⏳ {region.pending} pending</span>
                          <span className="text-primary ml-auto">{solveRate}% rate</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrimeAnalytics;
