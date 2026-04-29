import React, { useState, useRef, useEffect } from 'react'
import { SuccessModal } from '../form-dispatch/success'
import { submitContactForm, type ContactEventPayload } from '../form-dispatch/foreques' // @ts-ignore
import './modal.scss'

export type { ContactEventPayload }

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName?: string;
  onSuccess?: () => void;
  formApiUrl: string;
  eventPayload: ContactEventPayload;
  onFormReset?: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  eventName,
  onSuccess,
  formApiUrl,
  eventPayload,
  onFormReset, // новый проп
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const [isSubmitClosing, setIsSubmitClosing] = useState(false)
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const tgRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
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

    if (!eventPayload) {
      alert('Не удалось отправить заявку: данные события не найдены!')
      return
    }

    setIsSubmitting(true)
    try {
      await submitContactForm(formApiUrl, eventPayload, email, telegram)

      setIsSubmitClosing(true)
      setTimeout(() => {
        setIsSubmitClosing(false)
        onClose()
        setSuccessModalOpen(true)
        if (onSuccess) onSuccess()
      }, 300) // 500
    } catch (err) {
      console.error('Ошибка при отправке:', err)
      alert('Не удалось отправить заявку. Проверьте данные и попробуйте ещё раз!')
    } finally {
      setIsSubmitting(false)
    }
  }

  // const handleSuccessClose = () => {
  //   setSuccessModalOpen(false);
  // }

  const resetForm = () => {
    setEmail('');
    setTelegram('');
  }

  return (
    <>
      <div
        className={`modal-overlay ${(isOpen && !isClosing && !isSubmitClosing) ? 'open' : ''} ${isClosing ? 'close' : ''} ${isSubmitClosing ? 'submit-closing' : ''}`}
        style={{ display: isOpen || isClosing || isSubmitClosing ? 'flex' : 'none' }}
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
        onClose={() => {
          setSuccessModalOpen(false)
        }}
        onReset={() => {
          resetForm()
          if (onFormReset) onFormReset()
        }}
      />
    </>
  )
}