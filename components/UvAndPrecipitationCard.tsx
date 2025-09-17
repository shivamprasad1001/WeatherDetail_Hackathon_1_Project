import React from 'react';
import { GlassCard, SkeletonLoader } from './GlassCard';
import { CurrentWeather } from '../types';
import { IconSun, IconCloudRain } from './Icons';

interface UvAndPrecipitationCardProps {
  loading: boolean;
  data: CurrentWeather | null;
  className?: string;
}

const getUvIndexInfo = (uvIndex: number) => {
  if (uvIndex <= 2) return { level: 'Low', color: 'text-green-400', barColor: 'bg-green-400' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-400', barColor: 'bg-yellow-400' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-400', barColor: 'bg-orange-400' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-400', barColor: 'bg-red-400' };
  return { level: 'Extreme', color: 'text-purple-400', barColor: 'bg-purple-400' };
};

export const UvAndPrecipitationCard: React.FC<UvAndPrecipitationCardProps> = ({ loading, data, className }) => {
  const uvInfo = data ? getUvIndexInfo(data.uvIndex) : getUvIndexInfo(0);
  const precipChance = data ? data.precipitationChance : 0;

  return (
    <GlassCard className={`flex flex-col justify-between ${className}`}>
      {loading && <SkeletonLoader />}
      {!data ? (
        <div className="flex-1 flex items-center justify-center text-white/50">...</div>
      ) : (
        <div className="flex flex-col h-full justify-around">
            {/* UV Index Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <IconSun className="w-5 h-5 text-white/70" />
                <h3 className="font-semibold">UV Index</h3>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">{data.uvIndex}</p>
                <p className={`text-lg font-semibold ${uvInfo.color}`}>{uvInfo.level}</p>
              </div>
              <div className="w-full bg-gray-600/50 rounded-full h-2 mt-2">
                <div className={`${uvInfo.barColor} h-2 rounded-full`} style={{ width: `${(data.uvIndex / 11) * 100}%` }}></div>
              </div>
            </div>

            <div className="border-t border-white/10 my-4"></div>

            {/* Precipitation Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <IconCloudRain className="w-5 h-5 text-white/70" />
                <h3 className="font-semibold">Precipitation</h3>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">{precipChance}<span className="text-2xl">%</span></p>
                <p className="text-lg font-semibold text-blue-300">Chance</p>
              </div>
               <div className="w-full bg-gray-600/50 rounded-full h-2 mt-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${precipChance}%` }}></div>
              </div>
            </div>
        </div>
      )}
    </GlassCard>
  );
};
