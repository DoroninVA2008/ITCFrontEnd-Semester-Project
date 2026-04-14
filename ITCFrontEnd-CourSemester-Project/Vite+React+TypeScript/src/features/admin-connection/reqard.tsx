import React from 'react'
import { Request } from '../panel-content/admreq'

interface RequestRowProps {
  request: Request
  onClick: (request: Request) => void
  statusLabel: Record<string, string>
}

export const ReqCard: React.FC<RequestRowProps> = ({ request, onClick, statusLabel }) => {
  return (
    <div 
      className="requests-table__row" 
      onClick={() => onClick(request)} 
      style={{ cursor: 'pointer' }}
    >
      <span className="requests-table__id">{request.id}</span>
      <span className="requests-table__title">{request.title}</span>
      <span className="requests-table__date">{request.date}</span>
      <span className={`requests-table__status requests-table__status--${request.status}`}>
        •&nbsp; {statusLabel[request.status]}
      </span>
    </div>
  )
}