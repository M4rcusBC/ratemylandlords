import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Landlord } from '../lib/types';
import { getLandlordCoordinates } from '../lib/types';

// Fix Leaflet's default icon pathing to avoid relative asset resolution issues
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LandlordMapProps {
  landlords: Landlord[];
  selectedLandlordId?: string | null;
  onSelectLandlord?: (landlord: Landlord) => void;
  height?: string;
  zoom?: number;
  center?: [number, number];
  interactive?: boolean;
}

export const LandlordMap: React.FC<LandlordMapProps> = ({
  landlords,
  selectedLandlordId,
  onSelectLandlord,
  height = '500px',
  zoom,
  center,
  interactive = true,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const navigate = useNavigate();

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Cleanup previous instance if container was reused
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const defaultCenter: [number, number] = center || [39.8283, -98.5795]; // Center of contiguous US
    const defaultZoom = zoom || (landlords.length === 1 ? 14 : 4);

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: interactive,
      scrollWheelZoom: interactive,
      dragging: interactive,
      attributionControl: true,
    });

    // Client-side OpenStreetMap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    // Force tile recalculation after mount
    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  // Update markers when landlords change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    const bounds = L.latLngBounds([]);

    landlords.forEach((landlord) => {
      const coords = getLandlordCoordinates(landlord);
      bounds.extend(coords);

      const isSelected = selectedLandlordId === landlord.id;
      const ratingDisplay =
        landlord.reviewCount > 0 ? landlord.avgRating.toFixed(1) : '—';

      // Custom styled HTML pin icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="relative group cursor-pointer transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 ${
            isSelected ? 'scale-125 z-50' : 'z-10'
          }">
            <div class="flex items-center gap-1 px-2.5 py-1 rounded-full shadow-lg border-2 ${
              isSelected
                ? 'bg-[#202622] text-white border-[#de8d48]'
                : landlord.avgRating >= 4.5
                ? 'bg-[#27695c] text-white border-white'
                : 'bg-white text-stone-900 border-[#27695c]'
            }">
              <span class="text-[11px] font-bold">★ ${ratingDisplay}</span>
            </div>
            <div class="w-2 h-2 bg-[#27695c] rotate-45 mx-auto -mt-1 shadow-sm"></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 36],
        popupAnchor: [0, -32],
      });

      const marker = L.marker(coords, { icon: customIcon }).addTo(map);

      // Popup content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 text-stone-900 space-y-2 max-w-[220px]';
      popupContent.innerHTML = `
        <div class="font-bold text-sm leading-tight text-stone-900">${landlord.name}</div>
        <div class="text-xs text-stone-500">${landlord.address ? `${landlord.address}, ` : ''}${landlord.city}, ${landlord.state}</div>
        <div class="flex items-center gap-2 text-xs pt-1 border-t border-stone-100">
          <span class="font-bold text-[#d5843d]">★ ${ratingDisplay}</span>
          <span class="text-stone-400">(${landlord.reviewCount} ${landlord.reviewCount === 1 ? 'review' : 'reviews'})</span>
        </div>
        <button id="view-landlord-${landlord.id}" class="w-full mt-2 py-1.5 px-3 bg-[#27695c] hover:bg-[#1f5449] text-white text-xs font-semibold rounded-md transition-colors text-center block cursor-pointer">
          View Profile
        </button>
      `;

      // Handle popup click to navigate
      popupContent.querySelector(`#view-landlord-${landlord.id}`)?.addEventListener('click', () => {
        navigate(`/landlords/${landlord.id}`);
      });

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectLandlord?.(landlord);
      });

      markersRef.current.set(landlord.id, marker);
    });

    // Fit map view to bounds if more than 1 landlord and bounds are valid
    if (landlords.length > 1 && bounds.isValid() && !center) {
      map.fitBounds(bounds, {
        padding: [40, 40],
        maxZoom: 14,
      });
    } else if (landlords.length === 1 && bounds.isValid() && !center) {
      map.setView(bounds.getCenter(), zoom || 14);
    }
  }, [landlords, navigate, onSelectLandlord]);

  // Pan to selected landlord if provided
  useEffect(() => {
    if (!selectedLandlordId || !mapInstanceRef.current) return;
    const marker = markersRef.current.get(selectedLandlordId);
    if (marker) {
      mapInstanceRef.current.setView(marker.getLatLng(), Math.max(mapInstanceRef.current.getZoom(), 12), {
        animate: true,
      });
      marker.openPopup();
    }
  }, [selectedLandlordId]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#dedbd2] shadow-xs">
      <div
        ref={mapContainerRef}
        style={{ height, width: '100%' }}
        className="z-0 bg-[#e8ece9]"
      />
      <div className="absolute bottom-2 left-2 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] text-stone-600 border border-stone-200 pointer-events-none shadow-xs">
        Map data: OpenStreetMap contributors
      </div>
    </div>
  );
};

