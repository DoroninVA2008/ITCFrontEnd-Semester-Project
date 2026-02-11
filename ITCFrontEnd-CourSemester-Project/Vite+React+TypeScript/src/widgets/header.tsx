import React from 'react'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
  return(
    <header>
      <Link to="/app">
        <img src="/RussianHeroesLogo.png" alt="Логотип Россия - страна Героев"></img>
      </Link>
      <h1>
        Россия - страна Героев
      </h1>
      <button>
        Предложить событие
      </button>
    </header>
  )
}