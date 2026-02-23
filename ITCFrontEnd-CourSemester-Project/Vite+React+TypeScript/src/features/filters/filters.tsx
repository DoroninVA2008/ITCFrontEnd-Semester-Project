import React, { useState, useEffect } from 'react'
import { DualRangeSlider } from './sliders'
import { FilterConfig, HistoricalPeriod, EventDates, fetchEvents, filterEventsByDateRange } from './typeven'
import './filter.scss'

export const FilterButtonList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<number | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: boolean}>({})
  const [periodRange, setPeriodRange] = useState({ min: 862, max: 2026 })
  const [events, setEvents] = useState<EventDates[]>([]) //@ts-ignore
  const [filteredEvents, setFilteredEvents] = useState<EventDates[]>([])
  
  const [minInputValue, setMinInputValue] = useState('862')
  const [maxInputValue, setMaxInputValue] = useState('2026')
  
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)

  const historicalPeriods: HistoricalPeriod[] = [
    { label: '862–988гг.', startYear: 862, endYear: 988 },
    { label: '988–1132гг.', startYear: 988, endYear: 1132 },
    { label: '1132–1237гг.', startYear: 1132, endYear: 1237 },
    { label: '1237–1480гг.', startYear: 1237, endYear: 1480 },
    { label: '1480–1547гг.', startYear: 1480, endYear: 1547 },
    { label: '1547–1584гг', startYear: 1547, endYear: 1584 },
    { label: '1584–1613гг.', startYear: 1584, endYear: 1613 },
    { label: '1613–1682гг.', startYear: 1613, endYear: 1682 },
    { label: '1682–1721гг.', startYear: 1682, endYear: 1721 },
    { label: '1721–1801гг.', startYear: 1721, endYear: 1801 },
    { label: '1801–1917гг.', startYear: 1801, endYear: 1917 },
    { label: '1917–1922гг.', startYear: 1917, endYear: 1922 },
    { label: '1922–1991гг.', startYear: 1922, endYear: 1991 },
    { label: '1991г. – Настоящее время', startYear: 1991, endYear: 2026 }
  ]

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    const fetchedEvents = await fetchEvents()
    setEvents(fetchedEvents)
  }

  useEffect(() => {
    if (events.length > 0) {
      const dateRange = {
        dateFrom: `${periodRange.min}-01-01`,
        dateTo: `${periodRange.max}-01-01`
      }
      const filtered = filterEventsByDateRange(events, dateRange)
      setFilteredEvents(filtered)
      console.log('Отфильтровано событий:', filtered.length)
    }
  }, [periodRange, events])

  useEffect(() => {
    setMinInputValue(formatYear(periodRange.min))
    setMaxInputValue(formatYear(periodRange.max))
  }, [periodRange])

  const isPeriodInRange = (period: HistoricalPeriod): boolean => {
    return (
      (period.startYear <= periodRange.max && period.endYear >= periodRange.min)
    )
  }

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
      options: historicalPeriods.map(p => p.label) // Используем периоды с годами
    }
  ]

  const handleFilterClick = (index: number) => {
    setActiveFilter(activeFilter === index ? null : index)
  }

  const handlePeriodChange = (min: number, max: number) => {
    setPeriodRange({ min, max })
    console.log(`Выбран период: от ${min} до ${max}`)
  }

  // Обработчик для выбора периода (одиночный выбор)
  const handlePeriodSelect = (periodLabel: string) => {
    if (selectedPeriod === periodLabel) {
      setSelectedPeriod(null) // снимаем выделение если кликнули на тот же
    } else {
      setSelectedPeriod(periodLabel) // выбираем новый период
    }
  }

  // Обработчики для текстовых инпутов
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinInputValue(e.target.value)
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxInputValue(e.target.value)
  }

  // Валидация при потере фокуса
  const handleMinInputBlur = () => {
    let value = minInputValue.replace(/[^\d]/g, '')
    let numValue = value ? parseInt(value) : 862
    
    numValue = Math.min(Math.max(numValue, 862), periodRange.max - 1)
    setPeriodRange(prev => ({ ...prev, min: numValue }))
  }

  const handleMaxInputBlur = () => {
    let value = maxInputValue.replace(/[^\d]/g, '')
    let numValue = value ? parseInt(value) : 2026
    
    numValue = Math.min(Math.max(numValue, periodRange.min + 1), 2026)
    setPeriodRange(prev => ({ ...prev, max: numValue }))
  }

  const formatYear = (year: number) => {
    if (year === 2026) return 'н.в.'
    return `${year}`
  }

  // Функция для обработки клика по периоду
  const handlePeriodClick = (period: HistoricalPeriod) => {
    setPeriodRange({ min: period.startYear, max: period.endYear })
    // Опционально: автоматически закрыть выпадающий список
    // setActiveFilter(null)
  }

  // Функция для сброса всех фильтров
  const handleResetFilters = () => {
    setSelectedOptions({})
    setSelectedPeriod(null)
    setPeriodRange({ min: 862, max: 2026 })
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
        
        <div className={`FilterDropdown ${isOpen ? 'clicked' : 'doublclicked'}`}>
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
                          value={minInputValue}
                          onChange={handleMinInputChange}
                          onBlur={handleMinInputBlur}
                        />
                        <input 
                          type="text"
                          data-index="2" 
                          placeholder="До н. в."
                          value={maxInputValue}
                          onChange={handleMaxInputChange}
                          onBlur={handleMaxInputBlur}
                        />
                      </div>
                      <DualRangeSlider 
                        min={862}
                        max={2026}
                        value={periodRange}
                        onChange={handlePeriodChange}
                      />
                    </>
                  )}
                  
                  {index === 2 
                    ? historicalPeriods.map((period, optIndex) => {
                        const isInRange = isPeriodInRange(period)
                        const isSelected = selectedPeriod === period.label // Используем отдельное состояние для периода
                        
                        return (
                          <div
                            key={optIndex}
                            className={`SubDropdownBtn ${isSelected ? 'selected' : ''} ${!isInRange ? 'out-of-range' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (isInRange) {
                                handlePeriodSelect(period.label) // Используем обработчик для одиночного выбора
                                handlePeriodClick(period)
                              }
                            }}
                            style={{
                              display: isInRange ? 'block' : 'none',
                              pointerEvents: isInRange ? 'auto' : 'none'
                            }}
                          >
                            <span>{period.label}</span>
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={() => {}} // Управляем через родительский div
                              onClick={(e) => e.stopPropagation()}
                              disabled={!isInRange}
                            />
                          </div>
                        )
                      })
                    : filter.options.map((option, optIndex) => (
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
                      ))
                  }
                </div>
              )}
            </div>
          ))}
          
          <div className="FilterActions">
            <button className="ApplyBtn">Применить</button>
            <button className="ResetBtn" onClick={handleResetFilters}>Сбросить</button>
          </div>
        </div>
      </div>
    </div>
  )
}