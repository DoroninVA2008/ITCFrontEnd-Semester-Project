import React from 'react';
import './eventcard.scss';

interface EventCardProps {
  eventTitle: string;
  eventDate: string;
  eventDescription: string;
  imageUrl?: string;
  onClose: () => void;
  siteUrl?: string;
  markerKey?: string;
  onMarkerClickClose?: (markerKey: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  eventTitle,
  eventDate,
  eventDescription,
  imageUrl,
  onClose,
  siteUrl,
  markerKey,
  onMarkerClickClose,
}) => {
  const handleCloseClick = () => {
    onClose();
    if (markerKey && onMarkerClickClose) {
      onMarkerClickClose(markerKey);
    }
  };

  const handleLearnMore = () => {
    if (!siteUrl) return;
    
    // Нормализация URL (добавляем https:// если нужно)
    let url = siteUrl;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Открываем в новой вкладке
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="event-tooltip-card">
      <button 
        className="event-tooltip-close-btn" 
        onClick={handleCloseClick} 
        aria-label="Close"
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
      
      {/* Вариант с кнопкой */}
      <button 
        className="event-tooltip-learn-more-btn" 
        onClick={handleLearnMore}
        disabled={!siteUrl}
        style={{ opacity: siteUrl ? 1 : 0.5, cursor: siteUrl ? 'pointer' : 'not-allowed' }}
      >
        Узнать больше
      </button>
      
      {/* Или вариант с ссылкой (закомментирован) */}
      {/* {siteUrl && (
        <a 
          className="event-tooltip-learn-more-btn" 
          href={siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Узнать больше
        </a>
      )} */}
      
      <div className="RightToolTyipe"></div>
    </div>
  );
};