import React, { useEffect, useRef } from 'react';
import { GlassCard, SkeletonLoader } from './GlassCard';
import { Earthquake } from '../types';

// Since Leaflet is loaded from a CDN, we declare its global variable for TypeScript.
declare var L: any;

interface EarthquakeMapCardProps {
  loading: boolean;
  data: Earthquake[];
  className?: string;
}

// A mock geocoder to get lat/lng from a place string for this demo.
// It's deterministic, so the same place string always returns the same coordinates.
const mockGeocode = (place: string): [number, number] => {
  // Special cases for more realistic locations from mock data
  if (place.toLowerCase().includes('japan')) return [35.68, 139.76];
  if (place.toLowerCase().includes('los angeles')) return [34.05, -118.24];
  if (place.toLowerCase().includes('chile')) return [-33.44, -70.66];
  if (place.toLowerCase().includes('italy')) return [41.90, 12.49];

  let hash = 0;
  for (let i = 0; i < place.length; i++) {
    const char = place.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  
  const lat = ((hash & 0xFFFF) / 0xFFFF) * 180 - 90;
  const lon = (((hash >> 16) & 0xFFFF) / 0xFFFF) * 360 - 180;
    
  return [lat, lon];
};

const getMagnitudeColor = (magnitude: number) => {
    if (magnitude < 4) return '#22c55e'; // green-500
    if (magnitude < 6) return '#f59e0b'; // yellow-500
    if (magnitude < 7) return '#f97316'; // orange-500
    return '#ef4444'; // red-600
};

export const EarthquakeMapCard: React.FC<EarthquakeMapCardProps> = ({ loading, data, className }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null); // To hold the map instance
  const markersRef = useRef<any[]>([]); // To hold marker instances

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize map
      mapRef.current = L.map(mapContainerRef.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: false,
      });

      // Add a dark tile layer from CartoDB
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (mapRef.current && !loading) {
      // Clear previous markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      const newMarkers: any[] = [];
      const latLngs: [number, number][] = [];

      data.forEach(eq => {
        const coords = mockGeocode(eq.place);
        latLngs.push(coords);
        
        const size = Math.max(12, eq.mag * 2.5);
        const iconHtml = `<div style="background-color: ${getMagnitudeColor(eq.mag)}; width:${size}px; height:${size}px;" class="rounded-full border-2 border-white/80 shadow-xl animate-pulse"></div>`;

        const customIcon = L.divIcon({
            html: iconHtml,
            className: '', // an empty class name
            iconSize: [size, size],
            iconAnchor: [size/2, size/2],
        });

        const marker = L.marker(coords, { icon: customIcon }).addTo(mapRef.current);
        
        const popupContent = `
          <div class="font-sans">
            <div class="font-bold text-base mb-1">${eq.mag.toFixed(1)} Magnitude</div>
            <div class="text-sm text-white/80">${eq.place}</div>
            <div class="text-xs text-white/60 mt-2">Depth: ${eq.depth} km</div>
          </div>
        `;

        marker.bindPopup(popupContent);
        newMarkers.push(marker);
      });
      
      markersRef.current = newMarkers;

      // Fit map to markers if there are any
      if (latLngs.length > 0) {
          mapRef.current.fitBounds(latLngs, { padding: [50, 50], maxZoom: 8 });
      } else {
          mapRef.current.setView([20,0], 2);
      }
    }
  }, [data, loading]); // Rerun when earthquake data or loading state changes

  return (
    <GlassCard className={`flex flex-col ${className}`}>
      {loading && <SkeletonLoader />}
      <h2 className="text-xl font-semibold mb-4">Live Earthquake Map</h2>
      <div className="flex-1 rounded-lg overflow-hidden min-h-[300px] md:min-h-[400px]">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </GlassCard>
  );
};