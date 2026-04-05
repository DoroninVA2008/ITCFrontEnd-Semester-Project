import React, { useState, useEffect, useRef } from 'react'

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

export const ModerContentComponent: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [menuClosing, setMenuClosing] = useState<string | null>(null)
  const [changeRoleMod, setChangeRoleMod] = useState<Moderator | null>(null)
  const [changeRoleClosing, setChangeRoleClosing] = useState(false)
  const [selectedRole, setSelectedRole] = useState<RoleType>('moderator')
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)
  const [addModerOpen, setAddModerOpen] = useState(false)
  const [addModerClosing, setAddModerClosing] = useState(false)
  const [addEmail, setAddEmail] = useState('')
  const [addRole, setAddRole] = useState<RoleType>('moderator')
  const [addRoleDropdownOpen, setAddRoleDropdownOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const closeMenu = (id: string) => {
    setMenuClosing(id)
    setTimeout(() => { setOpenMenuId(null); setMenuClosing(null) }, 300)
  }

  const closeChangeRole = () => {
    setChangeRoleClosing(true)
    setTimeout(() => { setChangeRoleMod(null); setChangeRoleClosing(false) }, 300)
  }

  const closeAddModer = () => {
    setAddModerClosing(true)
    setTimeout(() => { setAddModerOpen(false); setAddModerClosing(false) }, 300)
  }

  const openChangeRole = (mod: Moderator) => {
    setSelectedRole(mod.role)
    setChangeRoleMod(mod)
    if (openMenuId) closeMenu(openMenuId)
  }

  useEffect(() => {
    if (!openMenuId) return
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu(openMenuId)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [openMenuId])

  const handleCopy = (login: string) => {
    navigator.clipboard.writeText(login)
    setCopied(login)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
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
          <button className="moder-content__add-btn" onClick={() => { setAddEmail(''); setAddRole('moderator'); setAddModerOpen(true) }}>
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
              <div
                className="moder-table__actions"
                ref={openMenuId === mod.id ? menuRef : null}
              >
                <button
                  className="moder-table__dots-btn"
                  onClick={() => openMenuId === mod.id ? closeMenu(mod.id) : setOpenMenuId(mod.id)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="12" r="1.5" fill="#555"/>
                    <circle cx="12" cy="12" r="1.5" fill="#555"/>
                    <circle cx="19" cy="12" r="1.5" fill="#555"/>
                  </svg>
                </button>
                {(openMenuId === mod.id || menuClosing === mod.id) && (
                  <div className={`moder-table__menu${menuClosing === mod.id ? ' moder-table__menu--closing' : ''}`}>
                    <button className="moder-table__menu-item" onClick={() => openChangeRole(mod)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21M14.305 16.53L15.228 16.148M15.228 13.852L14.305 13.469M16.852 12.228L16.469 11.305M16.852 17.772L16.469 18.696M19.148 12.228L19.531 11.305M19.53 18.696L19.148 17.772M20.772 13.852L21.696 13.469M20.772 16.148L21.696 16.531" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18 18C19.6569 18 21 16.6569 21 15C21 13.3431 19.6569 12 18 12C16.3431 12 15 13.3431 15 15C15 16.6569 16.3431 18 18 18Z" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Изменить роль
                    </button>
                    <button className="moder-table__menu-item moder-table__menu-item--danger">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 11V17M10 11V17M6 7V19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7M4 7H20M7 7L9 3H15L17 7" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Удалить
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {changeRoleMod && (
          <div className={`role-modal__overlay${changeRoleClosing ? ' role-modal__overlay--closing' : ''}`} onMouseDown={e => e.stopPropagation()}>
            <div className={`role-modal${changeRoleClosing ? ' role-modal--closing' : ''}`} onMouseDown={e => e.stopPropagation()}>
              <h2 className="role-modal__title">Изменить роль</h2>
              <p className="role-modal__subtitle">
                Изменить роль модератора <strong>{changeRoleMod.login}</strong>
              </p>
              <label className="role-modal__label">Новая роль</label>
              <div className="role-modal__select-wrap" onClick={() => setRoleDropdownOpen(o => !o)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="role-modal__select-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.6663 7.58331C11.6663 10.5 9.62467 11.9583 7.19801 12.8041C7.07094 12.8472 6.9329 12.8451 6.80717 12.7983C4.37467 11.9583 2.33301 10.5 2.33301 7.58331V3.49998C2.33301 3.34527 2.39447 3.19689 2.50386 3.0875C2.61326 2.9781 2.76163 2.91664 2.91634 2.91664C4.08301 2.91664 5.54134 2.21664 6.55634 1.32998C6.67992 1.22439 6.83713 1.16638 6.99967 1.16638C7.16222 1.16638 7.31943 1.22439 7.44301 1.32998C8.46384 2.22248 9.91634 2.91664 11.083 2.91664C11.2377 2.91664 11.3861 2.9781 11.4955 3.0875C11.6049 3.19689 11.6663 3.34527 11.6663 3.49998V7.58331Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className="role-modal__select-label">{ROLE_LABEL[selectedRole]}</span>
                <svg className={`role-modal__chevron${roleDropdownOpen ? ' role-modal__chevron--open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {roleDropdownOpen && (
                  <div className="role-modal__options">
                    {(['moderator', 'super_admin'] as RoleType[]).map(role => (
                      <div
                        key={role}
                        className={`role-modal__option${selectedRole === role ? ' role-modal__option--active' : ''}`}
                        onMouseDown={e => { e.stopPropagation(); setSelectedRole(role); setRoleDropdownOpen(false) }}
                      >
                        {role === 'super_admin' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="role-modal__option-icon--super">
                            <path d="M11.6663 7.58331C11.6663 10.5 9.62467 11.9583 7.19801 12.8041C7.07094 12.8472 6.9329 12.8451 6.80717 12.7983C4.37467 11.9583 2.33301 10.5 2.33301 7.58331V3.49998C2.33301 3.34527 2.39447 3.19689 2.50386 3.0875C2.61326 2.9781 2.76163 2.91664 2.91634 2.91664C4.08301 2.91664 5.54134 2.21664 6.55634 1.32998C6.67992 1.22439 6.83713 1.16638 6.99967 1.16638C7.16222 1.16638 7.31943 1.22439 7.44301 1.32998C8.46384 2.22248 9.91634 2.91664 11.083 2.91664C11.2377 2.91664 11.3861 2.9781 11.4955 3.0875C11.6049 3.19689 11.6663 3.34527 11.6663 3.49998V7.58331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.25 6.99998L6.41667 8.16665L8.75 5.83331" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M11.6663 7.58331C11.6663 10.5 9.62467 11.9583 7.19801 12.8041C7.07094 12.8472 6.9329 12.8451 6.80717 12.7983C4.37467 11.9583 2.33301 10.5 2.33301 7.58331V3.49998C2.33301 3.34527 2.39447 3.19689 2.50386 3.0875C2.61326 2.9781 2.76163 2.91664 2.91634 2.91664C4.08301 2.91664 5.54134 2.21664 6.55634 1.32998C6.67992 1.22439 6.83713 1.16638 6.99967 1.16638C7.16222 1.16638 7.31943 1.22439 7.44301 1.32998C8.46384 2.22248 9.91634 2.91664 11.083 2.91664C11.2377 2.91664 11.3861 2.9781 11.4955 3.0875C11.6049 3.19689 11.6663 3.34527 11.6663 3.49998V7.58331Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        )}
                        <span>{ROLE_LABEL[role]}</span>
                        {selectedRole === role && (
                          <svg className="role-modal__check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 12" fill="none">
                            <path d="M5.28846 8.775L13.7635 0.3C13.9635 0.1 14.1968 0 14.4635 0C14.7301 0 14.9635 0.1 15.1635 0.3C15.3635 0.5 15.4635 0.737667 15.4635 1.013C15.4635 1.28833 15.3635 1.52567 15.1635 1.725L5.98846 10.925C5.78846 11.125 5.55513 11.225 5.28846 11.225C5.02179 11.225 4.78846 11.125 4.58846 10.925L0.288462 6.625C0.0884617 6.425 -0.00753846 6.18767 0.000461538 5.913C0.00846154 5.63833 0.112795 5.40067 0.313461 5.2C0.514128 4.99933 0.751795 4.89933 1.02646 4.9C1.30113 4.90067 1.53846 5.00067 1.73846 5.2L5.28846 8.775Z" fill="white"/>
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="role-modal__actions">
                <button className="role-modal__cancel" onClick={closeChangeRole}>
                  Отмена
                </button>
                <button className="role-modal__save">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        )}

        {addModerOpen && (
          <div className={`role-modal__overlay${addModerClosing ? ' role-modal__overlay--closing' : ''}`}>
            <div className={`role-modal${addModerClosing ? ' role-modal--closing' : ''}`} onMouseDown={e => e.stopPropagation()}>
              <h2 className="role-modal__title">Добавить модератора</h2>
              <p className="role-modal__subtitle">Логин будет сгенерирован автоматически</p>
              <label className="role-modal__label">Email</label>
              <input
                className="role-modal__input"
                type="email"
                placeholder="email@example.com"
                value={addEmail}
                onChange={e => setAddEmail(e.target.value)}
              />
              <label className="role-modal__label">Роль</label>
              <div className="role-modal__select-wrap" onClick={() => setAddRoleDropdownOpen(o => !o)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="role-modal__select-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.6663 7.58331C11.6663 10.5 9.62467 11.9583 7.19801 12.8041C7.07094 12.8472 6.9329 12.8451 6.80717 12.7983C4.37467 11.9583 2.33301 10.5 2.33301 7.58331V3.49998C2.33301 3.34527 2.39447 3.19689 2.50386 3.0875C2.61326 2.9781 2.76163 2.91664 2.91634 2.91664C4.08301 2.91664 5.54134 2.21664 6.55634 1.32998C6.67992 1.22439 6.83713 1.16638 6.99967 1.16638C7.16222 1.16638 7.31943 1.22439 7.44301 1.32998C8.46384 2.22248 9.91634 2.91664 11.083 2.91664C11.2377 2.91664 11.3861 2.9781 11.4955 3.0875C11.6049 3.19689 11.6663 3.34527 11.6663 3.49998V7.58331Z" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="role-modal__select-label">{ROLE_LABEL[addRole]}</span>
                <svg className={`role-modal__chevron${addRoleDropdownOpen ? ' role-modal__chevron--open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {addRoleDropdownOpen && (
                  <div className="role-modal__options">
                    {(['moderator', 'super_admin'] as RoleType[]).map(role => (
                      <div
                        key={role}
                        className={`role-modal__option${addRole === role ? ' role-modal__option--active' : ''}`}
                        onMouseDown={e => { e.stopPropagation(); setAddRole(role); setAddRoleDropdownOpen(false) }}
                      >
                        {role === 'super_admin' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="role-modal__option-icon--super">
                            <path d="M11.6663 7.58331C11.6663 10.5 9.62467 11.9583 7.19801 12.8041C7.07094 12.8472 6.9329 12.8451 6.80717 12.7983C4.37467 11.9583 2.33301 10.5 2.33301 7.58331V3.49998C2.33301 3.34527 2.39447 3.19689 2.50386 3.0875C2.61326 2.9781 2.76163 2.91664 2.91634 2.91664C4.08301 2.91664 5.54134 2.21664 6.55634 1.32998C6.67992 1.22439 6.83713 1.16638 6.99967 1.16638C7.16222 1.16638 7.31943 1.22439 7.44301 1.32998C8.46384 2.22248 9.91634 2.91664 11.083 2.91664C11.2377 2.91664 11.3861 2.9781 11.4955 3.0875C11.6049 3.19689 11.6663 3.34527 11.6663 3.49998V7.58331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.25 6.99998L6.41667 8.16665L8.75 5.83331" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M11.6663 7.58331C11.6663 10.5 9.62467 11.9583 7.19801 12.8041C7.07094 12.8472 6.9329 12.8451 6.80717 12.7983C4.37467 11.9583 2.33301 10.5 2.33301 7.58331V3.49998C2.33301 3.34527 2.39447 3.19689 2.50386 3.0875C2.61326 2.9781 2.76163 2.91664 2.91634 2.91664C4.08301 2.91664 5.54134 2.21664 6.55634 1.32998C6.67992 1.22439 6.83713 1.16638 6.99967 1.16638C7.16222 1.16638 7.31943 1.22439 7.44301 1.32998C8.46384 2.22248 9.91634 2.91664 11.083 2.91664C11.2377 2.91664 11.3861 2.9781 11.4955 3.0875C11.6049 3.19689 11.6663 3.34527 11.6663 3.49998V7.58331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        <span>{ROLE_LABEL[role]}</span>
                        {addRole === role && (
                          <svg className="role-modal__check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 12" fill="none">
                            <path d="M5.28846 8.775L13.7635 0.3C13.9635 0.1 14.1968 0 14.4635 0C14.7301 0 14.9635 0.1 15.1635 0.3C15.3635 0.5 15.4635 0.737667 15.4635 1.013C15.4635 1.28833 15.3635 1.52567 15.1635 1.725L5.98846 10.925C5.78846 11.125 5.55513 11.225 5.28846 11.225C5.02179 11.225 4.78846 11.125 4.58846 10.925L0.288462 6.625C0.0884617 6.425 -0.00753846 6.18767 0.000461538 5.913C0.00846154 5.63833 0.112795 5.40067 0.313461 5.2C0.514128 4.99933 0.751795 4.89933 1.02646 4.9C1.30113 4.90067 1.53846 5.00067 1.73846 5.2L5.28846 8.775Z" fill="white"/>
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="role-modal__actions">
                <button className="role-modal__cancel" onClick={closeAddModer}>
                  Отмена
                </button>
                <button
                  className="role-modal__save"
                  disabled={!addEmail.includes('@')}
                  style={{ opacity: addEmail.includes('@') ? 1 : 0.5, cursor: addEmail.includes('@') ? 'pointer' : 'default' }}
                >
                  Создать
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }