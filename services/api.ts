import { useState, useEffect } from 'react';
import { CurrentWeather, HourlyForecast, DailyForecast, Alert, Earthquake } from '../types';

// Mock data generation
const createMockCurrentWeather = (location: string): CurrentWeather => ({
  temp: 18 + (location.length % 15), // Vary temp based on city name
  feels_like: 16 + (location.length % 15),
  humidity: 65,
  wind_speed: 15,
  description: 'Mostly Clear',
  icon: '☀️',
  location,
  precipitationChance: 20,
  uvIndex: 5,
});

const createMockHourlyForecast = (): HourlyForecast[] => {
  const hours = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setHours(d.getHours() + i);
    return d.getHours() + ':00';
  });
  return hours.map((hour, i) => ({
    time: hour,
    temp: 22 - Math.sin(i / 3) * 5,
  }));
};

const createMockDailyForecast = (): DailyForecast[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, i) => ({
    day,
    temp: 20 + Math.floor(Math.random() * 5),
    icon: ['☀️', '☁️', '🌦️', '🌧️'][i % 4],
  }));
};

const createMockAlerts = (location: string): Alert[] => {
    const loc = location.toLowerCase();
    if (loc.includes('tokyo')) {
        return [
            { id: 'a1', type: 'Tsunami Watch', severity: 'Extreme', description: 'Strong earthquake detected offshore. Tsunami watch in effect for coastal areas. Evacuate to higher ground immediately.', time: '5m ago' },
            { id: 'a2', type: 'Earthquake', severity: 'Severe', description: 'Magnitude 6.8 earthquake reported 50 miles east. Widespread shaking felt. Expect aftershocks.', time: '8m ago' },
        ]
    }
    if (loc.includes('mumbai')) {
        return [
            { id: 'a3', type: 'Cyclone Alert', severity: 'Severe', description: 'Cyclone "Nisarga" approaching the coast. High winds and heavy rain expected. Evacuate low-lying areas.', time: '1h ago' },
            { id: 'a1', type: 'Flood Warning', severity: 'Moderate', description: 'Heavy rainfall expected to cause urban flooding in low-lying areas.', time: '3h ago' },
        ]
    }
     if (loc.includes('delhi')) {
        return [
            { id: 'a4', type: 'Heatwave Warning', severity: 'Severe', description: 'Temperatures expected to exceed 45°C. Avoid outdoor activities between 11 AM and 4 PM.', time: '6h ago' },
        ]
    }
    return [
        { id: 'a1', type: 'Flood Warning', severity: 'Severe', description: 'River expected to crest above flood stage this evening. Move to higher ground.', time: '2h ago' },
        { id: 'a2', type: 'Severe Thunderstorm', severity: 'Moderate', description: 'Severe thunderstorm watch in effect until 10 PM. Hail and strong winds possible.', time: '4h ago' },
    ];
}

const createMockEarthquakes = (): Earthquake[] => [
  { id: 'eq1', mag: 6.8, place: '50 km E of Tokyo, Japan', time: Date.now() - 480000, depth: 10 },
  { id: 'eq2', mag: 4.2, place: '15 km NW of Los Angeles, USA', time: Date.now() - 7200000, depth: 25 },
  { id: 'eq3', mag: 5.1, place: 'Off the coast of Chile', time: Date.now() - 86400000, depth: 15 },
  { id: 'eq4', mag: 3.8, place: '25 km E of Rome, Italy', time: Date.now() - 172800000, depth: 5 },
];

// Custom hook to simulate API fetching
export const useMockApi = (location: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    currentWeather: null as CurrentWeather | null,
    hourlyForecast: [] as HourlyForecast[],
    dailyForecast: [] as DailyForecast[],
    alerts: [] as Alert[],
    earthquakes: [] as Earthquake[],
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData({
        currentWeather: createMockCurrentWeather(location),
        hourlyForecast: createMockHourlyForecast(),
        dailyForecast: createMockDailyForecast(),
        alerts: createMockAlerts(location),
        earthquakes: createMockEarthquakes(),
      });
      setLoading(false);
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, [location]); // Re-fetch when location changes

  return { ...data, loading };
};