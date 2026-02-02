import React from 'react';
import { Bell, Check, AlertTriangle, AlertCircle, Info, Clock, MapPin, Trash2 } from 'lucide-react';
import { mockAlerts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Alerts: React.FC = () => {
  const alertIcons = {
    danger: AlertTriangle,
    warning: AlertCircle,
    info: Info
  };

  const alertStyles = {
    danger: 'border-destructive/30 bg-destructive/5',
    warning: 'border-warning/30 bg-warning/5',
    info: 'border-info/30 bg-info/5'
  };

  const iconStyles = {
    danger: 'text-destructive',
    warning: 'text-warning',
    info: 'text-info'
  };

  const alertCounts = {
    danger: mockAlerts.filter(a => a.type === 'danger').length,
    warning: mockAlerts.filter(a => a.type === 'warning').length,
    info: mockAlerts.filter(a => a.type === 'info').length,
    unread: mockAlerts.filter(a => !a.isRead).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-7 h-7 text-primary" />
            Alerts & Notifications
          </h1>
          <p className="text-muted-foreground mt-1">
            System alerts and activity notifications
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Check className="w-4 h-4" />
          Mark All Read
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{alertCounts.danger}</p>
              <p className="text-xs text-muted-foreground">Critical</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{alertCounts.warning}</p>
              <p className="text-xs text-muted-foreground">Warnings</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
              <Info className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold">{alertCounts.info}</p>
              <p className="text-xs text-muted-foreground">Info</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{alertCounts.unread}</p>
              <p className="text-xs text-muted-foreground">Unread</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockAlerts.map((alert) => {
            const Icon = alertIcons[alert.type];
            return (
              <div
                key={alert.id}
                className={cn(
                  'p-4 rounded-lg border transition-all hover:scale-[1.01] cursor-pointer',
                  alertStyles[alert.type],
                  !alert.isRead && 'ring-1 ring-offset-1 ring-offset-card',
                  !alert.isRead && alert.type === 'danger' && 'ring-destructive/50',
                  !alert.isRead && alert.type === 'warning' && 'ring-warning/50',
                  !alert.isRead && alert.type === 'info' && 'ring-info/50'
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    alert.type === 'danger' && 'bg-destructive/20',
                    alert.type === 'warning' && 'bg-warning/20',
                    alert.type === 'info' && 'bg-info/20'
                  )}>
                    <Icon className={cn('w-5 h-5', iconStyles[alert.type])} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium">{alert.title}</h4>
                      {!alert.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
