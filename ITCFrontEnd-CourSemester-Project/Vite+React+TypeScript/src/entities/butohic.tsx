import React from 'react'
import { Link } from 'react-router-dom'

export const ButoHic: React.FC = () => {
  return (
    <Link to="/his">
      <button>
        История изменений
      </button>
    </Link>
  )
}