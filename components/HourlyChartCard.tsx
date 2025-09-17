
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { GlassCard, SkeletonLoader } from './GlassCard';
import { HourlyForecast, Unit } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

interface HourlyChartCardProps {
  loading: boolean;
  data: HourlyForecast[];
  className?: string;
}

export const HourlyChartCard: React.FC<HourlyChartCardProps> = ({ loading, data, className }) => {
  const [unit] = useLocalStorage<Unit>('weather-unit', Unit.Metric);

  const chartData = data.map(item => ({
    ...item,
    temp: unit === Unit.Metric ? item.temp : Math.round(item.temp * 9 / 5 + 32),
  }));
  
  const tempUnit = unit === Unit.Metric ? '°C' : '°F';

  return (
    <GlassCard className={className}>
      {loading && <SkeletonLoader />}
      <h2 className="text-xl font-semibold mb-4">Hourly Forecast</h2>
      <div style={{ width: '100%', height: 200 }}>
        {data.length > 0 && (
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
              <XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.7)" />
              <YAxis stroke="rgba(255, 255, 255, 0.7)" unit={tempUnit} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '10px'
                }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#8884d8' }}
              />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} name={`Temp (${tempUnit})`} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </GlassCard>
  );
};
