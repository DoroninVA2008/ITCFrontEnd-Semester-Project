import React, { useRef } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet' // @ts-ignore
import MarkerPolitTarget from '../../assets/MarkerPolitTarget.png' // @ts-ignore
import MarkerSwordTarget from '../../assets/MarkerSwordTarget.png' // @ts-ignore
import iconShadow from '../../../public/marker-shadow.png'
import { EventObject } from './evenPositions'

const popupTimeOut = 100;

const battleIcon = L.icon({
    iconUrl: MarkerPolitTarget,
    shadowUrl: iconShadow,
    iconSize: [32, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, 4],
});

const tragedyIcon = L.icon({
    iconUrl: MarkerSwordTarget,
    shadowUrl: iconShadow,
    iconSize: [32, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, 4],
});

const getIconByEventType = (eventType: number) => {
    return eventType === 1 ? battleIcon : tragedyIcon;
};

export const EventMarker: React.FC<{ event: EventObject }> = ({ event }) => {
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    
    const lat = parseFloat(event.latitude);
    const lng = parseFloat(event.longitude);
    const position = !isNaN(lat) && !isNaN(lng) ? [lat, lng] as [number, number] : null;
    
    if (!position) {
        console.warn(`РќРµС‚ РїРѕР·РёС†РёРё РґР»СЏ СЃРѕР±С‹С‚РёСЏ: ${event.title} (ID: ${event.id})`);
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
    };

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
                >
                    <h3 style={{ margin: '0 0 6px 0', color: '#FFFFFF' }}>
                        {event.title}
                    </h3>
                    {/* <p style={{ margin: '0 0 10px 0', fontSize: '14px', lineHeight: '1.4' }}>
                        {event.description}
                    </p> */}
                    <small style={{ color: '#FFFFFF', display: 'block', fontSize: '14px', marginTop: '0.2em' }}>
                        🗓️ {formatDate(event.eventDate)}
                    </small>
                </div>
            </Popup>
        </Marker>
    );
};