import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { mockRegionalData } from '@/data/mockData';

const RegionalChart: React.FC = () => {
  const colors = [
    'hsl(217, 91%, 60%)',
    'hsl(199, 89%, 48%)',
    'hsl(142, 76%, 36%)',
    'hsl(38, 92%, 50%)',
    'hsl(0, 84%, 60%)',
    'hsl(280, 65%, 60%)'
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Regional Distribution</h3>
          <p className="text-sm text-muted-foreground">Crime cases by district</p>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockRegionalData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
            <XAxis type="number" stroke="hsl(215, 20%, 65%)" fontSize={12} />
            <YAxis dataKey="region" type="category" stroke="hsl(215, 20%, 65%)" fontSize={11} width={75} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 14%)',
                border: '1px solid hsl(217, 33%, 20%)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="crimes" radius={[0, 4, 4, 0]}>
              {mockRegionalData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegionalChart;
