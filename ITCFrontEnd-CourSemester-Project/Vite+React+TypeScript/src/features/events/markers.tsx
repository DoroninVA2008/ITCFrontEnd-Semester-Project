import React, { useEffect, useState } from 'react' // @ts-ignore
import MarkerPolitTarget from '../../assets/MarkerPolitTarget.png' // @ts-ignore
import MarkerSwordTarget from '../../assets/MarkerSwordTarget.png' // @ts-ignore
import iconShadow from '../../../public/marker-shadow.png'
import { eventsDataService, EventObject } from './evenPositions'
import { EventMarker } from './eventmarkers'
import './marker.scss'

export const MarkerWithPopup: React.FC = () => {
    const [events, setEvents] = useState<EventObject[]>([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState<string | null>(null);

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

    return (
        <>
            {events.map((event) => (
                <EventMarker 
                    key={event.id} 
                    event={event} 
                />
            ))}
        </>
    );
};
