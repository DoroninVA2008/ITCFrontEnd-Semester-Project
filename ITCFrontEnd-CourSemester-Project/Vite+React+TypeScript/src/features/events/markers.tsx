import React, { useEffect, useState } from 'react'
import { eventsDataService, EventObject } from './evenPositions'
import { EventMarker } from './eventmarkers'
import { EventFilterProvider, useEventFilterContext } from '../filters/evenFilterProvider'//@ts-ignore
import './marker.scss'

const FilteredMarkers: React.FC = () => {
  const { filteredEvents } = useEventFilterContext();
  
  return (
    <>
      {filteredEvents.map((event) => (
        <EventMarker key={event.id} event={event} />
      ))}
    </>
  );
};

export const MarkerWithPopup: React.FC = () => {
  const [events, setEvents] = useState<EventObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        await eventsDataService.loadData();
        const loadedEvents = eventsDataService.events;
        
        if (loadedEvents.length > 0) {
          setEvents(loadedEvents);
          console.log('✅ События загружены:', loadedEvents.length);
        } else {
          setError('Нет доступных событий');
        }
      } catch (err) {
        console.error('❌ Ошибка загрузки событий:', err);
        setError('Не удалось загрузить события с сервера');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return null; // или компонент загрузки
  if (error) return null; // или компонент ошибки
  if (events.length === 0) return null;

  return (
    <EventFilterProvider events={events}>
      <FilteredMarkers />
    </EventFilterProvider>
  );
};