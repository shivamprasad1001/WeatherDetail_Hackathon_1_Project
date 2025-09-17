import React from 'react';
import { WeatherCard } from './WeatherCard';
import { HourlyChartCard } from './HourlyChartCard';
import { ForecastCard } from './ForecastCard';
import { EarthquakeFeedCard } from './EarthquakeFeedCard';
import { SafetyHubCard } from './SafetyHubCard';
import { EmergencyNumbersCard } from './EmergencyNumbersCard';
import { AISurvivalAssistantCard } from './AISurvivalAssistantCard';
import { EarthquakeMapCard } from './EarthquakeMapCard';
import { UvAndPrecipitationCard } from './UvAndPrecipitationCard';
import { CurrentWeather, HourlyForecast, DailyForecast, Alert, Earthquake } from '../types';

interface DashboardProps {
  loading: boolean;
  currentWeather: CurrentWeather | null;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  alerts: Alert[];
  earthquakes: Earthquake[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  loading,
  currentWeather,
  hourlyForecast,
  dailyForecast,
  alerts,
  earthquakes,
}) => {
  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {/* Main Weather Section */}
      <WeatherCard loading={loading} data={currentWeather} className="lg:col-span-2" />
      <UvAndPrecipitationCard loading={loading} data={currentWeather} className="lg:col-span-1" />
      <EmergencyNumbersCard className="lg:col-span-1" />

      <HourlyChartCard loading={loading} data={hourlyForecast} className="lg:col-span-2" />
      <ForecastCard loading={loading} data={dailyForecast} className="lg:col-span-2" />
      
      {/* Safety & Emergency Section */}
      <AISurvivalAssistantCard className="lg:col-span-4" />
      
      <EarthquakeFeedCard loading={loading} data={earthquakes} className="lg:col-span-2" />
      <EarthquakeMapCard loading={loading} data={earthquakes} className="lg:col-span-2" />
      
      <SafetyHubCard className="lg:col-span-4" />
    </div>
  );
};
