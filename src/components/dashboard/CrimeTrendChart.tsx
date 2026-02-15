import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockCrimeTrends } from '@/data/mockData';

const CrimeTrendChart: React.FC = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Crime Trends</h3>
          <p className="text-sm text-muted-foreground">Monthly crime type distribution</p>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockCrimeTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTheft" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAssault" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorVandalism" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
            <XAxis dataKey="month" stroke="hsl(215, 20%, 65%)" fontSize={12} />
            <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 14%)',
                border: '1px solid hsl(217, 33%, 20%)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Area type="monotone" dataKey="theft" stroke="hsl(217, 91%, 60%)" fillOpacity={1} fill="url(#colorTheft)" />
            <Area type="monotone" dataKey="assault" stroke="hsl(0, 84%, 60%)" fillOpacity={1} fill="url(#colorAssault)" />
            <Area type="monotone" dataKey="fraud" stroke="hsl(38, 92%, 50%)" fillOpacity={1} fill="url(#colorFraud)" />
            <Area type="monotone" dataKey="vandalism" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorVandalism)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CrimeTrendChart;
