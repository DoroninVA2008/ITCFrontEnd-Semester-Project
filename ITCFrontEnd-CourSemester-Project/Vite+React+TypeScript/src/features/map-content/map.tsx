import React, { useState, useCallback, useRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { tiLayer } from '../../app/saga/saga.ts'
import { CountryLabels } from '../layer-position/layers.tsx'
import { MarkerWithPopup } from '../event-location/markers.tsx'
import { FilterButtonList } from '../filter-function/filters.tsx'
import { EventFilterProvider } from '../filter-function/evenFilterProvider'
import { CardOnMap } from '../card-informat/cardPosition'
import { EventObject } from '../event-location/evenPositions.ts' // @ts-ignore
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
  } | null>(null)
  
  const mapRef = useRef<L.Map | null>(null)

  const handleMarkerOpen = useCallback((
    event: EventObject,
    position: L.LatLng,
    markerKey: string
  ) => {
    setActiveEvent({ event, position, markerKey })
  }, [])

  const handleMarkerClose = useCallback((closedMarkerKey: string) => {
    setActiveEvent(prev => prev?.markerKey === closedMarkerKey ? null : prev)
  }, [])

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
            onMarkerClose={handleMarkerClose}
            activeMarkerKey={activeEvent?.markerKey || null}
          />
        </MapContainer>
      </div>
    </EventFilterProvider>
  )
}