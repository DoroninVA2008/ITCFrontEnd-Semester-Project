import React, { useState, useRef, useEffect } from 'react'
import { SuccessModal } from './success'
import './modal.scss'

export interface ContactEventPayload {
  name: string;
  date: string;
  description: string;
  eventType: string;
  zipFile?: File | null;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartClose?: () => void;
  isClosing?: boolean;
  eventName?: string;
  onSuccess?: () => void;
  formApiUrl: string;
  eventPayload: ContactEventPayload;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  eventName,
  onSuccess,
  formApiUrl,
  eventPayload,
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const tgRef = useRef<HTMLInputElement>(null)

  const getEventTypeId = (value: string) => {
    if (value === 'political') return 1
    if (value === 'military') return 2
    return null
  }

  const toIsoDate = (value: string) => {
    const parts = value.split('.')
    if (parts.length !== 3) return null
    const [ddStr, mmStr, yyyyStr] = parts
    const day = Number(ddStr)
    const month = Number(mmStr)
    const year = Number(yyyyStr)
    if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return null
    if (year < 1900 || year > 2100) return null
    if (month < 1 || month > 12) return null
    const daysInMonth = new Date(year, month, 0).getDate()
    if (day < 1 || day > daysInMonth) return null
    const mm = String(month).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `${year}-${mm}-${dd}`
  }

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

  const handleSend = async () => {
    if (isSubmitting) return
    setError(null)

    // alert('Отправка...');

    if (!eventPayload) {// setError
      alert('Не удалось отправить заявку: данные события не найдены!')
      return
    }

    const eventDate = toIsoDate(eventPayload.date)
    if (!eventDate) {
      alert('Некорректная дата. Используйте формат ДД.ММ.ГГГГ!')
      return
    }

    const eventTypeId = getEventTypeId(eventPayload.eventType)
    if (!eventTypeId) {
      alert('Некорректный тип события.');
      return
    }

    const formData = new FormData();
    formData.append('title', eventPayload.name);
    formData.append('description', eventPayload.description);
    if (eventPayload.zipFile) {
      formData.append('archive', eventPayload.zipFile);
    }
    formData.append('email', email);
    formData.append('telegramUsername', telegram);
    formData.append('eventDate', eventDate);
    formData.append('eventTypeId', String(eventTypeId));

    setIsSubmitting(true)
    try {
      const res = await fetch(formApiUrl, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      if (data.message !== 'success') {
        throw new Error('Unexpected response format')
      }

      handleClose();

      setTimeout(() => {
        setSuccessModalOpen(true);
        if (onSuccess) {
          onSuccess();
        }
      }, 300);
    } catch (err) {
      console.error('Ошибка при отправке:', err);
      alert('Не удалось отправить заявку. Проверьте данные и попробуйте ещё раз!');
    } finally {
      setIsSubmitting(false)
    }
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
              value={email}
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
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              required
            />
          </div>
          <div className="success-actions">
            <button
              className={`submit-btn final-submit-btn ${isFormValid ? 'with-background' : ''}`}
              disabled={!isFormValid || isSubmitting}
              onClick={handleSend}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
            {error && <p className="form-error">{error}</p>}
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