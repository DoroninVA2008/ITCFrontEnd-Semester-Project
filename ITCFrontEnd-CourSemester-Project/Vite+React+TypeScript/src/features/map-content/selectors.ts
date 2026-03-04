export type MapAction =
  | { type: 'SET_ACTIVE_EVENT'; payload: number | null }
  | { type: 'TOGGLE_FILTER'; payload: number }