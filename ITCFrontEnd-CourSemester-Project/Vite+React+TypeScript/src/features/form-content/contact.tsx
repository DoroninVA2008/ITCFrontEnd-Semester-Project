import React from 'react';
import './modal.scss'; // Используем тот же SCSS файл

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName?: string; // Опционально - название события
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, eventName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="35" stroke="#C09139" strokeWidth="2"/>
            <path d="M25 40L35 50L55 30" stroke="#C09139" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        
        <h2 className="modal-title">Заявка отправлена!</h2>
        <p className="modal-description">
          {eventName ? (
            <>Событие <strong>«{eventName}»</strong> успешно отправлено на модерацию.</>
          ) : (
            <>Спасибо за ваше предложение! Мы рассмотрим его <br />в ближайшее время и свяжемся с вами.</>
          )}
        </p>
        
        <div className="success-actions">
          <button 
            className="action-btn primary" 
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};