import { useState, useEffect, useCallback, useMemo } from 'react';
import { EventObject } from '../events/evenPositions';
// РўРёРїС‹ СЃРѕР±С‹С‚РёР№ РґР»СЏ С„РёР»СЊС‚СЂР°С†РёРё
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

  // РњР°РїРїРёРЅРі РѕРїС†РёР№ Рє С‚РёРїР°Рј СЃРѕР±С‹С‚РёР№
  const getEventTypeFromOption = (option: string): number[] => {
    switch(option) {
      case 'Битвы':
      case 'Войны':
        return [1]; // EventType.Battle
      case 'Революции':
      case 'Восстания':
      case 'Реформы':
      case 'Перевороты':
        return [2]; // EventType.Tragedy
      default:
        return [];
    }
  };

  // РџРѕР»СѓС‡Р°РµРј РІСЃРµ РІС‹Р±СЂР°РЅРЅС‹Рµ С‚РёРїС‹ СЃРѕР±С‹С‚РёР№
  const selectedEventTypes = useMemo(() => {
    const types = new Set<number>();
    Object.entries(filterState.selectedOptions).forEach(([option, isSelected]) => {
      if (isSelected) {
        getEventTypeFromOption(option).forEach(type => types.add(type));
      }
    });
    return Array.from(types);
  }, [filterState.selectedOptions]);

  // Р¤РёР»СЊС‚СЂР°С†РёСЏ СЃРѕР±С‹С‚РёР№
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Р¤РёР»СЊС‚СЂ РїРѕ РґР°С‚Рµ
      const eventYear = new Date(event.eventDate).getFullYear();
      const dateMatch = eventYear >= filterState.periodRange.min && 
                       eventYear <= filterState.periodRange.max;
      
      // Р¤РёР»СЊС‚СЂ РїРѕ С‚РёРїСѓ СЃРѕР±С‹С‚РёСЏ (РІРѕРµРЅРЅС‹Рµ/РїРѕР»РёС‚РёС‡РµСЃРєРёРµ)
      const typeMatch = selectedEventTypes.length === 0 || 
                       selectedEventTypes.includes(event.eventType);
      
      // Р¤РёР»СЊС‚СЂ РїРѕ РёСЃС‚РѕСЂРёС‡РµСЃРєРѕРјСѓ РїРµСЂРёРѕРґСѓ
      let periodMatch = true;
      if (filterState.selectedPeriod) {
        // РџР°СЂСЃРёРј РіРѕРґС‹ РёР· РјРµС‚РєРё РїРµСЂРёРѕРґР° (РЅР°РїСЂРёРјРµСЂ, "862вЂ“988РіРі.")
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

  // РЈРІРµРґРѕРјР»СЏРµРј РѕР± РёР·РјРµРЅРµРЅРёРё РѕС‚С„РёР»СЊС‚СЂРѕРІР°РЅРЅС‹С… СЃРѕР±С‹С‚РёР№
  useEffect(() => {
    onFilteredEventsChange?.(filteredEvents);
  }, [filteredEvents, onFilteredEventsChange]);

  // РњРµС‚РѕРґС‹ РґР»СЏ РѕР±РЅРѕРІР»РµРЅРёСЏ С„РёР»СЊС‚СЂРѕРІ
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
