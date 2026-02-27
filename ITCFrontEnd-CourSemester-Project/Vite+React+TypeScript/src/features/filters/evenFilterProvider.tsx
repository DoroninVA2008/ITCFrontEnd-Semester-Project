import React, { createContext, useContext, ReactNode } from 'react';
import { EventObject } from '../events/evenPositions';
import { useEventFilters, FilterState } from './evenFilters';

interface EventFilterContextType {
  filteredEvents: EventObject[];
  filterState: FilterState;
  toggleOption: (option: string) => void;
  setPeriodRange: (min: number, max: number) => void;
  setSelectedPeriod: (periodLabel: string | null) => void;
  resetFilters: () => void;
}

const EventFilterContext = createContext<EventFilterContextType | undefined>(undefined);

export const useEventFilterContext = () => {
  const context = useContext(EventFilterContext);
  if (!context) {
    throw new Error('useEventFilterContext must be used within EventFilterProvider');
  }
  return context;
};

interface EventFilterProviderProps {
  children: ReactNode;
  events: EventObject[];
}

export const EventFilterProvider: React.FC<EventFilterProviderProps> = ({ children, events }) => {
  const {
    filteredEvents,
    filterState,
    toggleOption,
    setPeriodRange,
    setSelectedPeriod,
    resetFilters
  } = useEventFilters({ events });

  return (
    <EventFilterContext.Provider
      value={{
        filteredEvents,
        filterState,
        toggleOption,
        setPeriodRange,
        setSelectedPeriod,
        resetFilters
      }}
    >
      {children}
    </EventFilterContext.Provider>
  );
};