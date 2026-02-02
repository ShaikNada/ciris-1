import React from 'react';
import { mockAlerts } from '@/data/mockData';
import { AlertTriangle, AlertCircle, Info, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const AlertsPanel: React.FC = () => {
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

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Active Alerts</h3>
          <p className="text-sm text-muted-foreground">Real-time notifications</p>
        </div>
        <a href="/alerts" className="text-sm text-primary hover:underline">View All</a>
      </div>
      <div className="space-y-3">
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
              <div className="flex items-start gap-3">
                <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconStyles[alert.type])} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {alert.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                {!alert.isRead && (
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;
