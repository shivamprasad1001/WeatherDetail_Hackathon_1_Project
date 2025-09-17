import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { AlertsPanel } from './components/AlertsPanel';
import { useMockApi } from './services/api';
import useLocalStorage from './hooks/useLocalStorage';
import { FloatingAlerts } from './components/FloatingAlerts';
import { SafetyGuide } from './components/SafetyGuide';

type ActiveTab = 'dashboard' | 'safetyGuide';

function App() {
  const [location, setLocation] = useLocalStorage<string>('weather-location', 'New Delhi, India');
  const { currentWeather, hourlyForecast, dailyForecast, alerts, earthquakes, loading } = useMockApi(location);
  const [isAlertsPanelOpen, setIsAlertsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  const toggleAlertsPanel = () => {
    setIsAlertsPanelOpen(prev => !prev);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504221507732-00101464192a?q=80&w=2940&auto=format&fit=crop')"}}>
        <div className="bg-black/60 min-h-screen">
            {isOffline && (
              <div className="bg-yellow-600 text-center p-2 text-sm font-semibold">
                Offline Mode Active. Displaying cached safety information.
              </div>
            )}
            <Header 
                location={location} 
                onLocationChange={handleLocationChange} 
                onToggleAlerts={toggleAlertsPanel} 
                alertCount={alerts.length}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <main className="p-4 sm:p-6 md:p-8">
                {activeTab === 'dashboard' && (
                    <Dashboard
                        loading={loading}
                        currentWeather={currentWeather}
                        hourlyForecast={hourlyForecast}
                        dailyForecast={dailyForecast}
                        alerts={alerts}
                        earthquakes={earthquakes}
                    />
                )}
                {activeTab === 'safetyGuide' && (
                  <SafetyGuide
                    alerts={alerts}
                    location={currentWeather?.location || location}
                  />
                )}
            </main>
            <AlertsPanel
                isOpen={isAlertsPanelOpen}
                onClose={toggleAlertsPanel}
                alerts={alerts}
                loading={loading}
            />
            <FloatingAlerts
                alerts={alerts}
                loading={loading}
            />
        </div>
    </div>
  );
}

export default App;