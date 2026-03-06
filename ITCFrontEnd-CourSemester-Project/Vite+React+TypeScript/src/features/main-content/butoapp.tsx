import React from 'react'
import { Link } from 'react-router-dom'

export const Butoapp: React.FC = () => {
  return(
    <Link to="/app">
      <img src="/RussianHeroesLogo.png" alt="Логотип Россия - страна Героев" />
    </Link>
  )
}