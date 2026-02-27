import React, { useState, useRef, useEffect } from 'react'
import './modal.scss'

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName?: string;
}

export const ContactModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, eventName }) => {
  if (!isOpen) return null;
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [isFormValid, setIsFormValid] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const tgRef = useRef<HTMLInputElement>(null)

  // Проверяем валидность формы при изменениях
  useEffect(() => {
  const email = emailRef.current?.value || ''
  const tg = tgRef.current?.value || ''
  const emailValid = email.includes('@') && email.trim() !== ''
  const tgValid = tg.trim() !== ''
  setIsFormValid(emailValid && tgValid)
}, [emailRef.current?.value, tgRef.current?.value])

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : 'close'}`} onClick={(e) => e.stopPropagation()}>
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
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
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
            ref={tgRef}
            onChange={(e) => setTelegram(e.target.value)}
          /> 
        </div>
        <div className="success-actions">
          <button
            type="submit"
            data-index="2"
            className={`submit-btn final-submit-btn ${isFormValid ? 'with-background' : ''}`}
            onClick={() => {
              // Можно оставить пустым или вызвать onClose или что нужно
            }}
          >
            Отправить заявку
          </button>
        </div>
      </div>
    </div>
  )
}