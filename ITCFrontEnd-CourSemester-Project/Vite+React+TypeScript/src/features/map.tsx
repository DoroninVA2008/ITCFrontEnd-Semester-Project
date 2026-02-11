import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L, { LatLngBoundsExpression } from 'leaflet'
import './map.scss' //@ts-ignore
import icon from '../assets/VectorMarkerSword.png'; //@ts-ignore
import iconShadow from '../../public/marker-shadow.png'
import { countriesTranslation } from './layer/countriesTranslation.ts'
import { countriesPosition } from './layer/countriesPosition.ts' //@ts-ignore
// import { eventsAPI } from './events/even.ts'; 
/*Adidas // НаВайбКодил с ДипСиком эту страницу интерактивной карты*/
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [32, 48],
  iconAnchor: [16, 32],
  popupAnchor: [0, 4],
});

L.Marker.prototype.options.icon = DefaultIcon;

const centerRussiaOnMap = (geoData: any): any => {
  if (!geoData) return geoData;
  
  const adjustedData = JSON.parse(JSON.stringify(geoData));
  
  adjustedData.features = adjustedData.features.map((feature: any) => {
    const englishName = feature.properties.name || feature.properties.NAME || feature.properties.ADMIN || '';
    const isRussia = englishName === 'Russia' || englishName === 'Russian Federation' || countriesTranslation[englishName] === 'Россия';
    
    if (isRussia) {
      if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates = feature.geometry.coordinates.map((polygon: any[][][]) => {
          return polygon.map((ring: any[][]) => {
            return ring.map((coord: any[]) => {
              let [lng, lat] = coord;
              if (lng < 0) {
                return [lng + 360, lat];
              }
              return coord;
            });
          });
        });
      }
    }
    return feature;
  }
);
  return adjustedData;
};

const getCountryLabelPosition = (countryName: string, bounds: L.LatLngBounds): L.LatLng => {
  if (countriesPosition[countryName]) {
    const [lat, lng] = countriesPosition[countryName];
    return L.latLng(lat, lng);
  }
  return bounds.getCenter();
};

const getCountrySizeCategory = (bounds: L.LatLngBounds): 'large' | 'medium' | 'small' => {
  const area = bounds.getNorth() - bounds.getSouth();
  
  if (area > 10) return 'large';
  if (area > 3) return 'medium'; 
  return 'small';
};

interface CountryLabelItem {
  marker: L.Marker;
  englishName: string;
  russianName: string;
  bounds: L.LatLngBounds;
  sizeCategory: 'large' | 'medium' | 'small';
};

const CountryLabels = () => {
  const map = useMap();
  const [geoData, setGeoData] = useState<any>(null);
  const [currentZoom, setCurrentZoom] = useState(map.getZoom());
  const allLabelsRef = useRef<CountryLabelItem[]>([]);
  const countriesLayerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    const handleZoom = () => {
      setCurrentZoom(map.getZoom());
    };
    
    map.on('zoomend', handleZoom);
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map]);

  const shouldShowLabel = (sizeCategory: 'large' | 'medium' | 'small', zoom: number): boolean => {
    if (zoom >= 8) return true;
    
    switch(sizeCategory) {
      case 'large':
        return zoom >= 3;
      case 'medium':
        return zoom >= 4;
      case 'small':
        return zoom >= 5;
      default:
        return false;
    }
  };

  const updateLabelsVisibility = (zoom: number) => {
    allLabelsRef.current.forEach(item => {
      const { marker, sizeCategory } = item;
      const shouldBeVisible = shouldShowLabel(sizeCategory, zoom);

      const divIconElement = marker.getElement(); 
      if (divIconElement) {
        if (shouldBeVisible) {
          divIconElement.classList.add('is-visible');
          divIconElement.classList.remove('is-hidden');
        } else {
          divIconElement.classList.add('is-hidden');
          divIconElement.classList.remove('is-visible');
        }
      }
    });
  };

  useEffect(() => {
    if (geoData) {
      allLabelsRef.current.forEach(item => {
        if (map.hasLayer(item.marker)) {
          map.removeLayer(item.marker);
        }
      });
      allLabelsRef.current = [];

      geoData.features.forEach((feature: any) => {
        const englishName = feature.properties.name || feature.properties.NAME || feature.properties.ADMIN || 'Неизвестная страна';
        
        const russianName = countriesTranslation[englishName] || englishName;
        
        try {
          const tempLayer = L.geoJSON(feature);
          const bounds = tempLayer.getBounds();
          const sizeCategory = getCountrySizeCategory(bounds);
          
          const labelPosition = getCountryLabelPosition(englishName, bounds);
          
          const initialVisibility = shouldShowLabel(sizeCategory, currentZoom);
          const initialClassName = initialVisibility ? 'is-visible' : 'is-hidden';

          const label = L.marker(labelPosition, {
            icon: L.divIcon({
              className: `country-label country-label-${sizeCategory} ${initialClassName}`,
              html: `<div class="country-name">${russianName}</div>`,
              iconSize: [100, 20],
              iconAnchor: [50, 10]
            }),
            interactive: false,
            zIndexOffset: 1000
          });
          
          label.addTo(map);
          allLabelsRef.current.push({
            marker: label,
            englishName,
            russianName,
            bounds,
            sizeCategory,
          });
        } catch (error) {
          console.log('Ошибка при создании метки:', russianName, error);
        }
      });
      
      updateLabelsVisibility(currentZoom);
    }
  }, [geoData, map]);

  useEffect(() => {
    if (geoData) {
      updateLabelsVisibility(currentZoom);
    }
  }, [currentZoom, geoData]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson') // ./src/pages/map/layer/countries.geojson
      .then(response => response.json())
      .then(data => {
        
        let adjustedData = centerRussiaOnMap(data);
        
        setGeoData(adjustedData);
      })
      .catch(error => {
        console.error('Ошибка загрузки GeoJSON:', error);
      });
    
    return () => {
      allLabelsRef.current.forEach(item => {
        if (map.hasLayer(item.marker)) {
          map.removeLayer(item.marker);
        }
      });
      allLabelsRef.current = [];
      
      if (countriesLayerRef.current && map.hasLayer(countriesLayerRef.current)) {
        map.removeLayer(countriesLayerRef.current);
      }
    };
  }, [map]); 

  useEffect(() => {
    if (geoData) {
      if (countriesLayerRef.current && map.hasLayer(countriesLayerRef.current)) {
        map.removeLayer(countriesLayerRef.current);
      }
      
      const countriesLayer = L.geoJSON(geoData, {
        style: {
          fillColor: "#2C4672",
          weight: 1.2,
          color: "#2F3B54",
          fillOpacity: 1,
          opacity: 1
        },
      }).addTo(map);
      
      countriesLayerRef.current = countriesLayer;
    }
  }, [geoData, map]);

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
      <MapContainer id="map"
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
          noWrap={false}
          opacity={0}
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
              Это Интерактивная Карта с библиотекой Leaflet на React`ивном TypeScript!
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};