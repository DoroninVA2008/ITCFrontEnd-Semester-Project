import React from 'react'
import { Request } from './reques'

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  const datePart = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).replace(' г.', '')
  const timePart = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${datePart}, ${timePart}`
}

const statusLabel: Record<string, string> = {
  new:       'Новая',
  review:    'На проверке',
  published: 'Опубликовано',
  rejected:  'Отклонено',
}

const statusColor: Record<string, string> = {
  review:    'rgba(230, 199, 143, 1)',
  rejected:  'rgba(236, 147, 159, 1)',
  published: 'rgba(143, 205, 143, 1)',
}


interface RequestRowProps {
  request: Request
  onClick: (request: Request) => void
}

export const ReqCard: React.FC<RequestRowProps> = ({ request, onClick }) => {
  return (
    <div
      className="requests-table__row"
      onClick={() => onClick(request)}
      style={{ cursor: 'pointer' }}
    >
      <span className="requests-table__id">
        {request.id}
      </span>
      <span className="requests-table__title">
        {request.title}
      </span>
      <span className="requests-table__date">
        {formatDate(request.date)}
      </span>
      <span
        className="requests-table__status"
        style={{ backgroundColor: statusColor[request.status] }}
      >
        •&nbsp; <span className="requests-table__dot" />
        {statusLabel[request.status] ?? request.status}
      </span>
    </div>
  )
}