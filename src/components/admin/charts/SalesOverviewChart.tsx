
import React from 'react';
import { 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ComposedChart,
  Legend
} from 'recharts';

const data = [
  { month: 'Jan', pageViews: 320, clicks: 480 },
  { month: 'Feb', pageViews: 580, clicks: 400 },
  { month: 'Mar', pageViews: 450, clicks: 520 },
  { month: 'Apr', pageViews: 680, clicks: 550 },
  { month: 'May', pageViews: 470, clicks: 600 },
  { month: 'Jun', pageViews: 640, clicks: 450 },
  { month: 'Jul', pageViews: 430, clicks: 480 },
  { month: 'Aug', pageViews: 450, clicks: 500 },
  { month: 'Sep', pageViews: 900, clicks: 600 },
  { month: 'Oct', pageViews: 540, clicks: 500 },
  { month: 'Nov', pageViews: 670, clicks: 570 },
  { month: 'Dec', pageViews: 700, clicks: 650 },
];

const SalesOverviewChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tickCount={6}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              borderRadius: '8px'
            }} 
          />
          <Legend />
          <Bar 
            dataKey="pageViews" 
            name="Vistas de Página" 
            fill="#0891b2" 
            radius={[4, 4, 0, 0]} 
            barSize={30}
          />
          <Line 
            type="monotone" 
            dataKey="clicks" 
            name="Clicks" 
            stroke="#0e7490" 
            dot={{ r: 0 }}
            activeDot={{ r: 6 }}
            strokeWidth={2} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesOverviewChart;
