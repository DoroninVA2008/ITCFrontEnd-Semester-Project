import React, { useState } from 'react'// @ts-ignore
import './filters.scss'

export const FilterButtonList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const filters = [
    'Военные события',
    'Политические события',
    'Период'
  ]

  return (
    <div className="FilterContainer">
      <div className={`FilterList ${isOpen ? 'clicked' : ''}`}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={isOpen ? 'clicked' : ''}
        >
          Фильтры
        </button>
        <div className={`FilterDropdown ${isOpen ? 'clicked' : ''}`}>
            {filters.map((filter, index) => (
              <div key={index} className="FilterItem">
                <label>
                  {filter} <summary>^</summary>
                </label>
              </div>
            ))}
            <div className="FilterActions">
              <button className="ApplyBtn">Применить</button>
              <button className="ResetBtn">Сбросить</button>
            </div>
          </div>
        </div>
      </div>
  )
}