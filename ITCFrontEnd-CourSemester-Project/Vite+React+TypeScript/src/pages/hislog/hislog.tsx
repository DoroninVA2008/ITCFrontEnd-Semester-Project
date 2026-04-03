import React, { useState } from 'react'
import { Headmer } from '../../widgets/headmer.tsx' // @ts-ignore
import './hislog.scss'

type ActionType = 'rejected' | 'approved' | 'review'

interface LogEntry {
  id: string
  action: ActionType
  actionLabel: string
  title: string
  requestId: string
  description: string
  moderator: string
  date: string
}

const ACTION_LABEL: Record<ActionType, string> = {
  rejected: 'Отклонение заявки',
  approved: 'Одобрение заявки',
  review:   'Взята на проверку',
}

const mockLog: LogEntry[] = [
  { id: '1',  action: 'rejected', actionLabel: ACTION_LABEL.rejected, title: 'Восстание декабристов', requestId: 'APP-005', description: 'Заявка отклонена: недостаточно исторических источников', moderator: 'admin_Zt5bH7jK', date: '30 мар. 2026, 18:24' },
  { id: '2',  action: 'approved', actionLabel: ACTION_LABEL.approved, title: 'Битва при Бородино',    requestId: 'APP-001', description: 'Заявка проверена и одобрена для публикации',           moderator: 'admin_Zt5bH7jK', date: '29 мар. 2026, 18:24' },
  { id: '3',  action: 'approved', actionLabel: ACTION_LABEL.approved, title: 'Куликовская битва',     requestId: 'APP-004', description: 'Заявка взята модератором на проверку',                moderator: 'admin_Zt5bH7jK', date: '29 мар. 2026, 18:24' },
  { id: '4',  action: 'review',   actionLabel: ACTION_LABEL.review,   title: 'Восстание декабристов', requestId: 'APP-005', description: 'Заявка взята модератором на проверку',                moderator: 'admin_Zt5bH7jK', date: '27 мар. 2026, 18:24' },
  { id: '5',  action: 'review',   actionLabel: ACTION_LABEL.review,   title: 'Сталинградская битва',  requestId: 'APP-007', description: 'Заявка взята модератором на проверку',                moderator: 'admin_Zt5bH7jK', date: '27 мар. 2026, 18:24' },
  { id: '6',  action: 'review',   actionLabel: ACTION_LABEL.review,   title: 'Блокада Ленинграда',    requestId: 'APP-008', description: 'Заявка взята модератором на проверку',                moderator: 'admin_Zt5bH7jK', date: '27 мар. 2026, 18:24' },
  { id: '7',  action: 'approved', actionLabel: ACTION_LABEL.approved, title: 'Ледовое побоище',       requestId: 'APP-002', description: 'Заявка проверена и одобрена для публикации',           moderator: 'admin_Zt5bH7jK', date: '25 мар. 2026, 11:10' },
  { id: '8',  action: 'review',   actionLabel: ACTION_LABEL.review,   title: 'Полтавская битва',      requestId: 'APP-003', description: 'Заявка взята модератором на проверку',                moderator: 'admin_Zt5bH7jK', date: '24 мар. 2026, 09:55' },
  { id: '9',  action: 'rejected', actionLabel: ACTION_LABEL.rejected, title: 'Куликовская битва',     requestId: 'APP-004', description: 'Заявка отклонена: требуется дополнительная проверка', moderator: 'admin_Zt5bH7jK', date: '23 мар. 2026, 16:40' },
  { id: '10', action: 'approved', actionLabel: ACTION_LABEL.approved, title: 'Сталинградская битва',  requestId: 'APP-007', description: 'Заявка проверена и одобрена для публикации',           moderator: 'admin_Zt5bH7jK', date: '22 мар. 2026, 14:20' },
  { id: '11', action: 'review',   actionLabel: ACTION_LABEL.review,   title: 'Битва при Бородино',    requestId: 'APP-001', description: 'Заявка взята модератором на проверку',                moderator: 'admin_Zt5bH7jK', date: '21 мар. 2026, 10:05' },
  { id: '12', action: 'rejected', actionLabel: ACTION_LABEL.rejected, title: 'Блокада Ленинграда',    requestId: 'APP-008', description: 'Заявка отклонена: отсутствуют документальные данные', moderator: 'admin_Zt5bH7jK', date: '20 мар. 2026, 17:35' },
  { id: '13', action: 'approved', actionLabel: ACTION_LABEL.approved, title: 'Ледовое побоище',       requestId: 'APP-002', description: 'Заявка проверена и одобрена для публикации',           moderator: 'admin_Zt5bH7jK', date: '19 мар. 2026, 12:50' },
  { id: '14', action: 'review',   actionLabel: ACTION_LABEL.review,   title: 'Полтавская битва',      requestId: 'APP-003', description: 'Заявка взята модератором на проверку',                moderator: 'admin_Zt5bH7jK', date: '18 мар. 2026, 09:30' },
  { id: '15', action: 'rejected', actionLabel: ACTION_LABEL.rejected, title: 'Восстание декабристов', requestId: 'APP-005', description: 'Заявка отклонена: недостаточно исторических источников', moderator: 'admin_Zt5bH7jK', date: '17 мар. 2026, 15:15' },
  { id: '16', action: 'approved', actionLabel: ACTION_LABEL.approved, title: 'Куликовская битва',     requestId: 'APP-004', description: 'Заявка проверена и одобрена для публикации',           moderator: 'admin_Zt5bH7jK', date: '16 мар. 2026, 13:00' },
  { id: '17', action: 'review',   actionLabel: ACTION_LABEL.review,   title: 'Сталинградская битва',  requestId: 'APP-007', description: 'Заявка взята модератором на проверку',                moderator: 'admin_Zt5bH7jK', date: '15 мар. 2026, 11:45' },
  { id: '18', action: 'approved', actionLabel: ACTION_LABEL.approved, title: 'Блокада Ленинграда',    requestId: 'APP-008', description: 'Заявка проверена и одобрена для публикации',           moderator: 'admin_Zt5bH7jK', date: '14 мар. 2026, 10:20' },
]

