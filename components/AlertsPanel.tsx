import React, { useState } from 'react';
import { Alert } from '../types';
import { IconX } from './Icons';
import { AlertModal } from './AlertModal';

interface AlertsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: Alert[];
  loading: boolean;
}

const severityStyles = {
    Moderate: 'border-l-4 border-yellow-400',
    Severe: 'border-l-4 border-orange-500',
    Extreme: 'border-l-4 border-red-600',
};

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ isOpen, onClose, alerts, loading }) => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
  };

  const handleCloseModal = () => {
    setSelectedAlert(null);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900/80 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Active Alerts</h2>
                <button onClick={onClose} className="text-white/50 hover:text-white transition">
                    <IconX className="w-6 h-6" />
                </button>
            </div>
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/50"></div>
                </div>
            ) : alerts.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-white/50">
                    No active alerts.
                </div>
            ) : (
                <ul className="space-y-4 overflow-y-auto flex-1 pr-2">
                    {alerts.map(alert => (
                        <li 
                            key={alert.id} 
                            className={`p-4 rounded-lg bg-black/30 cursor-pointer hover:bg-black/50 transition ${severityStyles[alert.severity]}`}
                            onClick={() => handleAlertClick(alert)}
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold">{alert.type}</h3>
                                <span className="text-xs text-white/60">{alert.time}</span>
                            </div>
                            <p className="text-sm text-white/70 mt-1 truncate">{alert.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
      </aside>
      <AlertModal alert={selectedAlert} onClose={handleCloseModal} />
    </>
  );
};
