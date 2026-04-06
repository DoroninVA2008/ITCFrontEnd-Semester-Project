import React, { useEffect, useState, useRef, useCallback } from 'react'
import L from 'leaflet'
import { useMap } from 'react-leaflet'
import { landGeoJSon } from '../../entities/cons.ts'
import { CountryLabelItem, getCountrySizeCategory, shouldShowLabel } from './zoom.tsx'
import { countriesTranslation } from './countriesTranslation.ts'
import { countriesPosition } from './countriesPosition.ts'
import { citiesPosition, getCityZoomThreshold } from '../panel-content/citiesPosition.ts' // @ts-ignore
import './countrie.scss'

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
    fetch(landGeoJSon) // ./src/features/layers/countries.geojson
      .then(response => response.json())
      .then(data => {
        const adjustedData = centerRussiaOnMap(data);
        setGeoData(adjustedData);
        isDataLoadedRef.current = true;
      })
      .catch(error => {
        console.error('Ошибка загрузки GeoJSon:', error);
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

export const CityLabels: React.FC = () => {
  const map = useMap();
  const [currentZoom, setCurrentZoom] = useState(map.getZoom());
  const markersRef = useRef<{ marker: L.Marker; threshold: number }[]>([]);

  useEffect(() => {
    const handleZoom = () => setCurrentZoom(map.getZoom());
    map.on('zoomend', handleZoom);
    return () => { map.off('zoomend', handleZoom); };
  }, [map]);

  useEffect(() => {
    Object.entries(citiesPosition).forEach(([name, info]) => {
      const [lat, lng] = info.coords;
      const threshold = getCityZoomThreshold(info.type);
      const isVisible = currentZoom >= threshold;

      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: `city-label city-label-${info.type} ${isVisible ? 'is-visible' : 'is-hidden'}`,
          html: `<div class="city-name">${name}</div>`,
          iconSize: [120, 20],
          iconAnchor: [60, 10],
        }),
        interactive: false,
        zIndexOffset: 500,
      });

      marker.addTo(map);
      markersRef.current.push({ marker, threshold });
    });

    return () => {
      markersRef.current.forEach(({ marker }) => {
        if (map.hasLayer(marker)) map.removeLayer(marker);
      });
      markersRef.current = [];
    };
  }, [map]);

  useEffect(() => {
    markersRef.current.forEach(({ marker, threshold }) => {
      const el = marker.getElement();
      if (!el) return;
      if (currentZoom >= threshold) {
        el.classList.add('is-visible');
        el.classList.remove('is-hidden');
      } else {
        el.classList.add('is-hidden');
        el.classList.remove('is-visible');
      }
    });
  }, [currentZoom]);

  return null;
};