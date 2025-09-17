export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  location: string;
  precipitationChance: number;
  uvIndex: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
}

export interface DailyForecast {
  day: string;
  temp: number;
  icon: string;
}

export interface Alert {
  id: string;
  type: 'Flood Warning' | 'Severe Thunderstorm' | 'Earthquake' | 'Wildfire Alert' | 'Tsunami Watch' | 'Cyclone Alert' | 'Heatwave Warning';
  severity: 'Moderate' | 'Severe' | 'Extreme';
  description: string;
  time: string;
}

export interface Earthquake {
  id: string;
  mag: number;
  place: string;
  time: number; // timestamp
  depth: number;
}

export interface EmergencyContact {
  country: string;
  police: string;
  ambulance: string;
  fire: string;
}

export enum Unit {
  Metric = 'metric', // Celsius, km/h
  Imperial = 'imperial', // Fahrenheit, mph
}