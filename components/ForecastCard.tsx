
import React from 'react';
import { GlassCard, SkeletonLoader } from './GlassCard';
import { DailyForecast, Unit } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

interface ForecastCardProps {
  loading: boolean;
  data: DailyForecast[];
  className?: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ loading, data, className }) => {
  const [unit] = useLocalStorage<Unit>('weather-unit', Unit.Metric);
  
  const displayTemp = (temp: number) => {
    return unit === Unit.Metric ? temp : Math.round(temp * 9/5 + 32);
  };
  const tempUnit = unit === Unit.Metric ? '°C' : '°F';

  return (
    <GlassCard className={className}>
      {loading && <SkeletonLoader />}
      <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
      <div className="flex justify-between items-center gap-2 text-center overflow-x-auto pb-2">
        {data.map((day, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center p-2 rounded-lg bg-white/5 w-20">
            <p className="font-semibold text-sm">{day.day}</p>
            <p className="text-3xl my-2">{day.icon}</p>
            <p className="text-lg font-bold">{displayTemp(day.temp)}{tempUnit}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
