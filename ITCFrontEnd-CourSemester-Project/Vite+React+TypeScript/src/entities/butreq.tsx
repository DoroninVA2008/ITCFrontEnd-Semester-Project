import React from 'react'
import { Link } from 'react-router-dom'

export const ButReq: React.FC = () => {
  return (
    <Link to="/adm">
      <button>
        Заявки
      </button>
    </Link>
  )
}