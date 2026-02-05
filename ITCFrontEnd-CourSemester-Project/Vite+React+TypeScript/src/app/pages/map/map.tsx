import React, { useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { LatLngBoundsExpression } from 'leaflet'
import '../main/index.scss'
import './map.scss'
import icon from '../../assets/VectorMarkerSword.png';
import iconShadow from '../../../../public/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [32, 48],
  iconAnchor: [16, 32], // Немного поправил анкор для точности
  popupAnchor: [0, 4], // Чтобы попап открывался над маркером
});

L.Marker.prototype.options.icon = DefaultIcon;

export const Mapp: React.FC = () => {
  const center: [number, number] = [55.751244, 37.618423];
  const centmap: [number, number] = [68.751244, 98.618423];
  // Реф для хранения таймера закрытия
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxMapBounds: LatLngBoundsExpression = [
    [-112, -169], // Юго-западный угол (°S, °W)
    [84, 192]   // Северо-восточный угол (°N, °E)
  ];
  return (
    <div id="map-wrapper">
      <MapContainer id="map" center={centmap} zoom={3} minZoom={3} maxZoom={12} scrollWheelZoom={true} 
        maxBounds={maxMapBounds} maxBoundsViscosity={200.0}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
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
                 closeTimeoutRef.current = setTimeout(() => {// @ts-ignore
                Marker.closePopup();
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