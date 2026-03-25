import React, { useState, useCallback, useRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { tiLayer } from '../../app/saga/cons.ts'
import { CountryLabels } from '../layer-position/layers.tsx'
import { MarkerWithPopup } from '../marker-location/markers.tsx'
import { FilterButtonList } from '../filter-function/filters.tsx'
import { EventFilterProvider } from '../filter-function/evenFilterProvider'
import { CardOnMap } from '../card-informat/cardPosition'
import { EventObject } from '../marker-location/evenPositions.ts'
import { cards } from '../../app/saga/cons.ts' // @ts-ignore
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

  const handleMarkerOpen = async (event: EventObject, position: L.LatLng, markerKey: string) => {
  setActiveEvent({ event, position, markerKey, data: null })

  try {
    const response = await fetch(cards[event.id - 1])
    if (!response.ok) throw new Error('Ошибка при загрузке данных карточки')
    const data = await response.json()
    setActiveEvent(prev => prev ? { ...prev, data } : null)
  } catch (err) {
    console.error('Ошибка:', err)
  }
}

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
            cardData={activeEvent.data}
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