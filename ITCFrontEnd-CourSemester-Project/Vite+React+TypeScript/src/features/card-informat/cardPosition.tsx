import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { EventCard } from '../card-informat/eventcards'
import { EventObject } from '../marker-location/evenPositions' // @ts-ignore
import './eventcard.scss'

export const CardOnMap: React.FC<{
  isVisible: boolean;
  position: L.LatLng;
  event: EventObject;
  onClose: () => void;
  cardData?: any;
}> = ({ isVisible, event, onClose, cardData }) => {
  const [show, setShow] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShow(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setIsClosing(false);
    }
  }, [isVisible]);

  const mapWrapper = document.getElementById('map-wrapper');

  if (!mapWrapper) return null;

  return createPortal(
    <div
      className={`event-card-shell ${show ? 'is-visible' : 'is-hidden'} ${isClosing ? 'is-closing' : ''}`}
      style={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        pointerEvents: show && !isClosing ? 'auto' : 'none',
        zIndex: 100,
      }}
    >
      <EventCard
        eventTitle={event.title}
        eventDate={event.eventDate}
        eventDescription={event.description}
        imageUrl={event.previewUrlImage}
        siteUrl={event.siteUrl}
        onClose={handleClose}
        cardData={cardData}
      />
    </div>,
    mapWrapper
  );
};