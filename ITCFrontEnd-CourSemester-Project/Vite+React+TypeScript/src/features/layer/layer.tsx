import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { countriesTranslation } from './countriesTranslation.ts'
import { countriesPosition } from './countriesPosition.ts'

interface CountryLabelItem {
  marker: L.Marker;
  englishName: string;
  russianName: string;
  bounds: L.LatLngBounds;
  sizeCategory: 'large' | 'medium' | 'small';
}

const visZoom = 8;
const larZoom = 3;
const medZoom = 4;
const smaZoom = 5;

const centerRussiaOnMap = (geoData: any): any => {
  if (!geoData) return geoData;
  
  const adjustedData = JSON.parse(JSON.stringify(geoData));
  
  adjustedData.features = adjustedData.features.map((feature: any) => {
    const englishName = feature.properties.name || feature.properties.NAME || feature.properties.ADMIN || '';
    const isRussia = englishName === 'Russia' || englishName === 'Russian Federation' || countriesTranslation[englishName] === 'Россия';
    
    if (isRussia && feature.geometry.type === 'MultiPolygon') {
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
    return feature;
  });
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

const shouldShowLabel = (sizeCategory: 'large' | 'medium' | 'small', zoom: number): boolean => {
  if (zoom >= visZoom) return true;
  
  switch(sizeCategory) {
    case 'large':
      return zoom >= larZoom;
    case 'medium':
      return zoom >= medZoom;
    case 'small':
      return zoom >= smaZoom;
    default:
      return false;
  }
};

export const CountryLabels: React.FC = () => {
  const map = useMap();
  const [geoData, setGeoData] = useState<any>(null);
  const [currentZoom, setCurrentZoom] = useState(map.getZoom());
  const allLabelsRef = useRef<CountryLabelItem[]>([]);
  const countriesLayerRef = useRef<L.GeoJSON | null>(null);
  const isDataLoadedRef = useRef(false);

  useEffect(() => {
    const handleZoom = () => {
      const newZoom = map.getZoom();
      setCurrentZoom(newZoom);
    };
    
    map.on('zoomend', handleZoom);
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map]);

  const updateLabelsVisibility = useCallback((zoom: number) => {
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
  }, []);

  useEffect(() => {
    if (isDataLoadedRef.current) return; // https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson
    fetch('./src/features/layer/countries.geojson') // ./src/features/layer/countries.geojson
      .then(response => response.json())
      .then(data => {
        const adjustedData = centerRussiaOnMap(data);
        setGeoData(adjustedData);
        isDataLoadedRef.current = true;
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
    if (!geoData) return;

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
  }, [geoData, map]);

  useEffect(() => {
    if (geoData && allLabelsRef.current.length > 0) {
      updateLabelsVisibility(currentZoom);
    }
  }, [currentZoom, geoData, updateLabelsVisibility]);

  useEffect(() => {
    if (!geoData) return;

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
  }, [geoData, map]);

  return null;
};