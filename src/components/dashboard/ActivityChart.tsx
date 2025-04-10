
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const weeklyData = [
  { day: 'Mon', steps: 7500, calories: 420, minutes: 35 },
  { day: 'Tue', steps: 9200, calories: 550, minutes: 48 },
  { day: 'Wed', steps: 6800, calories: 380, minutes: 32 },
  { day: 'Thu', steps: 10500, calories: 620, minutes: 55 },
  { day: 'Fri', steps: 8300, calories: 490, minutes: 42 },
  { day: 'Sat', steps: 11200, calories: 680, minutes: 65 },
  { day: 'Sun', steps: 5400, calories: 320, minutes: 28 },
];

const monthlyData = [
  { day: 'Week 1', steps: 52000, calories: 3100, minutes: 280 },
  { day: 'Week 2', steps: 58000, calories: 3400, minutes: 310 },
  { day: 'Week 3', steps: 49000, calories: 2900, minutes: 260 },
  { day: 'Week 4', steps: 63000, calories: 3700, minutes: 340 },
];

const ActivityChart: React.FC = () => {
  const [period, setPeriod] = useState('weekly');
  const [metric, setMetric] = useState('steps');
  
  const data = period === 'weekly' ? weeklyData : monthlyData;
  
  // Update to explicitly return string
  const formatYAxis = (value: number): string => {
    if (metric === 'steps') {
      return value >= 1000 ? `${value / 1000}k` : value.toString();
    }
    return value.toString();
  };
  
  const getBarColor = () => {
    switch (metric) {
      case 'steps': return "#8B5CF6";
      case 'calories': return "#F59E0B";
      case 'minutes': return "#0EA5E9";
      default: return "#8B5CF6";
    }
  };
  
  const getYAxisLabel = () => {
    switch (metric) {
      case 'steps': return "Steps";
      case 'calories': return "Calories";
      case 'minutes': return "Minutes";
      default: return "Value";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Activity Trends</CardTitle>
          <div className="flex gap-2">
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="steps">Steps</SelectItem>
                <SelectItem value="calories">Calories</SelectItem>
                <SelectItem value="minutes">Minutes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardDescription>
          Your {metric} over time
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }} 
              />
              <YAxis 
                tickFormatter={formatYAxis} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }} 
                width={40}
                label={{ 
                  value: getYAxisLabel(), 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fontSize: '12px', fill: '#888' } 
                }}
              />
              <Tooltip 
                formatter={(value) => [
                  `${value} ${metric === 'calories' ? 'kcal' : metric === 'minutes' ? 'min' : 'steps'}`, 
                  metric.charAt(0).toUpperCase() + metric.slice(1)
                ]}
                labelStyle={{ color: '#333', fontWeight: 'bold' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #eee',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey={metric} 
                fill={getBarColor()} 
                radius={[4, 4, 0, 0]} 
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
