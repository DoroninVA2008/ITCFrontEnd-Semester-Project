import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L, { LatLngBoundsExpression } from 'leaflet'
import './map.scss'
import icon from '../../../assets/VectorMarkerSword.png'
import iconShadow from '../../../../public/marker-shadow.png'
import countriesGeoJSon from './countries.geojson'
import { countriesTranslation } from './countriesTranslation.ts'
import { countriesPosition } from './countriesPosition.ts'

// Настройка иконки маркера
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [32, 48],
  iconAnchor: [16, 32],
  popupAnchor: [0, 4],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Функция для получения правильной позиции метки
const getCountryLabelPosition = (countryName: string, bounds: L.LatLngBounds): L.LatLng => {
  // Используем кастомные позиции для больших стран
  if (countriesPosition[countryName]) {
    const [lat, lng] = countriesPosition[countryName];
    return L.latLng(lat, lng);
  }
  
  // Для остальных стран используем центр bounds
  return bounds.getCenter();
};

const CountryLabels = () => {
  const map = useMap();
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch('./src/app/pages/map/countries.geojson') // Для отображения специально встроенного слоя земли на карте, с надписями названия стран
      .then(response => response.json())
      .then(data => {
        setGeoData(data);
        
        const geoJsonLayer = L.geoJSON(data, {
          style: {
            fillColor: "#2c4672", // #2c4672
            weight: 1,
            color: "#0a46b5",
            filter: 'contrast(0.1)',
            fillOpacity: 1,
            opacity: 1
          },
          onEachFeature: (feature, layer) => {
            const englishName = feature.properties.name || 
                               feature.properties.NAME || 
                               feature.properties.ADMIN || 
                               'Неизвестная страна';
            
            const russianName = countriesTranslation[englishName] || englishName;
            try {
              const bounds = layer.getBounds();
              // Используем улучшенную функцию для позиционирования
              const labelPosition = getCountryLabelPosition(englishName, bounds);
              
              const label = L.marker(labelPosition, {
                icon: L.divIcon({
                  className: 'country-label',
                  html: `<div class="country-name">${russianName}</div>`,
                  iconSize: [100, 20],
                  iconAnchor: [50, 10]
                }),
                interactive: false,
                zIndexOffset: 1000
              }).addTo(map);
            } catch (error) {
              console.log('Ошибка при создании метки:', russianName, error);
            }
          }
        }).addTo(map);
      })
      .catch(error => {
        console.error('Ошибка загрузки GeoJSON:', error);
      });
  }, [map]);

  return null;
};

export const Map: React.FC = () => {
  const center: [number, number] = [55.751244, 37.618423];
  const centmap: [number, number] = [68.751244, 98.618423];
  
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  
  const maxMapBounds: LatLngBoundsExpression = [
    [-112, -169],
    [84, 192]
  ];

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
      }, 200);
    },
    
    click: () => {
      if (markerRef.current) {
        markerRef.current.closePopup();
      }
    }
  };

  return (
    <div id="map-wrapper">
      <MapContainer 
        id="map" 
        center={centmap} 
        zoom={3} 
        minZoom={3} 
        maxZoom={12} 
        scrollWheelZoom={true} 
        maxBounds={maxMapBounds} 
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        />
        <CountryLabels />
        <Marker 
          position={center}
          ref={(marker) => { markerRef.current = marker; }}
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
              Бро, я живой! <br /> 
              Это Интерактивная Карта с библиотекой Leaflet на React`ивном TypeScript!
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};