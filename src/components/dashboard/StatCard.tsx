import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-card',
    primary: 'bg-primary/10 border-primary/20',
    success: 'bg-accent/10 border-accent/20',
    warning: 'bg-warning/10 border-warning/20',
    danger: 'bg-destructive/10 border-destructive/20'
  };

  const iconVariants = {
    default: 'bg-secondary text-foreground',
    primary: 'gradient-primary text-primary-foreground',
    success: 'gradient-success text-accent-foreground',
    warning: 'gradient-warning text-warning-foreground',
    danger: 'gradient-danger text-destructive-foreground'
  };

  return (
    <div className={cn(
      'rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02]',
      variants[variant]
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              <span className={cn(
                'text-sm font-medium',
                change >= 0 ? 'text-accent' : 'text-destructive'
              )}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          'w-12 h-12 rounded-lg flex items-center justify-center',
          iconVariants[variant]
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
