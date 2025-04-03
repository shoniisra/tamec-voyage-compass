
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Chrome', value: 62.5, sessions: 5060 },
  { name: 'Firefox', value: 12.3, sessions: 1500 },
  { name: 'Safari', value: 9.86, sessions: 1030 },
  { name: 'Brave', value: 3.15, sessions: 300 },
  { name: 'Opera', value: 3.01, sessions: 1580 },
  { name: 'Others', value: 9.18, sessions: 1200 },
];

const COLORS = ['#0891b2', '#0e7490', '#155e75', '#164e63', '#083344', '#99f6e4'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-md">
        <p className="font-medium">{`${payload[0].name}`}</p>
        <p className="text-tamec-600 font-bold">{`${payload[0].value}%`}</p>
        <p className="text-sm text-muted-foreground">{`${payload[0].payload.sessions} sesiones`}</p>
      </div>
    );
  }

  return null;
};

const SessionsByBrowserChart = () => {
  return (
    <div>
      <div className="mb-6 space-y-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-sm mr-2" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm">{entry.name}</span>
            </div>
            <div className="flex space-x-4">
              <span className="text-sm font-medium">{entry.value}%</span>
              <span className="text-sm text-muted-foreground w-12 text-right">{entry.sessions}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SessionsByBrowserChart;
