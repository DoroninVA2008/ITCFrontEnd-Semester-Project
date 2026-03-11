import React from 'react' // @ts-ignore
import './eventcard.scss' // Подключаем SCSS для стилей

// Определение пропсов для нашего компонента
interface EventCardProps {
  eventTitle: string;        // Заголовок события
  eventDate: string;         // Дата события
  eventDescription: string;  // Описание события
  imageUrl?: string;         // Необязательная ссылка на изображение
  onClose: () => void;       // Функция, вызываемая при закрытии карточки (по твоему 'x')
  onLearnMore: () => void;   // Функция, вызываемая при клике на "Узнать больше"
  // Пропсы для позиционирования на карте
  top: number;
  left: number;
}

// Заглушка для иконки изображения
const ImageIcon: React.FC = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 19V5H19V19H5ZM16.5 8C17.3284 8 18 7.32843 18 6.5C18 5.67157 17.3284 5 16.5 5C15.6716 5 15 5.67157 15 6.5C15 7.32843 15.6716 8 16.5 8ZM11 16L14 12L18 17H6L11 16Z"
      fill="currentColor"
    />
  </svg>
);

export const EventCard: React.FC<EventCardProps> = ({
  eventTitle,
  eventDate,
  eventDescription,
  imageUrl,
  onClose,
  onLearnMore,
  top,
  left,
}) => {
  return (
    // Позиционируем компонент абсолютно
    <div className="event-tooltip-card" style={{ top: top, left: left }}>
      <button className="event-tooltip-close-btn" onClick={onClose} aria-label="Закрыть">
        &times;
      </button>

      <div className="event-tooltip-header">
        <div className="event-tooltip-image-placeholder">
          {imageUrl ? (
            <img src={imageUrl} alt={eventTitle} className="event-tooltip-image" />
          ) : (
            <ImageIcon />
          )}
        </div>

        <div className="event-tooltip-info">
          <h3 className="event-tooltip-title">{eventTitle}</h3>
          <span className="event-tooltip-date">{eventDate}</span>
        </div>
      </div>

      <p className="event-tooltip-description">{eventDescription}</p>

      <button className="event-tooltip-learn-more-btn" onClick={onLearnMore}>
        Узнать больше
      </button>
    </div>
  );
};