import { useState, useEffect, useCallback, useMemo } from 'react'
import { EventObject } from '../events/evenPositions'

export interface FilterState {
  selectedOptions: {[key: string]: boolean};
  periodRange: { min: number; max: number };
  selectedPeriod: string | null;
}

interface UseEventFiltersProps {
  events: EventObject[];
  onFilteredEventsChange?: (filteredEvents: EventObject[]) => void;
}

export const useEventFilters = ({ events, onFilteredEventsChange }: UseEventFiltersProps) => {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedOptions: {},
    periodRange: { min: 862, max: 2026 },
    selectedPeriod: null
  });

  const getEventTypeFromOption = (option: string): number[] => {
    switch(option) {
      case 'Битвы':
      case 'Войны':
        return [1]; // EventType.Battle
      case 'Революции':
      case 'Восстания':
      case 'Перевороты':
        return [2]; // EventType.Tragedy
      default:
        return [];
    }
  };
  
  const selectedEventTypes = useMemo(() => {
    const types = new Set<number>();
    Object.entries(filterState.selectedOptions).forEach(([option, isSelected]) => {
      if (isSelected) {
        getEventTypeFromOption(option).forEach(type => types.add(type));
      }
    });
    return Array.from(types);
  }, [filterState.selectedOptions]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const eventYear = new Date(event.eventDate).getFullYear();
      const dateMatch = eventYear >= filterState.periodRange.min && 
                       eventYear <= filterState.periodRange.max;
      
      const typeMatch = selectedEventTypes.length === 0 || 
                       selectedEventTypes.includes(event.eventType);
      
      let periodMatch = true;
      if (filterState.selectedPeriod) {
        const matches = filterState.selectedPeriod.match(/(\d+)вЂ“(\d+)/);
        if (matches) {
          const startYear = parseInt(matches[1]);
          const endYear = parseInt(matches[2]);
          periodMatch = eventYear >= startYear && eventYear <= endYear;
        }
      }
      
      return dateMatch && typeMatch && periodMatch;
    });
  }, [events, filterState, selectedEventTypes]);

  useEffect(() => {
    onFilteredEventsChange?.(filteredEvents);
  }, [filteredEvents, onFilteredEventsChange]);

  const toggleOption = useCallback((option: string) => {
    setFilterState(prev => ({
      ...prev,
      selectedOptions: {
        ...prev.selectedOptions,
        [option]: !prev.selectedOptions[option]
      }
    }));
  }, []);

  const setPeriodRange = useCallback((min: number, max: number) => {
    setFilterState(prev => ({
      ...prev,
      periodRange: { min, max }
    }));
  }, []);

  const setSelectedPeriod = useCallback((periodLabel: string | null) => {
    setFilterState(prev => ({
      ...prev,
      selectedPeriod: periodLabel
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterState({
      selectedOptions: {},
      periodRange: { min: 862, max: 2026 },
      selectedPeriod: null
    });
  }, []);

  const setFilterStateDirect = useCallback((nextState: FilterState) => {
    setFilterState(nextState);
  }, []);

  return {
    filterState,
    filteredEvents,
    toggleOption,
    setPeriodRange,
    setSelectedPeriod,
    resetFilters,
    setFilterState: setFilterStateDirect
  };
};