const PAGE_SIZE = 9

export const HisLog: React.FC = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = mockLog.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.actionLabel.toLowerCase().includes(search.toLowerCase()) ||
    e.moderator.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (v: string) => { setSearch(v); setPage(1) }

  return (
    <div className="HislogPage">
      <Headmer />

      <div className="hislog">
        <div className="hislog__header">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9.5" stroke="#1a1a1a" strokeWidth="1.6"/>
            <path d="M12 7V12.5L15.5 15" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>История изменений</h1>
          <p>Все действия модераторов по заявкам</p>
        </div>

        <div className="hislog__search-wrap">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="6.5" stroke="#888" strokeWidth="1.5"/>
            <path d="M14 14L18 18" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            className="hislog__search"
            type="text"
            placeholder="Поиск по событию, действию или модератору"
            value={search}
            onChange={e => handleSearch(e.target.value)}
          />
        </div>

        <p className="hislog__count">Всего записей: <strong>{filtered.length}</strong></p>

        <div className="hislog__timeline">
          {paged.map(entry => (
            <div key={entry.id} className="hislog__entry">
              <div className="hislog__dot" />
              <div className="hislog__card">
                <div className="hislog__card-top">
                  <span className={`hislog__badge hislog__badge--${entry.action}`}>{entry.actionLabel}</span>
                  <div className="hislog__date">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="7.5" stroke="#888" strokeWidth="1.5"/>
                      <path d="M10 6V10.5L13 13" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{entry.date}</span>
                  </div>
                </div>
                <div className="hislog__title-row">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="2" width="12" height="16" rx="2" stroke="#555" strokeWidth="1.5"/>
                    <path d="M7 7H13M7 10H11" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="hislog__title">{entry.title}</span>
                  <span className="hislog__req-id">({entry.requestId})</span>
                </div>
                <p className="hislog__description">{entry.description}</p>
                <div className="hislog__moderator">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="7" r="3.5" stroke="#888" strokeWidth="1.5"/>
                    <path d="M3 17C3 14 6.13 12 10 12C13.87 12 17 14 17 17" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>{entry.moderator}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hislog__pagination">
          <span>Страница {page} из {totalPages || 1}</span>
          <div className="hislog__pagination-btns">
            <button
              className="hislog__page-btn"
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
            >
              {'<'} Назад
            </button>
            <button
              className="hislog__page-btn"
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Вперёд {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
