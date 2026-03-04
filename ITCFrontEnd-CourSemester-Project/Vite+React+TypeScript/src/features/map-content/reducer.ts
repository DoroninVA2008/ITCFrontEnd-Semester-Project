import { MapState } from './slice.ts'
import { MapAction } from './selectors.ts'

export function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case 'SET_ACTIVE_EVENT':
      return { ...state, activeEventId: action.payload }
    case 'TOGGLE_FILTER':
      const index = state.filteredEventTypes.indexOf(action.payload)
      if (index >= 0) {
        return {
          ...state,
          filteredEventTypes: state.filteredEventTypes.filter(t => t !== action.payload),
        }
      } else {
        return {
          ...state,
          filteredEventTypes: [...state.filteredEventTypes, action.payload],
        }
      }
    default:
      return state
  }
}