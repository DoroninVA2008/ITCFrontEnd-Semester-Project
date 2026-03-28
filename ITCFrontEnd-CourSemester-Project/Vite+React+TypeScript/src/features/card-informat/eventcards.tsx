import React from 'react'
import { EventObject } from './reurlcard' // @ts-ignore
import './eventcard.scss'

interface EventCardProps {
  eventTitle: string;
  eventDate: string;
  eventDescription: string;
  imageUrl?: string;
  onClose: () => void; // @ts-ignore
  siteUrl?: string;
  markerKey?: string;
  onMarkerClickClose?: (markerKey: string) => void;
  closeDelay?: number;
  cardData?: EventObject;
}

export const EventCard: React.FC<EventCardProps> = ({
  eventTitle,
  eventDate,
  eventDescription,
  imageUrl,
  siteUrl: propSiteUrl,
  onClose,
  markerKey,
  onMarkerClickClose,
  cardData
}) => {

  const handleCloseClick = () => {
    onClose();

    if (markerKey && onMarkerClickClose) {
      onMarkerClickClose(markerKey);
    }
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

  const actualTitle = cardData?.title || eventTitle;
  const actualDescription = cardData?.description || eventDescription;
  const actualDate = cardData?.eventDate || eventDate;
  const actualImageUrl = cardData?.previewUrlImage || imageUrl;
  const rawSiteUrl = cardData?.siteUrl || propSiteUrl || null;
  const actualSiteUrl = rawSiteUrl
    ? rawSiteUrl.startsWith('http://') || rawSiteUrl.startsWith('https://')
      ? rawSiteUrl
      : `https://${rawSiteUrl}`
    : null;

  const handleLearnMoreClick = () => {
    if (actualSiteUrl) {
      window.open(actualSiteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  console.log('[EventCard] siteUrl debug:', { rawSiteUrl, actualSiteUrl, propSiteUrl, cardDataSiteUrl: cardData?.siteUrl });

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
          {actualImageUrl ? (
            <img 
              src={actualImageUrl} 
              alt="Загрузка..."
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
      <button
        className="event-tooltip-learn-more-btn"
        onClick={handleLearnMoreClick}
        disabled={!actualSiteUrl}
      >
        Узнать больше
      </button>
      <div className="RightToolTyipe"></div>
    </div>
  );
};