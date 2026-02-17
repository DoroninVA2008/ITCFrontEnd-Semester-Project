import React, { useRef } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { eventsAPI } from './even.ts'
import L from 'leaflet' // @ts-ignore
import icon from '../../assets/VectorMarkerSword.png' // @ts-ignore
import iconShadow from '../../../public/marker-shadow.png'

const markerPosition: [number, number] = [55.751244, 37.618423];
const popupTimeOut = 200;

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [32, 48],
  iconAnchor: [16, 32],
  popupAnchor: [0, 4],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MarkerWithPopupProps {
  popupText?: string;
}

export const MarkerWithPopup: React.FC<MarkerWithPopupProps> = ({ 
  popupText = "Это Интерактивная Карта с библиотекой Leaflet на React`ивном TypeScript!" 
}) => {
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const eventHandlers = {
    mouseover: () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    },
    
    mouseout: () => {
      closeTimeoutRef.current = setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.closePopup();
        }
      }, popupTimeOut);
    },
    
    click: () => {
      if (markerRef.current) {
        markerRef.current.closePopup();
      }
    }
  };

  return (
    <Marker 
      position={markerPosition}
      ref={markerRef}
      eventHandlers={eventHandlers}
    >
      <Popup>
        <div 
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
          onClick={() => {
            if (markerRef.current) {
              markerRef.current.closePopup();
            }
          }}
        >
          {popupText}
        </div>
      </Popup>
    </Marker>
  );
};