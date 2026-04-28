import React, { useState, useEffect } from 'react'
import { Moderator, RoleType, ROLE_LABEL } from './modcard'
import { fetchModerators, changeAdminRole } from './modreques'

  const [moderators, setModerators] = useState<Moderator[]>([])
  const [changeRoleMod, setChangeRoleMod] = useState<Moderator | null>(null)
  const [changeRoleClosing, setChangeRoleClosing] = useState(false)
  const [selectedRole, setSelectedRole] = useState<RoleType>('super_admin')
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)

useEffect(() => {
    fetchModerators().then(setModerators)
  }, [])


  const closeChangeRole = () => {
    setChangeRoleClosing(true)
    setTimeout(() => { setChangeRoleMod(null); setChangeRoleClosing(false) }, 300)
  }

  const handleChangeRole = async () => {
    if (!changeRoleMod) return
    try {
      await changeAdminRole(changeRoleMod.id, selectedRole)
      setModerators(prev => prev.map(m => m.id === changeRoleMod.id ? { ...m, role: selectedRole } : m))
      closeChangeRole()
    } catch (err: any) {
      console.error('Ошибка изменения роли:', err?.message)
    }
  }

export const ModeRole: React.FC = () => { 
    return ( 
        <div className={`role-modal__overlay${changeRoleClosing ? ' role-modal__overlay--closing' : ''}`} onMouseDown={e => e.stopPropagation()}>
            <div className={`role-modal${changeRoleClosing ? ' role-modal--closing' : ''}`} onMouseDown={e => e.stopPropagation()}>
                <h2 className="role-modal__title">Изменить роль</h2>
                    <p className="role-modal__subtitle">
                        Изменить роль модератора 
                        <strong>
                            {changeRoleMod.login}
                        </strong>
                    </p>
                    <label className="role-modal__label">
                        Новая роль
                    </label>
                    <div className="role-modal__select-wrap" onClick={() => setRoleDropdownOpen(o => !o)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="role-modal__select-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M11.6663 7.58331C11.6663 10.5 9.62467 11.9583 7.19801 12.8041C7.07094 12.8472 6.9329 12.8451 6.80717 12.7983C4.37467 11.9583 2.33301 10.5 2.33301 7.58331V3.49998C2.33301 3.34527 2.39447 3.19689 2.50386 3.0875C2.61326 2.9781 2.76163 2.91664 2.91634 2.91664C4.08301 2.91664 5.54134 2.21664 6.55634 1.32998C6.67992 1.22439 6.83713 1.16638 6.99967 1.16638C7.16222 1.16638 7.31943 1.22439 7.44301 1.32998C8.46384 2.22248 9.91634 2.91664 11.083 2.91664C11.2377 2.91664 11.3861 2.9781 11.4955 3.0875C11.6049 3.19689 11.6663 3.34527 11.6663 3.49998V7.58331Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="role-modal__select-label">
                            {ROLE_LABEL[selectedRole]}
                        </span>
                        <svg className={`role-modal__chevron${roleDropdownOpen ? ' role-modal__chevron--open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {roleDropdownOpen && (
                            <div className="role-modal__options">
                            {(['admin', 'super_admin'] as RoleType[]).map(role => (
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
                                    <span>
                                    {ROLE_LABEL[role]}
                                    </span>
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
                        <button className="role-modal__save" onClick={handleChangeRole}>
                        Сохранить
                        </button>
                    </div>
                    </div>
                </div>
            )
        }