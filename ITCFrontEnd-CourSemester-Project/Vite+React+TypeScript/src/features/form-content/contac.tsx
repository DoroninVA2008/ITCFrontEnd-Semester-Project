import React, { useState, useRef, useEffect } from 'react'
import { SuccessModal } from './success'
import './modal.scss'

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartClose?: () => void;
  isClosing?: boolean;
  eventName?: string;
  onSuccess?: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, eventName, onSuccess }) => {
  const [isClosing, setIsClosing] = useState(false)
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const tgRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setIsClosing(true)
    const timer = setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
    return () => clearTimeout(timer)
  }

  useEffect(() => {
    const emailVal = emailRef.current?.value || ''
    const tgVal = tgRef.current?.value || ''
    const emailValid = emailVal.includes('@') && emailVal.trim() !== ''
    const tgValid = tgVal.trim() !== ''
    setIsFormValid(emailValid && tgValid)
  }, [email, telegram])

  const handleSend = () => {
    // Сначала закрываем текущую модалку
    handleClose();
    
    // Через небольшую задержку открываем SuccessModal
    setTimeout(() => {
      setSuccessModalOpen(true);
      if (onSuccess) {
        onSuccess();
      }
    }, 300); // Задержка должна совпадать с длительностью анимации закрытия
  }

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
  }

  return (
    <>
      <div
        className={`modal-overlay ${(isOpen && !isClosing) ? 'open' : 'close'}`}
        style={{ display: isOpen || isClosing ? 'flex' : 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose}>×</button>
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
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
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
              ref={tgRef}
              onChange={(e) => setTelegram(e.target.value)}
              required
            />
          </div>
          <div className="success-actions">
            <button
              className={`submit-btn final-submit-btn ${isFormValid ? 'with-background' : ''}`}
              disabled={!isFormValid}
              onClick={handleSend}
            >
              Отправить заявку
            </button>
          </div>
        </div>
      </div>
      
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessClose}
      />
    </>
  )
}