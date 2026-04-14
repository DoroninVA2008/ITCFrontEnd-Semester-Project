import React from 'react'
import { Request } from '../panel-content/admreq'

const STATUS_LABEL: Record<string, string> = {
  published: 'Опубликовано',
  review: 'На проверке',
  rejected: 'Отклонено',
  new: 'Новая',
}

interface RequestModalContentProps {
  request: Request
  isVerified: boolean
  showRejectConfirm: boolean
  onVerify: () => void
  onReject: () => void
  onApprove: () => void
}

export const RequestModalContent: React.FC<RequestModalContentProps> = ({
  request,
  isVerified,
  showRejectConfirm,
  onVerify,
  onReject,
  onApprove,
}) => {
  const renderRequestFields = () => (
    <>
      <h3 className="request-modal__section-heading">Описание события</h3>
      <p className="request-modal__description">{request.description}</p>

      <div className="request-modal__grid">
        <div className="request-modal__field">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="#555" strokeWidth="1.5"/>
            <path d="M3 8H17" stroke="#555" strokeWidth="1.5"/>
            <path d="M7 2V5M13 2V5" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="request-modal__label">Дата события</span>
          <span className="request-modal__value">{request.eventDate}</span>
        </div>
        
        <div className="request-modal__field">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2C7.24 2 5 4.24 5 7C5 10.75 10 17 10 17C10 17 15 10.75 15 7C15 4.24 12.76 2 10 2Z" stroke="#555" strokeWidth="1.5"/>
            <circle cx="10" cy="7" r="2" stroke="#555" strokeWidth="1.5"/>
          </svg>
          <span className="request-modal__label">Тип события</span>
          <span className="request-modal__value">{request.eventType}</span>
        </div>
        
        <div className="request-modal__field">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="7" r="3.5" stroke="#555" strokeWidth="1.5"/>
            <path d="M3 17C3 14 6.13 12 10 12C13.87 12 17 14 17 17" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="request-modal__label">Telegram</span>
          <span className="request-modal__value">{request.telegram}</span>
        </div>
        
        <div className="request-modal__field">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="5" width="16" height="11" rx="2" stroke="#555" strokeWidth="1.5"/>
            <path d="M2 7L10 12L18 7" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="request-modal__label">Email</span>
          <span className="request-modal__value">{request.email}</span>
        </div>
      </div>

      <div className="request-modal__field request-modal__field--full">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7.5" stroke="#555" strokeWidth="1.5"/>
          <path d="M10 6V10.5L13 13" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="request-modal__label">Дата подачи заявки</span>
        <span className="request-modal__value">{request.date}</span>
      </div>
    </>
  )

  return (
    <>
      <div className="request-modal__header-row">
        <h2 className="request-modal__title">{request.title}</h2>
        {(isVerified || showRejectConfirm) && (
          <span className={`request-modal__status-badge request-modal__status-badge--${showRejectConfirm ? 'rejected' : request.status}`}>
            <span className="request-modal__status-dot" />
            {showRejectConfirm ? STATUS_LABEL['rejected'] : (STATUS_LABEL[request.status] ?? request.status)}
          </span>
        )}
      </div>
      <span className="request-modal__id">{request.id}</span>

      {renderRequestFields()}

      {!isVerified && !showRejectConfirm && (
        <button className="request-modal__verify" onClick={onVerify}>Проверить</button>
      )}

      {isVerified && !showRejectConfirm && (
        <>
          <button className="request-modal__preview">Предпросмотр</button>
          <div className="request-modal__actions">
            <button className="request-modal__reject" onClick={onReject}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M13 7L7 13M7 7L13 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              Отклонить
            </button>
            <button className="request-modal__approve" onClick={onApprove}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M6.5 10.5L9 13L13.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Одобрить
            </button>
          </div>
        </>
      )}
    </>
  )
}