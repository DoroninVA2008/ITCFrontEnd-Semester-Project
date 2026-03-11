import React, { useState, useRef } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
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
  const [cardPos, setCardPos] = useState<{ top: number; left: number } | null>(null)

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
        return
      }

      marker.openPopup()
      const p = map.latLngToContainerPoint(e.latlng)
      setCardPos({ top: p.y - 20, left: p.x + 20 })
      setIsCardOpen(true)
    },
    popupclose: () => {
      setIsCardOpen(false)
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

      {isCardOpen && cardPos && (
        <EventCard
          eventTitle={event.title}
          eventDate={event.eventDate}
          eventDescription={event.description}
          imageUrl={event.previewUrlImage}
          top={cardPos.top}
          left={cardPos.left}
          onClose={() => {
            markerRef.current?.closePopup()
            setIsCardOpen(false)
          }}
          onLearnMore={() => console.log('open', event.id)}
          useMapPosition
        />
      )}
    </>
  )
}
