import React from 'react'
import { EventMarker } from './eventmarkers'
import { useEventFilterContext } from '../filter-function/evenFilterProvider' // @ts-ignore
import './marker.scss'

export const MarkerWithPopup: React.FC = () => {
  const { filteredEvents, isLoading, error } = useEventFilterContext()

  if (isLoading || error || filteredEvents.length === 0) return null

  return (
    <>
      {filteredEvents.map((event) => (
        <EventMarker key={event.id} event={event} />
      ))}
    </>
  )
}

