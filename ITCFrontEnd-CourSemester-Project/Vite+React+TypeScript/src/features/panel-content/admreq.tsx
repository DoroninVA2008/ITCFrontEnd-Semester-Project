import React, { useState } from 'react'

export interface Request {
  id: string
  title: string
  date: string
  status: string
  description: string
  eventDate: string
  eventType: string
  telegram: string
  email: string
}

export const mockRequests: Request[] = [
  {
    id: 'APP-001',
    title: 'Битва при Бородино',
    date: '15 марта 2026, 10:30',
    status: 'published',
    description: 'Крупнейшее сражение Отечественной войны 1812 года между русской армией под командованием генерала М. И. Кутузова и французской армией Наполеона I Бонапарта.',
    eventDate: '7 Сентября 1812',
    eventType: 'Битва',
    telegram: '@KCTowner',
    email: 'History@mail.com',
  },
  {
    id: 'APP-002',
    title: 'Ледовое побоище',
    date: '18 мар. 2026, 14:15',
    status: 'review',
    description: 'Сражение на Чудском озере в 1242 году между новгородским войском под предводительством князя Александра Невского и ливонскими рыцарями.',
    eventDate: '5 Апреля 1242',
    eventType: 'Битва',
    telegram: '@HistoryFan',
    email: 'fan@mail.com',
  },
  {
    id: 'APP-003',
    title: 'Полтавская битва',
    date: '19 мар. 2026, 9:45',
    status: 'review',
    description: 'Решающее сражение Великой Северной войны, в котором армия Петра I разгромила шведские войска Карла XII.',
    eventDate: '8 Июля 1709',
    eventType: 'Битва',
    telegram: '@PetrFan',
    email: 'peter@mail.com',
  },
  {
    id: 'APP-004',
    title: 'Куликовская битва',
    date: '20 мар. 2026, 11:20',
    status: 'published',
    description: 'Сражение между объединённым русским войском под командованием московского великого князя Дмитрия Донского и войском темника Золотой Орды Мамая.',
    eventDate: '8 Сентября 1380',
    eventType: 'Битва',
    telegram: '@DmitryFan',
    email: 'dmitry@mail.com',
  },
  {
    id: 'APP-005',
    title: 'Восстание декабристов',
    date: '20 мар. 2026, 16:30',
    status: 'rejected',
    description: 'Попытка государственного переворота, совершённая 14 декабря 1825 года группой дворян-офицеров на Сенатской площади в Санкт-Петербурге.',
    eventDate: '14 Декабря 1825',
    eventType: 'Восстание',
    telegram: '@DecemberFan',
    email: 'dec@mail.com',
  },
]

interface RequestModalProps {
  request: Request
  onClose: () => void
}

const STATUS_LABEL: Record<string, string> = {
  published: 'Опубликовано',
  review:    'На проверке',
  rejected:  'Отклонено',
  new:       'Новая',
}

export const RequestModal: React.FC<RequestModalProps> = ({ request, onClose }) => {
  const [isClosing, setIsClosing] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 250)
  }

  return (
    <div className={`request-modal__overlay${isClosing ? ' request-modal__overlay--closing' : ''}`} onClick={handleClose}>
      <div className={`request-modal${isClosing ? ' request-modal--closing' : ''}`} onClick={(e) => e.stopPropagation()}>

        <button className="request-modal__close" onClick={handleClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="request-modal__header-row">
          <h2 className="request-modal__title">{request.title}</h2>
          {isVerified && (
            <span className={`request-modal__status-badge request-modal__status-badge--${request.status}`}>
              <span className="request-modal__status-dot" />
              {STATUS_LABEL[request.status] ?? request.status}
            </span>
          )}
        </div>
        <span className="request-modal__id">{request.id}</span>

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

        {!isVerified ? (
          <button className="request-modal__verify" onClick={() => setIsVerified(true)}>Проверить</button>
        ) : (
          <>
            <button className="request-modal__preview">Предпросмотр</button>
            <div className="request-modal__actions">
              <button className="request-modal__reject">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M13 7L7 13M7 7L13 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
                Отклонить
              </button>
              <button className="request-modal__approve">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M6.5 10.5L9 13L13.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Одобрить
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
