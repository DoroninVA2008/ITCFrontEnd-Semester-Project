import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { tiLayer } from '../../app/saga/saga.ts'
import { CountryLabels } from '../layers/layers.tsx'
import { MarkerWithPopup } from '../events/markers.tsx'
import { FilterButtonList } from '../filters/filters.tsx' //@ts-ignore
import { EventFilterProvider } from '../filters/evenFilterProvider'
import './map.scss'

const centmap: [number, number] = [68.751244, 98.618423]
const zoom = 3
const minZoom = 3
const maxZoom = 12
const maxMapBounds: [number, number][] = [[-112, -169], [84, 192]]

export const Map: React.FC = () => {
  return (
    <EventFilterProvider>
      <div id="map-wrapper">
        <FilterButtonList />
        <MapContainer
          id="map"
          center={centmap}
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          scrollWheelZoom={true}
          maxBounds={maxMapBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer url={tiLayer} noWrap={false} opacity={0} />
          <CountryLabels />
          <MarkerWithPopup />
        </MapContainer>
      </div>
    </EventFilterProvider>
  )
}
