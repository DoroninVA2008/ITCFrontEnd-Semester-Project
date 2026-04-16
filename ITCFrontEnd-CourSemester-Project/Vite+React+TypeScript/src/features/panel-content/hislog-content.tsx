import React, { useState, useEffect } from 'react' // @ts-ignore
import '../../pages/hislog/hislog.scss'
import { HisLogCard } from '../admin-connection/hislog-function/hiscard'
import { fetchHistory, LogEntry } from '../admin-connection/hislog-function/hisreques'

const PAGE_SIZE = 9

export const HisLogContentComponent: React.FC = () => {
  const [log, setLog] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchHistory().then(data => {
      setLog(data)
      setLoading(false)
    })
  }, [])

  const filtered = log.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.actionLabel.toLowerCase().includes(search.toLowerCase()) ||
    e.moderator.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (v: string) => { setSearch(v); setPage(1) }

  if (loading) return <div className="hislog__loading">Загрузка...</div>

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
                <HisLogCard entry={entry} />
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