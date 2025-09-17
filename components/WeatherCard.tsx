import React from 'react';
import { GlassCard, SkeletonLoader } from './GlassCard';
import { CurrentWeather, Unit } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { IconSun, IconWind, IconDroplet, IconCloudRain, IconUvIndex } from './Icons';

interface WeatherCardProps {
  loading: boolean;
  data: CurrentWeather | null;
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ loading, data, className }) => {
  const [unit, setUnit] = useLocalStorage<Unit>('weather-unit', Unit.Metric);

  const toggleUnit = () => {
    setUnit(unit === Unit.Metric ? Unit.Imperial : Unit.Metric);
  };

  const displayTemp = (temp: number) => {
    return unit === Unit.Metric ? Math.round(temp) : Math.round(temp * 9/5 + 32);
  };
  
  const displaySpeed = (speed: number) => {
    return unit === Unit.Metric ? Math.round(speed) : Math.round(speed / 1.609);
  };

  const tempUnit = unit === Unit.Metric ? '°C' : '°F';
  const speedUnit = unit === Unit.Metric ? 'km/h' : 'mph';

  return (
    <GlassCard className={`flex flex-col justify-between ${className}`}>
      {loading && <SkeletonLoader />}
      {!data ? (
        <div className="flex-1 flex items-center justify-center text-white/50">Loading weather...</div>
      ) : (
        <>
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-semibold">{data.location}</p>
                <p className="text-white/70">{data.description}</p>
              </div>
              <div className="text-4xl">{data.icon}</div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <p className="text-7xl font-bold">{displayTemp(data.temp)}<span className="text-4xl font-light align-top">{tempUnit}</span></p>
              <button onClick={toggleUnit} className="text-sm bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition">
                Switch to {unit === Unit.Metric ? '°F' : '°C'}
              </button>
            </div>
            <p className="text-sm text-white/70 mt-1">Feels like {displayTemp(data.feels_like)}{tempUnit}</p>
          </div>
          <div className="mt-6 border-t border-white/10 pt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <IconDroplet className="w-5 h-5 text-white/70" />
              <span>Humidity: {data.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <IconWind className="w-5 h-5 text-white/70" />
              <span>Wind: {displaySpeed(data.wind_speed)} {speedUnit}</span>
            </div>
             <div className="flex items-center gap-2">
              <IconCloudRain className="w-5 h-5 text-white/70" />
              <span>Precip: {data.precipitationChance}%</span>
            </div>
             <div className="flex items-center gap-2">
              <IconUvIndex className="w-5 h-5 text-white/70" />
              <span>UV Index: {data.uvIndex}</span>
            </div>
          </div>
        </>
      )}
    </GlassCard>
  );
};