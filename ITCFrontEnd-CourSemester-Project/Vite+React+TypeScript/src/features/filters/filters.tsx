import React, { useState, useEffect } from 'react'
import { FilterDropdown } from './dropdown'
import { EventDates, fetchEvents, filterEventsByDateRange } from './typeven'//@ts-ignore
import './filter.scss'

export const FilterButtonList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [periodRange] = useState({ min: 862, max: 2026 })
  const [events, setEvents] = useState<EventDates[]>([]) //@ts-ignore
  const [filteredEvents, setFilteredEvents] = useState<EventDates[]>([])
  
  const [, setMinInputValue] = useState('862')
  const [, setMaxInputValue] = useState('2026')

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

  const formatYear = (year: number) => {
    if (year === 2026) return 'н.в.'
    return `${year}`
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
        <FilterDropdown 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
        />
      </div>
    </div>
  )
}