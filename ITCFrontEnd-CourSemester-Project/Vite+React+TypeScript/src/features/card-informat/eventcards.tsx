import React, { useState } from 'react'
// import { cards } from '../../app/saga/saga' 
// @ts-ignore
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

// const initialState = {
//   cardData: null,
//   loading: false,
//   error: null
// };

// const cardSlice = createSlice({
//   name: 'card',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(FETCH_CARD_DATA, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(FETCH_CARD_DATA_SUCCESS, (state, action) => {
//         state.loading = false;
//         state.cardData = action.payload.data;
//       })
//       .addCase(FETCH_CARD_DATA_FAILURE, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.error;
//       });
//   }
// });

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

  const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // В случае неправильного формата
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.');
};

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
          {imageUrl && <img src={imageUrl} alt={eventTitle} className="event-tooltip-image" />}
        </div>
        <div className="event-tooltip-info">
          <h3 className="event-tooltip-title">{eventTitle}</h3>
          <p className="event-tooltip-description">{eventDescription}</p>
          <span className="event-tooltip-date">{formatDate(eventDate)}</span>
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