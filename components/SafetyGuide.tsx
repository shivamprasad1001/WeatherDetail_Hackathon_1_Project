import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GlassCard } from './GlassCard';
import { Alert } from '../types';
import { SAFETY_TIPS, EMERGENCY_CONTACTS } from '../constants';
import { EmergencyContact } from '../types';
import { IconCheckCircle, IconDownload } from './Icons';

declare var L: any; // Declare Leaflet global

type DisasterType = keyof typeof SAFETY_TIPS;

// --- Helper Components ---
const EmergencyNumbers: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<EmergencyContact>(EMERGENCY_CONTACTS[0]);

  return (
    <GlassCard>
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

const mockGeocode = (place: string): [number, number] => {
  if (place.toLowerCase().includes('delhi')) return [28.61, 77.23];
  if (place.toLowerCase().includes('tokyo')) return [35.68, 139.76];
  if (place.toLowerCase().includes('mumbai')) return [19.07, 72.87];
  let hash = 0;
  for (let i = 0; i < place.length; i++) { hash = ((hash << 5) - hash) + place.charCodeAt(i); hash |= 0; }
  const lat = ((hash & 0xFFFF) / 0xFFFF) * 180 - 90;
  const lon = (((hash >> 16) & 0xFFFF) / 0xFFFF) * 360 - 180;
  return [lat, lon];
};

const NearbyServicesMap: React.FC<{ location: string }> = ({ location }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current, { zoomControl: false });
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; CARTO',
            }).addTo(mapRef.current);
        }
        return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            const center = mockGeocode(location);
            mapRef.current.setView(center, 12);
            // Mock nearby services
            const services = [
                { name: 'City Hospital', coords: [center[0] + 0.02, center[1] - 0.02], icon: 'H' },
                { name: 'Community Shelter', coords: [center[0] - 0.01, center[1] + 0.03], icon: 'S' },
                { name: 'Police Station', coords: [center[0] + 0.01, center[1] + 0.01], icon: 'P' },
            ];
             services.forEach(s => {
                const iconHtml = `<div class="w-8 h-8 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center border-2 border-white">${s.icon}</div>`
                const customIcon = L.divIcon({ html: iconHtml, className: '' });
                L.marker(s.coords, { icon: customIcon }).addTo(mapRef.current).bindPopup(s.name);
            });
        }
    }, [location]);

    return (
        <GlassCard>
            <h2 className="text-xl font-semibold mb-4">Nearby Help Centers</h2>
            <div ref={mapContainerRef} className="w-full h-64 rounded-lg overflow-hidden" />
        </GlassCard>
    );
};


// --- Main Component ---
interface SafetyGuideProps {
  alerts: Alert[];
  location: string;
}

export const SafetyGuide: React.FC<SafetyGuideProps> = ({ alerts, location }) => {
  const alertToDisasterMap: { [key: string]: DisasterType } = {
    'earthquake': 'earthquake',
    'tsunami': 'tsunami',
    'flood': 'flood',
    'wildfire': 'wildfire',
    'thunderstorm': 'thunderstorm',
    'cyclone': 'cyclone',
    'heatwave': 'heatwave',
  };

  const getActiveDisasterFromAlerts = () => {
    if (alerts.length > 0) {
      const highestSeverityAlert = alerts.sort((a,b) => {
        const severityOrder = { Extreme: 2, Severe: 1, Moderate: 0 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      })[0];

      for (const key in alertToDisasterMap) {
        if (highestSeverityAlert.type.toLowerCase().includes(key)) {
          return alertToDisasterMap[key];
        }
      }
    }
    return 'earthquake'; // Default
  };
  
  const [activeTab, setActiveTab] = useState<DisasterType>(getActiveDisasterFromAlerts);

  // Update tab if alerts change
  useEffect(() => {
    setActiveTab(getActiveDisasterFromAlerts());
  }, [alerts]);

  const disasterTypes = Object.keys(SAFETY_TIPS) as DisasterType[];
  const activeGuide = SAFETY_TIPS[activeTab];

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
             <GlassCard className="!p-0">
                <div className="p-6">
                    <h1 className="text-3xl font-bold">Life-Saving Handbook</h1>
                    <p className="text-white/70 mt-1">Your guide to staying safe during emergencies. Content is context-aware based on active alerts.</p>
                </div>
             </GlassCard>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
            <GlassCard>
                <h2 className="text-xl font-semibold mb-4">Safety Categories</h2>
                <div className="flex flex-col gap-2">
                    {disasterTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveTab(type)}
                            className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                                activeTab === type
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'bg-black/30 hover:bg-black/50'
                            }`}
                        >
                            {SAFETY_TIPS[type].title}
                        </button>
                    ))}
                </div>
            </GlassCard>
            <EmergencyNumbers />
            <NearbyServicesMap location={location} />
        </div>

        <div className="lg:col-span-2">
            <GlassCard className="printable-content">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">{activeGuide.title}</h2>
                        <p className="text-white/60">Key steps to take for your safety.</p>
                    </div>
                    <button onClick={() => window.print()} className="no-print flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition">
                       <IconDownload className="w-5 h-5" />
                       Download Guide
                    </button>
                </div>
                <div className="border-t border-white/10 pt-4">
                     <ul className="space-y-3">
                        {activeGuide.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-3">
                            <IconCheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                            <span className="text-white/90">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </GlassCard>
        </div>
    </div>
  );
};
