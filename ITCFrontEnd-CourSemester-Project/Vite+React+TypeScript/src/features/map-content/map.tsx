import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useMapContext } from './MapContext'
import { CountryLabels } from '../layers/layers.tsx'
import { MarkerWithPopup } from '../events/markers.tsx'
import { FilterButtonList } from '../filters/filters.tsx'
import './map.scss'

const centmap: [number, number] = [68.751244, 98.618423]
const zoom = 3
const minZoom = 3
const maxZoom = 12
const maxMapBounds: [number, number][] = [[-112, -169], [84, 192]]
const TiLayer = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'

export const Map: React.FC = () => {
  const [activeEventId, setActiveEventId] = useState<number | null>(null)
  const [filteredEventTypes, setFilteredEventTypes] = useState<number[]>([])

  const handleSelectEvent = (id: number | null) => {
    setActiveEventId(id)
  }

  const handleFilterByType = (type: number | null) => {
    if (type === null) {
      setFilteredEventTypes([])
    } else if (filteredEventTypes.includes(type)) {
      setFilteredEventTypes(prev => prev.filter(t => t !== type))
    } else {
      setFilteredEventTypes(prev => [...prev, type])
    }
  }

  return (
    <div id="map-wrapper">
      <FilterButtonList //@ts-ignore
        onSelectEvent={handleSelectEvent} 
        onFilterType={handleFilterByType} />
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
        <TileLayer url={TiLayer} noWrap={false} opacity={0} />
        <CountryLabels />
        <MarkerWithPopup //@ts-ignore
          activeEventId={activeEventId}
          filteredEventTypes={filteredEventTypes}
        />
      </MapContainer>
    </div>
  )
}