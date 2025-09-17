import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from '../types';
import { IconX, IconAlertTriangle } from './Icons';
import { AlertModal } from './AlertModal';
import { GlassCard } from './GlassCard';

interface FloatingAlertsProps {
  alerts: Alert[];
  loading: boolean;
}

const severityStyles = {
    Severe: {
        container: 'border-orange-500/50',
        iconContainer: 'bg-orange-500/20',
        icon: 'text-orange-300',
    },
    Extreme: {
        container: 'border-red-600/50',
        iconContainer: 'bg-red-600/20',
        icon: 'text-red-300',
    },
    Moderate: { // Added for type safety, but not used in filtering
        container: 'border-yellow-400/50',
        iconContainer: 'bg-yellow-400/20',
        icon: 'text-yellow-300',
    },
};

export const FloatingAlerts: React.FC<FloatingAlertsProps> = ({ alerts, loading }) => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const criticalAlerts = useMemo(() => 
    alerts.filter(a => a.severity === 'Severe' || a.severity === 'Extreme'),
    [alerts]
  );
  
  useEffect(() => {
    // Auto-pop the panel when new critical alerts are loaded
    if (criticalAlerts.length > 0 && !loading) {
      setIsVisible(true);
    }
  }, [criticalAlerts, loading]);

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
  };

  const handleCloseModal = () => {
    setSelectedAlert(null);
  };
  
  const handleDismissPanel = () => {
    setIsVisible(false);
  };

  if (!isVisible || criticalAlerts.length === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed top-20 right-4 sm:right-6 md:right-8 z-50 w-full max-w-sm">
        <GlassCard className="border-2 border-red-500/50">
           <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-red-300">Critical Alerts</h3>
                <button onClick={handleDismissPanel} className="text-white/50 hover:text-white transition">
                    <IconX className="w-5 h-5" />
                </button>
            </div>
            <ul className="space-y-3">
              {criticalAlerts.map(alert => {
                const styles = severityStyles[alert.severity];
                return (
                  <li key={alert.id}>
                    <button 
                      className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors bg-black/30 hover:bg-black/50 border ${styles.container}`}
                      onClick={() => handleAlertClick(alert)}
                    >
                      <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${styles.iconContainer}`}>
                        <IconAlertTriangle className={`w-5 h-5 ${styles.icon}`} />
                      </div>
                      <div>
                        <p className={`font-semibold ${styles.icon}`}>{alert.type}</p>
                        <p className="text-xs text-white/70 truncate">{alert.description}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
        </GlassCard>
      </div>
      <AlertModal alert={selectedAlert} onClose={handleCloseModal} />
    </>
  );
};
