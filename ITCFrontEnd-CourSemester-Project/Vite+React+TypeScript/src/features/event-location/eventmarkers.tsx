import React, { useState, useRef, useEffect } from 'react'
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
}

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

export const EventMarker: React.FC<EventMarkerProps> = ({ event }) => {
  const map = useMap()
  const markerRef = useRef<L.Marker | null>(null)
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [cardLatLng, setCardLatLng] = useState<L.LatLng | null>(null)

  const lat = parseFloat(event.latitude)
  const lng = parseFloat(event.longitude)
  const position = !isNaN(lat) && !isNaN(lng) ? ([lat, lng] as [number, number]) : null

  if (!position) return null

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const eventHandlers = {
    click: (e: L.LeafletMouseEvent) => {
      const marker = e.target as L.Marker
      const shouldClose = marker.isPopupOpen() && isCardOpen

      if (shouldClose) {
        marker.closePopup()
        setIsCardOpen(false)
        setCardLatLng(null)
        return
      }

      marker.openPopup()
      setCardLatLng(e.latlng)
      setIsCardOpen(true)
    },
    popupclose: () => {
      setIsCardOpen(false)
      setCardLatLng(null)
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
          <div>
            <h3 style={{ margin: '0 0 6px 0', color: '#FFFFFF' }}>{event.title}</h3>
            <small style={{ color: '#FFFFFF', display: 'block', fontSize: '14px', marginTop: '0.2em' }}>
              🗓️ {formatDate(event.eventDate)}
            </small>
          </div>
        </Popup>
      </Marker>

      {isCardOpen && cardLatLng && (
        <CardOnMap 
          position={cardLatLng} 
          map={map}
          event={event}
          onClose={() => {
            markerRef.current?.closePopup()
            setIsCardOpen(false)
            setCardLatLng(null)
          }}
        />
      )}
    </>
  )
}

// Компонент для отображения карточки на карте
const CardOnMap: React.FC<{
  position: L.LatLng
  map: L.Map
  event: EventObject
  onClose: () => void
}> = ({ position, map, event, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const updatePosition = () => {
      const point = map.latLngToContainerPoint(position)
      setCardPosition({
        top: point.y - 100, // Смещение вверх, чтобы карточка была над маркером
        left: point.x + 20, // Смещение вправо от маркера
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
      ref={cardRef}
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
        // useMapPosition={false}
      />
    </div>,
    map.getContainer()
  )
}