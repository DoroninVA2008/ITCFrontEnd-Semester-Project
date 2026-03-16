import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import L from 'leaflet' // @ts-ignore
import { EventCard } from '../card-informat/eventcards'
import { EventObject } from '../event-location/evenPositions'

export const CardOnMap: React.FC<{
  isVisible: boolean;
  position: L.LatLng;
  map: L.Map;
  event: EventObject;
  onClose: () => void;
}> = ({ isVisible, map, event, onClose }) => {
  const [show, setShow] = useState(false);

  // при изменении пропа isVisible — запускаем анимацию.
  useEffect(() => {
    if (isVisible) {
      setShow(true); // показываем сразу, а анимацию включим чуть позже
    } else {
      // при скрытии — чуть задержка для плавности, или сразу
      setShow(false);
    }
  }, [isVisible]);

  return createPortal(
    <div
      className={`event-card-shell ${show ? 'is-visible' : 'is-hidden'}`}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: 1000,
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
  );
};