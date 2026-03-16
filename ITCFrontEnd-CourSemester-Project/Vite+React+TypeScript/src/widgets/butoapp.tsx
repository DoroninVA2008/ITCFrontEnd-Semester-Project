import React from 'react'
import { Link } from 'react-router-dom'
// /src/assets/RussianHeroesLogo.png
export const Butoapp: React.FC = () => {
  return(
    <Link to="/app">
      <img src="src/assets/RussianHeroesLogo.png" alt="Логотип Россия - страна Героев" />
    </Link>
  )
}