import React, { useState } from 'react'
import { EventObject } from '../event-location/evenPositions' // @ts-ignore
import './eventcard.scss'

interface EventCardProps {
  eventTitle: string;
  eventDate: string;
  eventDescription: string;
  imageUrl?: string;
  onClose: () => void;
  siteUrl?: string; // Оставляем для обратной совместимости
  markerKey?: string;
  onMarkerClickClose?: (markerKey: string) => void;
  closeDelay?: number; 
  cardData?: any; // Здесь будут данные из API с полем siteUrl
}

export const EventCard: React.FC<EventCardProps> = ({
  eventTitle,
  eventDate,
  eventDescription,
  imageUrl,
  siteUrl: propSiteUrl, // Переименовываем, чтобы не путать
  onClose,
  markerKey,
  onMarkerClickClose,
  closeDelay = 300,
  cardData,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseClick = () => {
    if (isClosing) return;

    setIsClosing(true);

    setTimeout(() => {
      onClose();
      if (markerKey && onMarkerClickClose) {
        onMarkerClickClose(markerKey);
      };
      // EventCard.classList.add("is-closing");
      setIsClosing(true);
    }, closeDelay);
  };

  const handleLearnMore = () => {
    // Приоритет: сначала из cardData, потом из propSiteUrl
    let url = cardData?.siteUrl || propSiteUrl;
    
    if (!url) {
      console.warn('URL не найден');
      return;
    }
    
    // Проверяем, что URL начинается с http:// или https://
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Открываем в новой вкладке
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\//g, '.');
  };

  // Получаем актуальные данные (из cardData или из пропсов)
  const actualTitle = cardData?.title || eventTitle;
  const actualDescription = cardData?.description || eventDescription;
  const actualDate = cardData?.eventDate || eventDate;
  const actualImageUrl = cardData?.imageUrl || imageUrl;
  const actualSiteUrl = cardData?.siteUrl || propSiteUrl;

  return (
    <div className={`event-tooltip-card ${isClosing ? 'is-closing' : ''}`}>
      <button 
        className="event-tooltip-close-btn" 
        onClick={handleCloseClick} 
        aria-label="Close"
        disabled={isClosing}
      >
        &times;
      </button>
      <div className="event-tooltip-header">
        <div className="event-tooltip-image-placeholder">
          {actualImageUrl ? (
            <img 
              src={actualImageUrl} 
              alt={actualTitle} 
              className="event-tooltip-image" 
            />
          ) : null}
        </div>
        <div className="event-tooltip-info">
          <h3 className="event-tooltip-title">
            {actualTitle}
          </h3>
          <p className="event-tooltip-description">
            {actualDescription}
          </p>
          <span className="event-tooltip-date">
            {formatDate(actualDate)}
          </span>
        </div>
      </div>
      {actualSiteUrl !== undefined && (
        <button 
          className="event-tooltip-learn-more-btn" 
          href={actualSiteUrl} 
          onClick={handleLearnMore} // actualSiteUrl
          disabled={!actualSiteUrl || isClosing}
          style={{ 
            opacity: actualSiteUrl ? 1 : 0.5, 
            cursor: actualSiteUrl ? 'pointer' : 'not-allowed' 
          }}
        >
          Узнать больше
        </button>
      )}
      <div className="RightToolTyipe"></div>
    </div>
  );
};