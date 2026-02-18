import React, { useRef, useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
// @ts-ignore
import icon from '../../assets/VectorMarkerSword.png'
// @ts-ignore
import iconShadow from '../../../public/marker-shadow.png'
import { eventsDataService, EventObject } from './evenPositions'

const popupTimeOut = 200;

// Создаем иконки
const battleIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [32, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, 4],
});

const tragedyIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [32, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, 4],
});

const getIconByEventType = (eventType: number) => {
    return eventType === 1 ? battleIcon : tragedyIcon;
};

// Компонент отдельного маркера
const EventMarker: React.FC<{ event: EventObject }> = ({ event }) => {
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    
    // Получаем позицию из сервиса
    const position = eventsDataService.getEventPosition(event.id);
    
    if (!position) {
        console.warn(`Нет позиции для события: ${event.title} (ID: ${event.id})`);
        return null;
    }

    const eventHandlers = {
        mouseover: () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
            }
            if (markerRef.current) {
                markerRef.current.openPopup();
            }
        },
        
        mouseout: () => {
            closeTimeoutRef.current = setTimeout(() => {
                if (markerRef.current) {
                    markerRef.current.closePopup();
                }
            }, popupTimeOut);
        },
        
        click: () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
            }
            if (markerRef.current) {
                markerRef.current.closePopup();
            }
        }
    };

    // Форматируем дату
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <Marker
            position={position}
            icon={getIconByEventType(event.eventType)}
            ref={markerRef}
            eventHandlers={eventHandlers}
        >
            <Popup>
                <div
                    onMouseEnter={() => {
                        if (closeTimeoutRef.current) {
                            clearTimeout(closeTimeoutRef.current);
                            closeTimeoutRef.current = null;
                        }
                    }}
                    onClick={() => {
                        if (markerRef.current) {
                            markerRef.current.closePopup();
                        }
                    }}
                    style={{ 
                        minWidth: '250px',
                        maxWidth: '300px',
                        padding: '10px'
                    }}
                >
                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                        {event.title}
                    </h3>
                    
                    <p style={{ margin: '0 0 10px 0', fontSize: '14px', lineHeight: '1.5' }}>
                        {event.description}
                    </p>
                    
                    <small style={{ color: '#666', display: 'block', marginBottom: '10px' }}>
                        📅 {formatDate(event.eventDate)}
                    </small>
                    
                    {event.previewUrlImage && (
                        <img
                            src={event.previewUrlImage}
                            alt={event.title}
                            style={{ 
                                maxWidth: '100%',
                                maxHeight: '150px',
                                borderRadius: '4px',
                                marginTop: '10px',
                                objectFit: 'cover'
                            }}
                            onError={(e) => {
                                // Скрываем изображение если оно не загрузилось
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    )}
                </div>
            </Popup>
        </Marker>
    );
};

// markers.tsx (обнови компонент MarkerWithPopup)
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

    if (loading) {
        return (
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '30px',
                zIndex: 1000,
                fontSize: '14px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
                ⏳ Загрузка событий...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(255,0,0,0.8)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '30px',
                zIndex: 1000,
                fontSize: '14px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
                ❌ {error}
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(255,165,0,0.8)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '30px',
                zIndex: 1000,
                fontSize: '14px'
            }}>
                ⚠️ Нет событий для отображения
            </div>
        );
    }

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