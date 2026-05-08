import React, { useState, useRef, useEffect } from 'react'
import { useAdminLogout } from '../features/logout/logout'

export const ButoAcc: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isOpenRef = useRef(false)
  const { handleLogout } = useAdminLogout()

  const closeDropdown = () => {
    if (!isOpenRef.current) return
    isOpenRef.current = false
    setClosing(true)
    setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 300)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    if (isOpenRef.current) {
      closeDropdown()
    } else {
      isOpenRef.current = true
      setOpen(true)
    }
  }

  const username = localStorage.getItem('username') || 'admin'
  const parts = username.split('_')
  const secondInitial = parts[1]?.[0]?.toUpperCase() ?? 'T'

  return (
    <div className="butacc-wrap" ref={ref}>
      <button className="butacc" onClick={handleToggle}>
        A{secondInitial}
      </button>
      {(open || closing) && (
        <div className={`butacc-dropdown${closing ? ' butacc-dropdown--closing' : ''}`}>
          <span className="butacc-dropdown__name">{username}</span>
          <button className="butacc-dropdown__logout" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      )}
    </div>
  )
}
