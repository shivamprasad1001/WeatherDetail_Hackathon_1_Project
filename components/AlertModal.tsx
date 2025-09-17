import React from 'react';
import { Alert } from '../types';
import { GlassCard } from './GlassCard';
import { IconX, IconAlertTriangle } from './Icons';

interface AlertModalProps {
  alert: Alert | null;
  onClose: () => void;
}

const severityStyles = {
    Moderate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    Severe: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
    Extreme: 'bg-red-600/20 text-red-300 border-red-600/50',
};

export const AlertModal: React.FC<AlertModalProps> = ({ alert, onClose }) => {
  if (!alert) return null;

  const severityClass = severityStyles[alert.severity] || severityStyles.Moderate;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <GlassCard 
        className={`w-full max-w-lg relative border-2 ${severityClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition">
          <IconX className="w-6 h-6" />
        </button>
        <div className="flex items-start gap-4">
            <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${severityClass.split(' ')[0]}`}>
                <IconAlertTriangle className={`w-6 h-6 ${severityClass.split(' ')[1]}`} />
            </div>
            <div>
                <h2 className="text-2xl font-bold">{alert.type}</h2>
                <div className="flex items-center gap-4 text-sm mt-1 text-white/70">
                    <span className={`font-semibold ${severityClass.split(' ')[1]}`}>{alert.severity} Severity</span>
                    <span>{alert.time}</span>
                </div>
                <p className="mt-4 text-white/90">
                    {alert.description}
                </p>
            </div>
        </div>
      </GlassCard>
    </div>
  );
};
