import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import '../main/index.scss';
import './map.scss';

// @ts-ignore
import icon from '../../public/marker.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [32, 32],
  iconAnchor: [16, 32], // Немного поправил анкор для точности
  popupAnchor: [0, 4], // Чтобы попап открывался над маркером
});

L.Marker.prototype.options.icon = DefaultIcon;

export const AppMap: React.FC = () => {
  const center: [number, number] = [55.751244, 37.618423];
  const centmap: [number, number] = [64.751244, 98.618423];
  // Реф для хранения таймера закрытия
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <div id="map-wrapper">
      <MapContainer id="map" center={centmap} zoom={3} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={center}
          eventHandlers={{
            mouseover: (e) => {
              // Если был запланирован выход, отменяем его (например, вернулись с попапа на маркер)
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
              e.target.openPopup();
            },
          }}
        >
          {/* 
            Оборачиваем контент попапа в div, чтобы отслеживать наведение на него.
            Leaflet Popup по умолчанию прокидывает события, но лучше ловить их на контенте.
          */}
          <Popup>
            <div 
              onMouseEnter={() => {
                // Если мы зашли в область попапа, отменяем его закрытие
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
              }}
              onMouseLeave={() => {
                 closeTimeoutRef.current = setTimeout(() => {
                marker.closePopup();
              }, 200); // 200мс достаточно, чтобы перевести курсор
              }}
            >
              Бро, я живой! <br /> 
              Это Интерактивная Карта с библиотекой Leaflet на React`ивном TypeScript!
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

