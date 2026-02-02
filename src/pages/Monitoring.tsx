import React, { useState } from 'react';
import { Video, Camera, AlertTriangle, Circle, RefreshCw, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { mockCameraFeeds, mockAlerts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Monitoring: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState(mockCameraFeeds[0]);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const statusColors = {
    online: 'bg-accent',
    offline: 'bg-muted-foreground',
    alert: 'bg-destructive animate-pulse'
  };

  const activeAlerts = mockAlerts.filter(a => a.type === 'danger' && !a.isRead);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Video className="w-7 h-7 text-primary" />
            Real-time Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Live surveillance and suspicious activity detection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">
              {mockCameraFeeds.filter(c => c.status === 'online').length} Cameras Online
            </span>
          </div>
          {activeAlerts.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-xs font-medium text-destructive">
                {activeAlerts.length} Active Alerts
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Camera View */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-card border-border overflow-hidden">
            <div className="relative aspect-video bg-secondary/50">
              {/* Simulated Camera Feed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Live Feed: {selectedCamera.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedCamera.location}</p>
                </div>
              </div>
              
              {/* Overlay Controls */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge className={cn('gap-1', selectedCamera.status === 'alert' ? 'bg-destructive' : 'bg-accent')}>
                  <Circle className="w-2 h-2 fill-current" />
                  {selectedCamera.status === 'alert' ? 'ALERT' : 'LIVE'}
                </Badge>
                <span className="text-xs text-foreground bg-background/80 px-2 py-1 rounded">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" className="bg-background/80">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-background/80"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>
                <Button size="sm" variant="secondary" className="bg-background/80">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Alert Indicator */}
              {selectedCamera.status === 'alert' && (
                <div className="absolute inset-0 border-4 border-destructive/50 animate-pulse pointer-events-none" />
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{selectedCamera.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCamera.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last Activity</p>
                  <p className="font-medium">{selectedCamera.lastActivity}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Camera Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mockCameraFeeds.map((camera) => (
              <div
                key={camera.id}
                onClick={() => setSelectedCamera(camera)}
                className={cn(
                  'relative aspect-video rounded-lg bg-secondary/50 cursor-pointer transition-all hover:ring-2 hover:ring-primary overflow-hidden',
                  selectedCamera.id === camera.id && 'ring-2 ring-primary',
                  camera.status === 'alert' && 'ring-2 ring-destructive'
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="absolute top-1 left-1">
                  <span className={cn('w-2 h-2 rounded-full block', statusColors[camera.status])} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-background/80 text-xs truncate">
                  {camera.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Camera Status */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Camera Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockCameraFeeds.map((camera) => (
                <div
                  key={camera.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedCamera(camera)}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full', statusColors[camera.status])} />
                    <span className="text-sm font-medium">{camera.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">{camera.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Live Alerts */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                Live Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockAlerts.filter(a => a.type === 'danger').map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                  <p className="text-xs text-destructive mt-2">
                    {new Date(alert.timestamp).toLocaleTimeString()} • {alert.location}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Today's Activity</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <p className="text-2xl font-bold">147</p>
                <p className="text-xs text-muted-foreground">Motion Events</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <p className="text-2xl font-bold text-destructive">8</p>
                <p className="text-xs text-muted-foreground">Alerts Triggered</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <p className="text-2xl font-bold text-accent">6</p>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <p className="text-2xl font-bold text-warning">2</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
