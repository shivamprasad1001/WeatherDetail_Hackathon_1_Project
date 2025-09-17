import React, { useState } from 'react';
import { IconSearch, IconCurrentLocation, IconBell } from './Icons';

type ActiveTab = 'dashboard' | 'safetyGuide';

interface HeaderProps {
  location: string;
  onLocationChange: (newLocation: string) => void;
  onToggleAlerts: () => void;
  alertCount: number;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ location, onLocationChange, onToggleAlerts, alertCount, activeTab, setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onLocationChange(searchQuery.trim());
      // Switch back to dashboard on new search for better UX
      setActiveTab('dashboard'); 
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleUseMyLocation = () => {
      onLocationChange('New Delhi, India'); // Mock: in a real app, use Geolocation API
  }

  const navButtonClass = (tabName: ActiveTab) => 
    `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
      activeTab === tabName ? 'bg-indigo-600 text-white' : 'hover:bg-white/10'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-black/30 backdrop-blur-lg border-b border-white/10 p-4 no-print">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
            <h1 className="text-2xl font-black tracking-wider uppercase">
              Aegis
            </h1>
            <nav className="hidden md:flex items-center gap-2 bg-black/20 p-1 rounded-lg">
                <button onClick={() => setActiveTab('dashboard')} className={navButtonClass('dashboard')}>Dashboard</button>
                <button onClick={() => setActiveTab('safetyGuide')} className={navButtonClass('safetyGuide')}>Safety Guide</button>
            </nav>
        </div>
        
        <div className="flex-1 flex justify-end items-center gap-2 max-w-lg">
          <div className="relative flex-1 max-w-xs">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Search city...`}
              className="w-full bg-black/30 border border-white/20 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              aria-label="Search for a city"
            />
          </div>
          <button 
            onClick={handleUseMyLocation} 
            className="p-2 bg-black/30 border border-white/20 rounded-lg hover:bg-white/10 transition"
            aria-label="Use my current location"
          >
            <IconCurrentLocation className="w-5 h-5" />
          </button>
           <button 
            onClick={onToggleAlerts} 
            className="relative p-2 bg-black/30 border border-white/20 rounded-lg hover:bg-white/10 transition"
            aria-label="Toggle active alerts panel"
        >
          <IconBell className="w-6 h-6" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold">
              {alertCount}
            </span>
          )}
        </button>
        </div>
      </div>
       <nav className="md:hidden flex items-center gap-2 bg-black/20 p-1 rounded-lg mt-4">
          <button onClick={() => setActiveTab('dashboard')} className={`${navButtonClass('dashboard')} flex-1`}>Dashboard</button>
          <button onClick={() => setActiveTab('safetyGuide')} className={`${navButtonClass('safetyGuide')} flex-1`}>Safety Guide</button>
      </nav>
    </header>
  );
};