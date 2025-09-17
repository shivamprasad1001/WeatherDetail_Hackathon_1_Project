import React, { useState, useMemo } from 'react';
import { GlassCard, SkeletonLoader } from './GlassCard';
import { Earthquake } from '../types';
import { IconMapPin } from './Icons';

interface EarthquakeFeedCardProps {
  loading: boolean;
  data: Earthquake[];
  className?: string;
}

const MagnitudeLegend: React.FC<{ mag: number }> = ({ mag }) => {
  const getColor = (magnitude: number) => {
    if (magnitude < 4) return 'bg-green-500';
    if (magnitude < 6) return 'bg-yellow-500';
    if (magnitude < 7) return 'bg-orange-500';
    return 'bg-red-600';
  };
  return (
    <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-white font-bold text-lg ${getColor(mag)} shadow-md`}>
      {mag.toFixed(1)}
    </div>
  );
};

const formatTimeAgo = (timestamp: number) => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

export const EarthquakeFeedCard: React.FC<EarthquakeFeedCardProps> = ({ loading, data, className }) => {
  const [minMagnitude, setMinMagnitude] = useState(0);

  const filteredEarthquakes = useMemo(() => {
    return data
      .filter(eq => eq.mag >= minMagnitude)
      .sort((a, b) => b.time - a.time);
  }, [data, minMagnitude]);

  return (
    <GlassCard className={`flex flex-col ${className}`}>
      {loading && <SkeletonLoader />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Live Earthquake Feed</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="magnitude" className="text-sm">Mag. &gt;=</label>
          <select 
            id="magnitude"
            value={minMagnitude}
            onChange={(e) => setMinMagnitude(Number(e.target.value))}
            className="bg-black/30 border border-white/20 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="0">All</option>
            <option value="4">4.0</option>
            <option value="5">5.0</option>
            <option value="6">6.0</option>
          </select>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '300px' }}>
        <ul className="space-y-4">
          {filteredEarthquakes.map(eq => (
            <li key={eq.id} className="flex items-center gap-4">
              <MagnitudeLegend mag={eq.mag} />
              <div className="flex-1">
                <p className="font-semibold flex items-center gap-1">
                  <IconMapPin className="w-4 h-4 text-white/70" /> {eq.place}
                </p>
                <div className="text-sm text-white/70 flex flex-wrap gap-x-4 gap-y-1">
                  <span>{formatTimeAgo(eq.time)}</span>
                  <span>Depth: {eq.depth} km</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
};