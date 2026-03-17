import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { EventCard } from '../card-informat/eventcards'
import { EventObject } from '../event-location/evenPositions'
import { cards } from '../../app/saga/saga' // @ts-ignore
import './eventcard.scss'

export const CardOnMap: React.FC<{
  isVisible: boolean;
  position: L.LatLng;
  event: EventObject;
  onClose: () => void;
}> = ({ isVisible, event, onClose }) => {
  const [show, setShow] = useState(false);

  const urlEvent = event.id - 1;
  const siteUrl = cards[urlEvent];

  useEffect(() => {
    if (isVisible) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isVisible]);

  const mapWrapper = document.getElementById('map-wrapper');

  if (!mapWrapper) return null;

  return createPortal(
    <div
      className={`event-card-shell ${show ? 'is-visible' : 'is-hidden'}`}
      style={{
        position: 'absolute',
        top: '0px', // Отступ сверху
        right: '0px', // Отступ справа
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: 10000,
      }}
    >
      <EventCard
        eventTitle={event.title}
        eventDate={event.eventDate}
        eventDescription={event.description}
        imageUrl={event.previewUrlImage}
        onClose={onClose}
        siteUrl={siteUrl}
      />
    </div>,
    mapWrapper
  );
};