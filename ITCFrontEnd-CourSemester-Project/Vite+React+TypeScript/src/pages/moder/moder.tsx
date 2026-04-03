import React, { useState } from 'react'
import { Headmer } from '../../widgets/headmer.tsx' // @ts-ignore
import '../admin/admin.scss' // @ts-ignore
import './moder.scss'

type RoleType = 'super_admin' | 'moderator'

interface Moderator {
  id: string
  email: string
  login: string
  role: RoleType
  createdAt: string
}

const mockModerators: Moderator[] = [
  { id: 'MOD-001', email: 'admin@history.ru',   login: 'admin_xK9mPv2L', role: 'super_admin', createdAt: '15 янв. 2025' },
  { id: 'MOD-002', email: 'ivanov@history.ru',  login: 'admin_Qw3nR8kM', role: 'moderator',   createdAt: '20 фев. 2025' },
  { id: 'MOD-003', email: 'petrova@history.ru', login: 'admin_Zt5bH7jK', role: 'moderator',   createdAt: '10 мар. 2025' },
  { id: 'MOD-004', email: 'kozlov@history.ru',  login: 'admin_Lp4cY6wN', role: 'moderator',   createdAt: '5 янв. 2026'  },
]

const ROLE_LABEL: Record<RoleType, string> = {
  super_admin: 'Супер админ',
  moderator: 'Модератор',
}

export const Moder: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (login: string) => {
    navigator.clipboard.writeText(login)
    setCopied(login)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="AdminPage">
      <Headmer />
      <div className="moder-content">
        <div className="moder-content__top">
          <div className="moder-content__title-block">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.663 3.79167C18.2236 4.12886 18.6874 4.60537 19.0094 5.17486C19.3313 5.74436 19.5005 6.38747 19.5003 7.04167C19.5005 7.69587 19.3313 8.33898 19.0094 8.90847C18.6874 9.47797 18.2236 9.95447 17.663 10.2917M2.16699 22.75C2.16699 20.3233 2.16699 18.46 2.63933 17.5327C3.05477 16.7173 3.71766 16.0544 4.53299 15.639C5.46033 15.1667 6.67366 15.1667 9.10032 15.1667H11.4837C13.9103 15.1667 15.1237 15.1667 16.051 15.639C16.8663 16.0544 17.5292 16.7173 17.9447 17.5327C18.417 18.46 18.417 20.3233 18.417 22.75M23.8337 22.75V22.1C23.8337 19.6733 23.8337 18.46 23.3613 17.5327C22.9459 16.7173 22.283 16.0544 21.4677 15.639M10.292 10.8333C10.7899 10.8333 11.283 10.7353 11.743 10.5447C12.203 10.3542 12.621 10.0749 12.9731 9.72278C13.3252 9.37069 13.6045 8.9527 13.795 8.49268C13.9856 8.03265 14.0837 7.5396 14.0837 7.04167C14.0837 6.54374 13.9856 6.05068 13.795 5.59066C13.6045 5.13063 13.3252 4.71264 12.9731 4.36055C12.621 4.00846 12.203 3.72917 11.743 3.53862C11.283 3.34807 10.7899 3.25 10.292 3.25C9.28638 3.25 8.32195 3.64948 7.61088 4.36055C6.8998 5.07163 6.50033 6.03605 6.50033 7.04167C6.50033 8.04728 6.8998 9.0117 7.61088 9.72278C8.32195 10.4339 9.28638 10.8333 10.292 10.8333Z" stroke="#555555" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            <div>
              <h1>Модераторы</h1>
              <p>Управление учётными записями модераторов</p>
            </div>
          </div>
          <button className="moder-content__add-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Добавить модератора
          </button>
        </div>

        <div className="moder-table">
          <div className="moder-table__header">
            <span>ID</span>
            <span>Email</span>
            <span>Логин</span>
            <span>Роль</span>
            <span>Создан</span>
            <span>Действие</span>
          </div>

          {mockModerators.map(mod => (
            <div key={mod.id} className="moder-table__row">
              <span className="moder-table__id">{mod.id}</span>
              <span className="moder-table__email">{mod.email}</span>
              <div className="moder-table__login">
                <span>{mod.login}</span>
                <button
                  className="moder-table__copy-btn"
                  onClick={() => handleCopy(mod.login)}
                  title="Скопировать логин"
                >
                  {copied === mod.login ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="#1a8a4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="9" y="9" width="11" height="11" rx="2" stroke="#555" strokeWidth="1.6"/>
                      <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="#555" strokeWidth="1.6"/>
                    </svg>
                  )}
                </button>
              </div>
              <div className={`moder-table__role moder-table__role--${mod.role}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7V12C3 16.418 7.03 20.527 12 22C16.97 20.527 21 16.418 21 12V7L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
                {ROLE_LABEL[mod.role]}
              </div>
              <span className="moder-table__date">{mod.createdAt}</span>
              <div className="moder-table__actions">
                <button className="moder-table__dots-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="12" r="1.5" fill="#555"/>
                    <circle cx="12" cy="12" r="1.5" fill="#555"/>
                    <circle cx="19" cy="12" r="1.5" fill="#555"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
