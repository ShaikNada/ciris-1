import React from 'react';
import { Shield, FileText, CheckCircle, Clock, AlertTriangle, TrendingDown } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import CrimeTrendChart from '@/components/dashboard/CrimeTrendChart';
import RegionalChart from '@/components/dashboard/RegionalChart';
import RecentCases from '@/components/dashboard/RecentCases';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import { mockCrimeStats } from '@/data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-7 h-7 text-primary" />
            Crime Intelligence Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time crime analysis and monitoring system
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Last Updated</p>
          <p className="font-medium">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Cases"
          value={mockCrimeStats.totalCrimes.toLocaleString()}
          icon={FileText}
          variant="primary"
        />
        <StatCard
          title="Solved Cases"
          value={mockCrimeStats.solvedCases.toLocaleString()}
          change={8.3}
          icon={CheckCircle}
          variant="success"
        />
        <StatCard
          title="Pending Cases"
          value={mockCrimeStats.pendingCases.toLocaleString()}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Active Investigations"
          value={mockCrimeStats.activeInvestigations.toLocaleString()}
          icon={AlertTriangle}
          variant="danger"
        />
      </div>

      {/* Crime Rate Indicator */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl gradient-success flex items-center justify-center">
              <TrendingDown className="w-7 h-7 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Crime Rate Index</h3>
              <p className="text-muted-foreground text-sm">Compared to previous month</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{mockCrimeStats.crimeRate}</p>
            <p className="text-accent font-medium">{mockCrimeStats.changeFromLastMonth}% decrease</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CrimeTrendChart />
        <RegionalChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentCases />
        <AlertsPanel />
      </div>
    </div>
  );
};

export default Dashboard;
