import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ButoAcc: React.FC = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const username = localStorage.getItem('username') || 'Admin'

  const handleLogout = () => {
    localStorage.removeItem('username')
    navigate('/log')
  }

  return (
    <div className="butacc-wrap" ref={ref}>
      <button className="butacc" onClick={() => setOpen(prev => !prev)}>
        AC
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
