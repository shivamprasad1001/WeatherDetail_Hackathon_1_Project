
import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { EMERGENCY_CONTACTS } from '../constants';
import { EmergencyContact } from '../types';

interface EmergencyNumbersCardProps {
  className?: string;
}

export const EmergencyNumbersCard: React.FC<EmergencyNumbersCardProps> = ({ className }) => {
  const [selectedCountry, setSelectedCountry] = useState<EmergencyContact>(EMERGENCY_CONTACTS[0]);

  return (
    <GlassCard className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Emergency Numbers</h2>
        <select
          value={selectedCountry.country}
          onChange={(e) => setSelectedCountry(EMERGENCY_CONTACTS.find(c => c.country === e.target.value)!)}
          className="bg-black/30 border border-white/20 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {EMERGENCY_CONTACTS.map(c => (
            <option key={c.country} value={c.country}>{c.country}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-sm text-white/70">Police</p>
          <a href={`tel:${selectedCountry.police}`} className="text-2xl font-bold hover:text-indigo-400 transition">{selectedCountry.police}</a>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-sm text-white/70">Ambulance</p>
          <a href={`tel:${selectedCountry.ambulance}`} className="text-2xl font-bold hover:text-indigo-400 transition">{selectedCountry.ambulance}</a>
        </div>
        <div className="bg-white/5 p-4 rounded-lg col-span-2 sm:col-span-1">
          <p className="text-sm text-white/70">Fire</p>
          <a href={`tel:${selectedCountry.fire}`} className="text-2xl font-bold hover:text-indigo-400 transition">{selectedCountry.fire}</a>
        </div>
      </div>
    </GlassCard>
  );
};
