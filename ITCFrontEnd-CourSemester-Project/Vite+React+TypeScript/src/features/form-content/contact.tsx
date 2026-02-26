import React from 'react'
import './modal.scss'

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName?: string;
}

export const ContactModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, eventName }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : 'close'}`} 
        onClick={(e) => e.stopPropagation()}>
      <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Контактные данные</h2>
        <p className="modal-description">
          {eventName ? (
            <>Заполните контактные данные, мы проверим корректность материалов, после модерации вы получите обратную связь</>
          ) : (
            <>Спасибо за ваше предложение! Мы рассмотрим его <br />в ближайшее время и свяжемся с вами.</>
          )}
        </p>
        <div className="form-group" id="GEMail">
          <label htmlFor="email" className="GEMail">Email</label>
            <input 
              type="text" 
              id="email" 
              name="email"
              placeholder="имя@mail.com" 
              required 
            />
        </div>
        <div className="form-group" id="TG">
          <label htmlFor="tg" className="TG">Telegram</label>
          <input 
            type="text" 
            id="tg" 
            name="tg"
            placeholder="@имя пользователя" 
            required 
          /> 
        </div>
        <div className="success-actions">
          <button type="submit" data-index="2" className="submit-btn final-submit-btn">
              Отправить заявку
            </button>
        </div>
      </div>
    </div>
  );
};