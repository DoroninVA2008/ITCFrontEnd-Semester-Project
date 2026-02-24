import React, { useState, useEffect } from 'react'
import { ActiveFilterDropdown } from './activedropdown'
import { FilterConfig, HistoricalPeriod, EventDates, fetchEvents, filterEventsByDateRange } from './typeven'
import './filter.scss'

interface FilterDropdownProps {
  isOpen: boolean
  onClose?: () => void
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ isOpen }) => {
  const [activeFilter, setActiveFilter] = useState<number | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: boolean}>({})
  const [periodRange, setPeriodRange] = useState({ min: 862, max: 2026 })
  const [events, setEvents] = useState<EventDates[]>([])
  const [, setFilteredEvents] = useState<EventDates[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)

  const historicalPeriods: HistoricalPeriod[] = [
    { label: '862–988гг.', startYear: 862, endYear: 988 },
    { label: '988–1132гг.', startYear: 988, endYear: 1132 },
    { label: '1132–1237гг.', startYear: 1132, endYear: 1237 },
    { label: '1237–1480гг.', startYear: 1237, endYear: 1480 },
    { label: '1480–1547гг.', startYear: 1480, endYear: 1547 },
    { label: '1547–1584гг.', startYear: 1547, endYear: 1584 },
    { label: '1584–1613гг.', startYear: 1584, endYear: 1613 },
    { label: '1613–1682гг.', startYear: 1613, endYear: 1682 },
    { label: '1682–1721гг.', startYear: 1682, endYear: 1721 },
    { label: '1721–1801гг.', startYear: 1721, endYear: 1801 },
    { label: '1801–1917гг.', startYear: 1801, endYear: 1917 },
    { label: '1917–1922гг.', startYear: 1917, endYear: 1922 },
    { label: '1922–1991гг.', startYear: 1922, endYear: 1991 },
    { label: '1991г. – Настоящее время', startYear: 1991, endYear: 2026 }
  ]

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
      options: historicalPeriods.map(p => p.label)
    }
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

  const handleFilterClick = (index: number) => {
    setActiveFilter(activeFilter === index ? null : index)
  }

  const handlePeriodChange = (min: number, max: number) => {
    setPeriodRange({ min, max })
    console.log(`Выбран период: от ${min} до ${max}`)
  }

  const handlePeriodSelect = (periodLabel: string) => {
    setSelectedPeriod(selectedPeriod === periodLabel ? null : periodLabel)
  }

  const handlePeriodClick = (period: HistoricalPeriod) => {
    setPeriodRange({ min: period.startYear, max: period.endYear })
  }

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const handleResetFilters = () => {
    setSelectedOptions({})
    setSelectedPeriod(null)
    setPeriodRange({ min: 862, max: 2026 })
  }

  if (!isOpen) return null

  return (
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
            <ActiveFilterDropdown
              filterIndex={index}
              filter={filter}
              periodRange={periodRange}
              selectedPeriod={selectedPeriod}
              selectedOptions={selectedOptions}
              historicalPeriods={historicalPeriods}
              onPeriodChange={handlePeriodChange}
              onPeriodSelect={handlePeriodSelect}
              onPeriodClick={handlePeriodClick}
              onOptionToggle={handleOptionToggle}
            />
          )}
        </div>
      ))}
      
      <div className="FilterActions">
        <button className="ApplyBtn">Применить</button>
        <button className="ResetBtn" onClick={handleResetFilters}>Сбросить</button>
      </div>
    </div>
  )
}