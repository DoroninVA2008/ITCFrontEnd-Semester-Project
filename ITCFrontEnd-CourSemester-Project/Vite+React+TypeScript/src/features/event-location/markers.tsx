import React, { useState } from 'react'
import { EventMarker } from './eventmarkers'
import { useEventFilterContext } from '../filter-function/evenFilterProvider' // @ts-ignore
import './marker.scss'

export const MarkerWithPopup: React.FC = () => {
  const { filteredEvents, isLoading, error } = useEventFilterContext()
  const [activeMarkerKey, setActiveMarkerKey] = useState<string | null>(null)

  if (isLoading || error || filteredEvents.length === 0) return null

  return (
    <>
      {filteredEvents.map((event, index) => {
        const markerKey = `${event.id}-${event.latitude}-${event.longitude}-${index}`

        return (
          <EventMarker
            key={markerKey}
            event={event}
            markerKey={markerKey}
            isActive={activeMarkerKey === markerKey}
            onOpen={(openedMarkerKey) => setActiveMarkerKey(openedMarkerKey)}
            onClose={(closedMarkerKey) => {
              if (activeMarkerKey === closedMarkerKey) {
                setActiveMarkerKey(null);
              }
            }}
          />
        )
      })}
    </>
  )
}
