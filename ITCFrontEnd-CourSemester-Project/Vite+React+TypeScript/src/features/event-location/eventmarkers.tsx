import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react'
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
const popupFadeDuration = 220
const cardFadeDuration = 300

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
  const fadeCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cardUnmountTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const [shouldRenderCard, setShouldRenderCard] = useState(false)
  const [isCardVisible, setIsCardVisible] = useState(false)

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
    setIsCardVisible(false)
    markerRef.current?.closePopup()
    onClose(markerKey)
  }, [markerKey, onClose])

  useEffect(() => {
    if (!isActive) {
      markerRef.current?.closePopup()
    }
  }, [isActive])

  useEffect(() => {
    if (isActive) {
      if (cardUnmountTimeoutRef.current) {
        clearTimeout(cardUnmountTimeoutRef.current)
        cardUnmountTimeoutRef.current = null
      }
      setShouldRenderCard(true)
      requestAnimationFrame(() => setIsCardVisible(true))
      return
    }

    setIsCardVisible(false)
    if (shouldRenderCard) {
      cardUnmountTimeoutRef.current = setTimeout(() => {
        setShouldRenderCard(false)
        cardUnmountTimeoutRef.current = null
      }, cardFadeDuration)
    }
  }, [isActive, shouldRenderCard])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
      if (fadeCloseTimeoutRef.current) {
        clearTimeout(fadeCloseTimeoutRef.current)
      }
      if (cardUnmountTimeoutRef.current) {
        clearTimeout(cardUnmountTimeoutRef.current)
      }
    }
  }, [])

  const clearPopupCloseTimers = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (fadeCloseTimeoutRef.current) {
      clearTimeout(fadeCloseTimeoutRef.current)
      fadeCloseTimeoutRef.current = null
    }
  }

  const removeFadeClass = (marker: L.Marker) => {
    const popupElement = marker.getPopup()?.getElement()
    if (popupElement) {
      popupElement.classList.remove('event-marker-popup-fade-out')
    }
  }

  const closePopupWithFade = (marker: L.Marker) => {
    const popupElement = marker.getPopup()?.getElement()
    if (!popupElement) {
      marker.closePopup()
      return
    }

    popupElement.classList.add('event-marker-popup-fade-out')
    fadeCloseTimeoutRef.current = setTimeout(() => {
      marker.closePopup()
      popupElement.classList.remove('event-marker-popup-fade-out')
      fadeCloseTimeoutRef.current = null
    }, popupFadeDuration)
  }

  const eventHandlers = {
    mouseover: () => {
      if (markerRef.current) {
        clearPopupCloseTimers()
        removeFadeClass(markerRef.current)
        markerRef.current.openPopup()
      }
    },
    mouseout: () => {
      closeTimeoutRef.current = setTimeout(() => {
        if (markerRef.current) {
          closePopupWithFade(markerRef.current)
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
        <Popup className="event-marker-popup">
          <div
            onMouseEnter={() => {
              if (markerRef.current) {
                clearPopupCloseTimers()
                removeFadeClass(markerRef.current)
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

      {shouldRenderCard && (
        <CardOnMap
          isVisible={isCardVisible}
          position={markerLatLng}
          map={map}
          event={event}
          onClose={handleCardClose}
        />
      )}
    </>
  )
}

const CardOnMap: React.FC<{
  isVisible: boolean
  position: L.LatLng
  map: L.Map
  event: EventObject
  onClose: () => void
}> = ({ isVisible, position, map, event, onClose }) => {
  const [cardPosition, setCardPosition] = useState({ top: - 300, left: - 20 })

  useEffect(() => {
    const updatePosition = () => {
      const point = map.latLngToContainerPoint(position)
      setCardPosition({
        top: point.y - 300,
        left: point.x - 20,
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
      className={`event-card-shell ${isVisible ? 'is-visible' : 'is-hidden'}`}
      style={{
        position: 'absolute',
        top: cardPosition.top,
        left: cardPosition.left,
        zIndex: 1000,
        pointerEvents: isVisible ? 'auto' : 'none',
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