import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LatLngBoundsExpression } from 'leaflet'
import { CountryLabels } from './layer/layer.tsx'
import { MarkerWithPopup } from './events/markers.tsx'
import './map.scss'

const centmap: [number, number] = [68.751244, 98.618423];
const zoom = 3;
const minZoom = 3;
const maxZoom = 12;
const maxMapBounds: LatLngBoundsExpression = [[-112, -169], [84, 192]];
const TiLayer = "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png";

export const Map: React.FC = () => {
  return (
    <div id="map-wrapper">
      <MapContainer id="map"
        center={centmap} 
        zoom={zoom} 
        minZoom={minZoom} 
        maxZoom={maxZoom} 
        scrollWheelZoom={true} 
        maxBounds={maxMapBounds} 
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url={TiLayer}
          noWrap={false}
          opacity={0}
        />
        <CountryLabels />
        <MarkerWithPopup />
      </MapContainer>
    </div>
  );
};