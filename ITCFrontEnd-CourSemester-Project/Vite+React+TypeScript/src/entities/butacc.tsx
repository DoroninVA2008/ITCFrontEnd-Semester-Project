import React, { useState, useRef, useEffect } from 'react'
import { useAdminLogout } from '../features/admin-connection/logout'

export const ButoAcc: React.FC = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { handleLogout } = useAdminLogout()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const username = localStorage.getItem('username') || 'admin'

  return (
    <div className="butacc-wrap" ref={ref}>
      <button className="butacc" onClick={() => setOpen(prev => !prev)}>
        AT
      </button>
      {open && (
        <div className="butacc-dropdown">
          <span className="butacc-dropdown__name">{username}</span>
          <button className="butacc-dropdown__logout" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      )}
    </div>
  )
}
