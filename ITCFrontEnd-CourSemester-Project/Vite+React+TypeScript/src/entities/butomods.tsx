import React from 'react'
import { Link } from 'react-router-dom'

export const ButoMods: React.FC = () => {
  return (
    <Link to="/mod">
      <button>
        Модераторы
      </button>
    </Link>
  )
}