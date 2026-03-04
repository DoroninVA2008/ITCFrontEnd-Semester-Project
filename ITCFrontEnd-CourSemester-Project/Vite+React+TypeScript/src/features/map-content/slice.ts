export interface MapState {
  activeEventId: number | null
  filteredEventTypes: number[]
}

export const initialState: MapState = {
  activeEventId: null,
  filteredEventTypes: [],
}