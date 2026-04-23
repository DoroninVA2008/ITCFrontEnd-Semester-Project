import React, { useState } from 'react'
import { RequestModalContent } from '../admin-connection/admin-function/reqmodal'
import { ApproveModal } from '../admin-connection/admin-function/apprej'
import { rejectRequest, reviewRequest, approveRequest } from '../admin-connection/moder-function/modreques'

export interface Request {
  id: string
  title: string
  status: string
  createdAt?: string
  date: string
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

export const RequestModal: React.FC<RequestModalProps> = ({ request, onClose }) => {
  const [isClosing, setIsClosing] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [showRejectConfirm, setShowRejectConfirm] = useState(false)
  const [rejectComment, setRejectComment] = useState('')
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [isRequestFading, setIsRequestFading] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 300)
  }

  const handleApproveOpen = async () => {
    try {
      await approveRequest(request.id, Number((request as any).eventTypeId) || 1)
    } catch (err: any) {
      console.error('Ошибка одобрения:', err?.message)
    }
    setIsRequestFading(true)
    setShowApproveModal(true)
  }

  const handleApproveClose = () => {
    setShowApproveModal(false)
    setIsRequestFading(false)
  }

  const handleApproveConfirm = () => {
    setShowApproveModal(false)
    setIsRequestFading(false)
    handleClose()
  }

  const handleVerify = async () => {
    try {
      await reviewRequest(request.id)
    } catch (err: any) {
      console.error('Ошибка взятия в работу:', err?.message)
    }
    setIsVerified(true)
  }

  const handleRejectConfirm = async () => {
    try {
      await rejectRequest(request.id, rejectComment)
    } catch (err: any) {
      console.error('Ошибка отклонения:', err?.message)
    }
    handleClose()
  }

  return (
    <>
      <div className={`request-modal__overlay${isClosing ? ' request-modal__overlay--closing' : ''}`}>
        <div
          className={`request-modal${isClosing ? ' request-modal--closing' : ''}${isRequestFading ? ' request-modal--fading-for-approve' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="request-modal__close" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          <RequestModalContent // @ts-ignore
            request={request}
            isVerified={isVerified}
            showRejectConfirm={showRejectConfirm}
            rejectComment={rejectComment}
            onCommentChange={setRejectComment}
            onVerify={handleVerify}
            onReject={() => setShowRejectConfirm(true)}
            onRejectConfirm={handleRejectConfirm}
            onApprove={handleApproveOpen}
          />
        </div>
      </div>

      {showApproveModal && (
        <ApproveModal // @ts-ignore
          request={request}
          onClose={handleApproveClose}
          onConfirm={handleApproveConfirm}
        />
      )}
    </>
  )
}
