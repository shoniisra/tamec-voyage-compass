
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { country: 'United States', value: 655, flagEmoji: '🇺🇸' },
  { country: 'Russia', value: 485, flagEmoji: '🇷🇺' },
  { country: 'China', value: 355, flagEmoji: '🇨🇳' },
  { country: 'Canada', value: 204, flagEmoji: '🇨🇦' },
  { country: 'Mexico', value: 187, flagEmoji: '🇲🇽' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-md">
        <p className="font-medium">{`${payload[0].payload.flagEmoji} ${payload[0].payload.country}`}</p>
        <p className="text-tamec-600 font-bold">{`${payload[0].value} sesiones`}</p>
      </div>
    );
  }

  return null;
};

const SessionsByCountryChart = () => {
  return (
    <div>
      <div className="flex flex-col space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center w-32">
              <span className="mr-2 text-lg">{item.flagEmoji}</span>
              <span className="text-sm truncate">{item.country}</span>
            </div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-tamec-600" 
                  style={{ width: `${(item.value / data[0].value) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-12 text-right font-medium text-sm">
              {item.value}
            </div>
          </div>
        ))}
      </div>
      
      <div className="h-64 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="country" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#0891b2" 
              background={{ fill: '#eee' }}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SessionsByCountryChart;
