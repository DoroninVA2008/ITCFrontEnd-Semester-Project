import React, { useState, useCallback, useRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { tiLayer } from '../../app/saga/cons.ts'
import { CountryLabels } from '../layer-position/layers.tsx'
import { MarkerWithPopup } from '../marker-location/markers.tsx'
import { FilterButtonList } from '../filter-function/filters.tsx'
import { EventFilterProvider } from '../filter-function/evenFilterProvider'
import { CardOnMap } from '../card-informat/cardPosition'
import { EventObject } from '../marker-location/evenPositions.ts' // @ts-ignore
import './map.scss'

const centmap: [number, number] = [68.751244, 98.618423]
const zoom = 3
const minZoom = 3
const maxZoom = 12
const maxMapBounds: [number, number][] = [[-112, -169], [84, 192]]

export const Map: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<{
    event: EventObject;
    position: L.LatLng;
    markerKey: string;
    data: any
  } | null>(null)
  
  const mapRef = useRef<L.Map | null>(null)

  const handleMarkerOpen = (event: EventObject, position: L.LatLng, markerKey: string) => {
    setActiveEvent({ event, position, markerKey, data: null })
  }

  const handleCardClose = useCallback(() => {
    setActiveEvent(null)
  }, [])

  return (
    <EventFilterProvider>
      <div id="map-wrapper">
        <FilterButtonList />
        {activeEvent && (
          <CardOnMap
            isVisible={true}
            position={activeEvent.position}
            event={activeEvent.event}
            onClose={handleCardClose}
          />
        )}
        <MapContainer
          id="map"
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
          <MarkerWithPopup
            onMarkerOpen={handleMarkerOpen}
            activeMarkerKey={activeEvent?.markerKey || null}
          />
        </MapContainer>
      </div>
    </EventFilterProvider>
  )
}