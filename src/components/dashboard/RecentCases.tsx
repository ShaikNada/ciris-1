import React from 'react';
import { mockFIRs } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const RecentCases: React.FC = () => {
  const severityColors = {
    low: 'bg-accent/20 text-accent border-accent/30',
    medium: 'bg-primary/20 text-primary border-primary/30',
    high: 'bg-warning/20 text-warning border-warning/30',
    critical: 'bg-destructive/20 text-destructive border-destructive/30'
  };

  const statusColors = {
    pending: 'bg-warning/20 text-warning',
    investigating: 'bg-primary/20 text-primary',
    solved: 'bg-accent/20 text-accent',
    closed: 'bg-muted text-muted-foreground'
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Recent Cases</h3>
          <p className="text-sm text-muted-foreground">Latest FIR submissions</p>
        </div>
        <a href="/fir" className="text-sm text-primary hover:underline">View All</a>
      </div>
      <div className="space-y-4">
        {mockFIRs.slice(0, 5).map((fir) => (
          <div
            key={fir.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
              severityColors[fir.severity]
            )}>
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-medium truncate">{fir.firNumber}</h4>
                <Badge className={cn('text-xs', statusColors[fir.status])}>
                  {fir.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{fir.crimeType}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {fir.district}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(fir.dateTime).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCases;
