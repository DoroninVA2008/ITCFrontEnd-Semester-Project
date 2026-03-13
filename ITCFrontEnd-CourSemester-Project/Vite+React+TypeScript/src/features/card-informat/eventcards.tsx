import React from 'react' // @ts-ignore
import './eventcard.scss'

interface EventCardProps {
  eventTitle: string
  eventDate: string
  eventDescription: string
  imageUrl?: string
  onClose: () => void
  onLearnMore: () => void
}

export const EventCard: React.FC<EventCardProps> = ({
  eventTitle,
  eventDate,
  eventDescription,
  imageUrl,
  onClose,
  onLearnMore,
}) => {
  return (
    <div className="event-tooltip-card">
      <button className="event-tooltip-close-btn" onClick={onClose} aria-label="Close">
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
      <button className="event-tooltip-learn-more-btn" onClick={onLearnMore}>
        Узнать больше
      </button>
    </div>
  )
}