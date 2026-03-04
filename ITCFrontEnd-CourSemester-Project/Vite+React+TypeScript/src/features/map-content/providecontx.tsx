import React, { createContext, useReducer, ReactNode } from 'react'
import { MapState, initialState } from './slice.ts'
import { MapAction } from './selectors.ts'
import { mapReducer } from './reducer.ts'

const context = createContext<{
  state: MapState
  dispatch: React.Dispatch<MapAction>
} | undefined>(undefined)

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState) as [
  MapState,
  React.Dispatch<MapAction>
]
  return (
    <context.Provider value={{ state, dispatch }}>
      {children}
    </context.Provider>
  )
}

export const useMapContext = () => {
  const ctx = React.useContext(context)
  if (!ctx) throw new Error('useMapContext must be used within MapProvider')
  return ctx
}