import React, { useRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { tiLayer } from '../../entities/cons.ts'
import { CountryLabels, CityLabels } from '../layer-position/layers.tsx'
import { EventFilterProvider } from '../filter-function/evenFilterProvider'// @ts-ignore
import '../map-content/ui/map.scss' // @ts-ignore
import './admap.scss'

const centmap: [number, number] = [68.751244, 8.618423]
const zoom = 2
const minZoom = 1
const maxZoom = 12
const maxMapBounds: [number, number][] = [[-112, -169], [84, 192]]

export const AdMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null)

  return (
    <EventFilterProvider>
      <div id="admap-wrapper">
        <MapContainer
          id="admap"
          center={centmap}
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          scrollWheelZoom={true}
          maxBounds={maxMapBounds}
          maxBoundsViscosity={1.0}
          ref={mapRef}
        >
          <TileLayer url={tiLayer} noWrap={false} opacity={0} />
          <CountryLabels />
          <CityLabels />
        </MapContainer>
      </div>
    </EventFilterProvider>
  )
}