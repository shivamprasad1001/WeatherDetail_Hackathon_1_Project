
import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { SAFETY_TIPS } from '../constants';
import { IconCheckCircle } from './Icons';

interface SafetyHubCardProps {
  className?: string;
}

type DisasterType = keyof typeof SAFETY_TIPS;

export const SafetyHubCard: React.FC<SafetyHubCardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<DisasterType>('earthquake');
  const disasterTypes = Object.keys(SAFETY_TIPS) as DisasterType[];
  const activeTips = SAFETY_TIPS[activeTab];

  return (
    <GlassCard className={className}>
      <h2 className="text-xl font-semibold mb-4">Safety & Survival Hub</h2>
      <div className="flex border-b border-white/10 mb-4 overflow-x-auto">
        {disasterTypes.map(type => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
              activeTab === type
                ? 'border-b-2 border-indigo-400 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {SAFETY_TIPS[type].title}
          </button>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-bold mb-3">{activeTips.title}</h3>
        <ul className="space-y-2">
          {activeTips.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <IconCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
};
