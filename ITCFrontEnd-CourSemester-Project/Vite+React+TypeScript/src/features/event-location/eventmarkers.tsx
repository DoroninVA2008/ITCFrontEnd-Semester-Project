import React, { useRef, useEffect, useMemo, useCallback } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import { createPortal } from 'react-dom'
import L from 'leaflet' // @ts-ignore
import MarkerPolitTarget from '../../assets/MarkerPolitTarget.png' // @ts-ignore
import MarkerSwordTarget from '../../assets/MarkerSwordTarget.png' // @ts-ignore
import iconShadow from '../../../public/marker-shadow.png'
import { EventCard } from '../card-informat/eventcards'
import { EventObject } from './evenPositions'

type EventMarkerProps = {
  event: EventObject
  markerKey: string
  isActive: boolean
  onOpen: (markerKey: string) => void
  onClose: (markerKey: string) => void
}

const popupTimeOut = 100

const battleIcon = L.icon({
  iconUrl: MarkerPolitTarget,
  shadowUrl: iconShadow,
  iconSize: [32, 48],
  iconAnchor: [16, 32],
  popupAnchor: [0, 4],
})

const tragedyIcon = L.icon({
  iconUrl: MarkerSwordTarget,
  shadowUrl: iconShadow,
  iconSize: [32, 48],
  iconAnchor: [16, 32],
  popupAnchor: [0, 4],
})

const getIconByEventType = (eventType: number) => {
  return eventType === 1 ? battleIcon : tragedyIcon
}

export const EventMarker: React.FC<EventMarkerProps> = ({ event, markerKey, isActive, onOpen, onClose }) => {
  const map = useMap()
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  const lat = parseFloat(event.latitude)
  const lng = parseFloat(event.longitude)
  const position = !isNaN(lat) && !isNaN(lng) ? ([lat, lng] as [number, number]) : null
  const markerLatLng = useMemo(() => (position ? L.latLng(position[0], position[1]) : null), [position])

  if (!position || !markerLatLng) return null

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return dateString
    }
  }

  const handleCardClose = useCallback(() => {
    markerRef.current?.closePopup()
    onClose(markerKey)
  }, [markerKey, onClose])

  useEffect(() => {
    if (!isActive) {
      markerRef.current?.closePopup()
    }
  }, [isActive])

  const eventHandlers = {
    mouseover: () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }
      if (markerRef.current) {
        markerRef.current.openPopup()
      }
    },
    mouseout: () => {
      closeTimeoutRef.current = setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.closePopup()
        }
      }, popupTimeOut)
    },
    click: (e: L.LeafletMouseEvent) => {
      const marker = e.target as L.Marker
      marker.openPopup()
      onOpen(markerKey)
    },
  }

  return (
    <>
      <Marker
        position={position}
        icon={getIconByEventType(event.eventType)}
        ref={markerRef}
        eventHandlers={eventHandlers}
      >
        <Popup>
          <div
            onMouseEnter={() => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current)
                closeTimeoutRef.current = null
              }
            }}
          >
            <h3 style={{ margin: '0 0 6px 0', color: '#FFFFFF' }}>{event.title}</h3>
            <small style={{ color: '#FFFFFF', display: 'block', fontSize: '14px', marginTop: '0.2em' }}>
              🗓️ {formatDate(event.eventDate)}
            </small>
          </div>
        </Popup>
      </Marker>

      {/* Карточка появляется при активном маркере */}
      {isActive && (
        <CardOnMap position={markerLatLng} map={map} event={event} onClose={handleCardClose} />
      )}
    </>
  )
}

const CardOnMap: React.FC<{
  position: L.LatLng
  map: L.Map
  event: EventObject
  onClose: () => void
}> = ({ position, map, event, onClose }) => {
  const [cardPosition, setCardPosition] = React.useState({ top: 0, left: 0 })

  React.useEffect(() => {
    const updatePosition = () => {
      const point = map.latLngToContainerPoint(position)
      setCardPosition({
        top: point.y - 100,
        left: point.x + 20,
      })
    }
    updatePosition()
    map.on('move', updatePosition)
    map.on('zoom', updatePosition)
    map.on('resize', updatePosition)
    return () => {
      map.off('move', updatePosition)
      map.off('zoom', updatePosition)
      map.off('resize', updatePosition)
    }
  }, [map, position])

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: cardPosition.top,
        left: cardPosition.left,
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
    >
      <EventCard
        eventTitle={event.title}
        eventDate={event.eventDate}
        eventDescription={event.description}
        imageUrl={event.previewUrlImage}
        onClose={onClose}
        onLearnMore={() => console.log('open', event.id)}
      />
    </div>,
    map.getContainer()
  )
}
