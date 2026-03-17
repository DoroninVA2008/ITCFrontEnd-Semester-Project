import React, { useState } from 'react'
// import { cards } from '../../app/saga/saga' // @ts-ignore
import './eventcard.scss'

interface EventCardProps {
  eventTitle: string;
  eventDate: string;
  eventDescription: string;
  imageUrl?: string;
  onClose: () => void;
  siteUrl?: string;
  markerKey?: string;
  onMarkerClickClose?: (markerKey: string) => void;
  closeDelay?: number; // Пропс для настройки задержки
}

export const EventCard: React.FC<EventCardProps> = ({
  eventTitle,
  eventDate,
  eventDescription,
  imageUrl,
  siteUrl,
  onClose,
  markerKey,
  onMarkerClickClose,
  closeDelay = 300, // Задержка по умолчанию 300мс
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseClick = () => {
    if (isClosing) return; // Предотвращаем множественные клики
    
    setIsClosing(true);
    
    // Задержка перед закрытием
    setTimeout(() => {
      onClose();
      if (markerKey && onMarkerClickClose) {
        onMarkerClickClose(markerKey);
      }
      // Сбрасываем состояние после закрытия
      setIsClosing(false);
    }, closeDelay);
  };

  const handleLearnMore = () => {
    let url = siteUrl
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`event-tooltip-card ${isClosing ? 'is-closing' : ''}`}>
      <button 
        className="event-tooltip-close-btn" 
        onClick={handleCloseClick} 
        aria-label="Close"
        disabled={isClosing} // Блокируем кнопку во время закрытия
      >
        &times;
      </button>
      <div className="event-tooltip-header">
        <div className="event-tooltip-image-placeholder">
          {imageUrl && <img src={imageUrl} alt={eventTitle} className="event-tooltip-image" />}
        </div>
        <div className="event-tooltip-info">
          <h3 className="event-tooltip-title">{eventTitle}</h3>
          <p className="event-tooltip-description">{eventDescription}</p>
          <span className="event-tooltip-date">{eventDate}</span>
        </div>
      </div>
      {siteUrl !== undefined && (
        <button 
          className="event-tooltip-learn-more-btn" 
          onClick={handleLearnMore}
          disabled={!siteUrl || isClosing}
          style={{ opacity: siteUrl ? 1 : 0.5, cursor: siteUrl ? 'pointer' : 'not-allowed' }}
        >
          Узнать больше
        </button>
      )}
      <div className="RightToolTyipe"></div>
    </div>
  )
};