import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { countriesTranslation } from './countriesTranslation.ts';
import { countriesPosition } from './countriesPosition.ts';

interface CountryLabelItem {
  marker: L.Marker;
  englishName: string;
  russianName: string;
  bounds: L.LatLngBounds;
  sizeCategory: 'large' | 'medium' | 'small';
}

interface CountryLabelsProps {
  geoJsonUrl?: string;
  visibleZoom?: number;
  largeZoom?: number;
  mediumZoom?: number;
  smallZoom?: number;
  showBoundaries?: boolean;
  boundaryStyle?: L.PathOptions;
  labelStyle?: {
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    zIndexOffset?: number;
  };
}

export const CountryLabels: React.FC<CountryLabelsProps> = ({
  geoJsonUrl = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson',
  visibleZoom = 8,
  largeZoom = 3,
  mediumZoom = 4,
  smallZoom = 5,
  showBoundaries = true,
  boundaryStyle = {
    fillColor: "#2C4672",
    weight: 1.2,
    color: "#2F3B54",
    fillOpacity: 1,
    opacity: 1
  },
  labelStyle = {
    iconSize: [100, 20],
    iconAnchor: [50, 10],
    zIndexOffset: 1000
  }
}) => {
  const map = useMap();
  const [geoData, setGeoData] = useState<any>(null);
  const [currentZoom, setCurrentZoom] = useState(map.getZoom());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const allLabelsRef = useRef<CountryLabelItem[]>([]);
  const countriesLayerRef = useRef<L.GeoJSON | null>(null);
  const isDataLoadedRef = useRef(false);

  const centerRussiaOnMap = useCallback((geoData: any): any => {
    if (!geoData) return geoData;
    
    const adjustedData = JSON.parse(JSON.stringify(geoData));
    
    adjustedData.features = adjustedData.features.map((feature: any) => {
      const englishName = feature.properties.name || feature.properties.NAME || feature.properties.ADMIN || '';
      const isRussia = englishName === 'Russia' || 
                      englishName === 'Russian Federation' || 
                      countriesTranslation[englishName] === 'Россия';
      
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
  }, []);

  const getCountryLabelPosition = useCallback((countryName: string, bounds: L.LatLngBounds): L.LatLng => {
    if (countriesPosition[countryName]) {
      const [lat, lng] = countriesPosition[countryName];
      return L.latLng(lat, lng);
    }
    return bounds.getCenter();
  }, []);

  const getCountrySizeCategory = useCallback((bounds: L.LatLngBounds): 'large' | 'medium' | 'small' => {
    const area = bounds.getNorth() - bounds.getSouth();
    if (area > 10) return 'large';
    if (area > 3) return 'medium'; 
    return 'small';
  }, []);

  const shouldShowLabel = useCallback((sizeCategory: 'large' | 'medium' | 'small', zoom: number): boolean => {
    if (zoom >= visibleZoom) return true;
    
    switch(sizeCategory) {
      case 'large':
        return zoom >= largeZoom;
      case 'medium':
        return zoom >= mediumZoom;
      case 'small':
        return zoom >= smallZoom;
      default:
        return false;
    }
  }, [visibleZoom, largeZoom, mediumZoom, smallZoom]);

  useEffect(() => {
    const handleZoom = () => {
      setCurrentZoom(map.getZoom());
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
        divIconElement.classList.toggle('is-visible', shouldBeVisible);
        divIconElement.classList.toggle('is-hidden', !shouldBeVisible);
      }
    });
  }, [shouldShowLabel]);

  useEffect(() => {
    if (isDataLoadedRef.current || isLoading) return;

    const loadGeoData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(geoJsonUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const adjustedData = centerRussiaOnMap(data);
        setGeoData(adjustedData);
        isDataLoadedRef.current = true;
      } catch (error) {
        console.error('Ошибка загрузки GeoJSON:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    loadGeoData();

    return () => {
      allLabelsRef.current.forEach(item => {
        if (map.hasLayer(item.marker)) {
          map.removeLayer(item.marker);
        }
      });
      allLabelsRef.current = [];
      
      if (countriesLayerRef.current && map.hasLayer(countriesLayerRef.current)) {
        map.removeLayer(countriesLayerRef.current);
        countriesLayerRef.current = null;
      }
      
      isDataLoadedRef.current = false;
    };
  }, [map, geoJsonUrl, centerRussiaOnMap, isLoading]);

  useEffect(() => {
    if (!geoData) return;

    allLabelsRef.current.forEach(item => {
      if (map.hasLayer(item.marker)) {
        map.removeLayer(item.marker);
      }
    });
    allLabelsRef.current = [];

    geoData.features.forEach((feature: any) => {
      const englishName = feature.properties.name || 
                         feature.properties.NAME || 
                         feature.properties.ADMIN || 
                         'Неизвестная страна';
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
            iconSize: labelStyle.iconSize || [100, 20],
            iconAnchor: labelStyle.iconAnchor || [50, 10]
          }),
          interactive: false,
          zIndexOffset: labelStyle.zIndexOffset || 1000
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
  }, [geoData, map, currentZoom, getCountrySizeCategory, getCountryLabelPosition, shouldShowLabel, updateLabelsVisibility, labelStyle]);

  useEffect(() => {
    if (geoData && allLabelsRef.current.length > 0) {
      updateLabelsVisibility(currentZoom);
    }
  }, [currentZoom, geoData, updateLabelsVisibility]);

  useEffect(() => {
    if (!geoData || !showBoundaries) return;

    if (countriesLayerRef.current && map.hasLayer(countriesLayerRef.current)) {
      map.removeLayer(countriesLayerRef.current);
    }
    
    const countriesLayer = L.geoJSON(geoData, {
      style: boundaryStyle,
    }).addTo(map);
    
    countriesLayerRef.current = countriesLayer;

    return () => {
      if (countriesLayerRef.current && map.hasLayer(countriesLayerRef.current)) {
        map.removeLayer(countriesLayerRef.current);
        countriesLayerRef.current = null;
      }
    };
  }, [geoData, map, showBoundaries, boundaryStyle]);

  return null;
};