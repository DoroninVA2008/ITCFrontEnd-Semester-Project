import React, { useState } from 'react'
import { DualRangeSlider } from './sliders'
import './filters.scss'

type FilterOption = string;

interface FilterConfig {
  name: string;
  options: FilterOption[];
}

export const FilterButtonList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<number | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: boolean}>({})
  const [periodRange, setPeriodRange] = useState({ min: 862, max: 2026 }) // Состояние для периода

  const filters: FilterConfig[] = [
    { 
      name: 'Военные события',
      options: ['Битвы', 'Войны']
    },
    { 
      name: 'Политические события',
      options: ['Революции', 'Восстания', 'Реформы', 'Перевороты']
    },
    { 
      name: 'Период',
      options: [
        '862–988гг.',
        '988–1132гг.',
        '1132–1237гг.',
        '1237–1480гг.',
        '1480–1547гг.',
        '1547–1584гг',
        '1584–1613гг.',
        '1613–1682гг.',
        '1682–1721гг.',
        '1721–1801гг.',
        '1801–1917гг.',
        '1917–1922гг.',
        '1922–1991гг.',
        '1991г. – Настоящее время'
      ]
    }
  ]

  const handleFilterClick = (index: number) => {
    setActiveFilter(activeFilter === index ? null : index)
  }

  const handlePeriodChange = (min: number, max: number) => {
    setPeriodRange({ min, max })
    console.log(`Выбран период: от ${min} до ${max}`)
  }

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
            <div key={index} className="FilterItemWrapper">
              <div 
                className={`FilterItem ${activeFilter === index ? 'active' : ''}`} 
                onClick={() => handleFilterClick(index)}
              >
                <label className="DropdownLabel">
                  {filter.name} 
                  <summary className={activeFilter === index ? 'rotated' : ''}>^</summary> 
                </label>
              </div>
              
              {activeFilter === index && (
                <div className="FilterSubDropdown">
                  {index === 2 && (
                    <>
                      <div className="Inputs">
                        <input 
                          type="text" 
                          data-index="1" 
                          placeholder="От 862 гг."
                        />
                        <input 
                          type="text" 
                          data-index="2" 
                          placeholder="До н. в."
                        />
                      </div>
                      
                      {/* Добавляем компонент с двумя ползунками */}
                      <DualRangeSlider 
                        min={862}
                        max={2025}
                        onChange={handlePeriodChange}
                      />
                    </>
                  )}
                  
                  {filter.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`SubDropdownBtn ${selectedOptions[option] ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedOptions(prev => ({
                          ...prev,
                          [option]: !prev[option]
                        }))
                      }}
                    >
                      <span>{option}</span>
                      <input 
                        type="checkbox" 
                        checked={selectedOptions[option] || false}
                        onChange={(e) => {
                          e.stopPropagation()
                          setSelectedOptions(prev => ({
                            ...prev,
                            [option]: e.target.checked
                          }))
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  ))}
                </div>
              )}
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