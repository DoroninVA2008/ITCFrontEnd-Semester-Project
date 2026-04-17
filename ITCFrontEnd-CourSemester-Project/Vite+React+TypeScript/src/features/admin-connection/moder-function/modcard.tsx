import React from 'react'

export type RoleType = 'super_admin' | 'admin'

export interface Moderator {
  id: string
  email: string
  login: string
  role: RoleType
  createdAt: string
}

export const ROLE_LABEL: Record<RoleType, string> = {
  super_admin: 'Супер админ',
  admin: 'Модератор',
}

interface ModerCardProps {
  mod: Moderator
  copied: string | null
  openMenuId: string | null
  menuClosing: string | null
  menuRef: React.RefObject<HTMLDivElement | null>
  onCopy: (login: string) => void
  onMenuToggle: (id: string) => void
  onMenuClose: (id: string) => void
  onChangeRole: (mod: Moderator) => void
  onDelete: (mod: Moderator) => void
}

export const forMoDate = (dateString: string): string => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  const datePart = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).replace(' г.', '')
  return `${datePart}`
}

export const ModerCard: React.FC<ModerCardProps> = ({
  mod,
  copied,
  openMenuId,
  menuClosing,
  menuRef,
  onCopy,
  onMenuToggle,
  onMenuClose,
  onChangeRole,
  onDelete,
}) => (
  <div className="moder-table__row">
    <span className="moder-table__id">{mod.id}</span>
    <span className="moder-table__email">{mod.email}</span>
    <div className="moder-table__login">
      <span>{mod.login}</span>
      <button
        className="moder-table__copy-btn"
        onClick={() => onCopy(mod.login)}
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
    <span className="moder-table__date">{forMoDate(mod.createdAt)}</span>
    <div
      className="moder-table__actions" // @ts-ignore
      ref={openMenuId === mod.id ? menuRef : null}
    >
      <button
        className="moder-table__dots-btn"
        onClick={() => openMenuId === mod.id ? onMenuClose(mod.id) : onMenuToggle(mod.id)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="12" r="1.5" fill="#555"/>
          <circle cx="12" cy="12" r="1.5" fill="#555"/>
          <circle cx="19" cy="12" r="1.5" fill="#555"/>
        </svg>
      </button>
      {(openMenuId === mod.id || menuClosing === mod.id) && (
        <div className={`moder-table__menu${menuClosing === mod.id ? ' moder-table__menu--closing' : ''}`}>
          <button className="moder-table__menu-item" onClick={() => onChangeRole(mod)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M10 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21M14.305 16.53L15.228 16.148M15.228 13.852L14.305 13.469M16.852 12.228L16.469 11.305M16.852 17.772L16.469 18.696M19.148 12.228L19.531 11.305M19.53 18.696L19.148 17.772M20.772 13.852L21.696 13.469M20.772 16.148L21.696 16.531" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 18C19.6569 18 21 16.6569 21 15C21 13.3431 19.6569 12 18 12C16.3431 12 15 13.3431 15 15C15 16.6569 16.3431 18 18 18Z" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Изменить роль
          </button>
          <button className="moder-table__menu-item moder-table__menu-item--danger" onClick={() => onDelete(mod)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14 11V17M10 11V17M6 7V19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7M4 7H20M7 7L9 3H15L17 7" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Удалить
          </button>
        </div>
      )}
    </div>
  </div>
)
