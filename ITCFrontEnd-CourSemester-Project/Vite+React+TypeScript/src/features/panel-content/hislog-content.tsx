import React, { useState } from 'react' // @ts-ignore
import '../../pages/hislog/hislog.scss'

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

export const HisLogContentComponent: React.FC = () => {
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
      <div className="hislog">
        <div className="hislog__header">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9.5" stroke="#1a1a1a" strokeWidth="1.6" />
            <path d="M12 7V12.5L15.5 15" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1>История изменений</h1>
          <p>Все действия модераторов по заявкам</p>
        </div>
          <div className="hislog__search-wrap">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="6.5" stroke="#888" strokeWidth="1.5" />
              <path d="M14 14L18 18" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              className="hislog__search"
              type="text"
              placeholder="Поиск по событию, действию или модератору"
              value={search}
              onChange={e => handleSearch(e.target.value)} />
          </div><p className="hislog__count">Всего записей: <strong>{filtered.length}</strong></p><div className="hislog__timeline">
            {paged.map(entry => (
              <div key={entry.id} className="hislog__entry">
                <div className="hislog__dot" />
                <div className="hislog__card">
                  <div className="hislog__card-top">
                    <span className={`hislog__badge hislog__badge--${entry.action}`}>{entry.actionLabel}</span>
                    <div className="hislog__date">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="7.5" stroke="#888" strokeWidth="1.5" />
                        <path d="M10 6V10.5L13 13" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{entry.date}</span>
                    </div>
                  </div>
                  <div className="hislog__title-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M4 4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H14C14.2652 2.00006 14.5195 2.10545 14.707 2.293L19.707 7.293C19.8946 7.48049 19.9999 7.7348 20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4ZM17.586 8L14 4.414V8H17.586ZM12 4H6V20H18V10H13C12.7348 10 12.4804 9.89464 12.2929 9.70711C12.1054 9.51957 12 9.26522 12 9V4ZM8 13C8 12.7348 8.10536 12.4804 8.29289 12.2929C8.48043 12.1054 8.73478 12 9 12H15C15.2652 12 15.5196 12.1054 15.7071 12.2929C15.8946 12.4804 16 12.7348 16 13C16 13.2652 15.8946 13.5196 15.7071 13.7071C15.5196 13.8946 15.2652 14 15 14H9C8.73478 14 8.48043 13.8946 8.29289 13.7071C8.10536 13.5196 8 13.2652 8 13ZM8 17C8 16.7348 8.10536 16.4804 8.29289 16.2929C8.48043 16.1054 8.73478 16 9 16H15C15.2652 16 15.5196 16.1054 15.7071 16.2929C15.8946 16.4804 16 16.7348 16 17C16 17.2652 15.8946 17.5196 15.7071 17.7071C15.5196 17.8946 15.2652 18 15 18H9C8.73478 18 8.48043 17.8946 8.29289 17.7071C8.10536 17.5196 8 17.2652 8 17Z" fill="#555555"/>
</svg>
                    <span className="hislog__title">{entry.title}</span>
                    <span className="hislog__req-id">({entry.requestId})</span>
                  </div>
                  <p className="hislog__description">{entry.description}</p>
                  <div className="hislog__moderator">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0833 16.25V14.6667C15.0833 13.8268 14.7497 13.0214 14.1558 12.4275C13.562 11.8336 12.7565 11.5 11.9167 11.5H7.16667C6.32681 11.5 5.52136 11.8336 4.9275 12.4275C4.33363 13.0214 4 13.8268 4 14.6667V16.25" stroke="#555555" stroke-width="2" stroke-linejoin="round"/>
<path d="M9.54167 8.33333C11.2906 8.33333 12.7083 6.91557 12.7083 5.16667C12.7083 3.41776 11.2906 2 9.54167 2C7.79276 2 6.375 3.41776 6.375 5.16667C6.375 6.91557 7.79276 8.33333 9.54167 8.33333Z" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                    <span>{entry.moderator}</span>
                  </div>
                </div>
              </div>
            ))}
          </div><div className="hislog__pagination">
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
  );
}