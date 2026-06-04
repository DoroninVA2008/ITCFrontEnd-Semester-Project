import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventObject } from './ui/reurlcard'

interface EventsState {
  events: EventObject[];
  isLoading: boolean;
  error: string | null;
  cardData: EventObject | null;
}

const initialState: EventsState = {
  events: [],
  isLoading: false,
  error: null,
  cardData: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchAllEvents: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchAllEventsSuccess: (state, action: PayloadAction<EventObject[]>) => {
      state.events = action.payload;
      state.isLoading = false;
    },
    fetchAllEventsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCardData: (state, action: PayloadAction<EventObject | null>) => {
      state.cardData = action.payload;
    },
    clearCardData: (state) => {
      state.cardData = null;
    },
  },
});

export const {
  fetchAllEvents,
  fetchAllEventsSuccess,
  fetchAllEventsFailure,
  setCardData,
  clearCardData,
} = eventsSlice.actions;

export default eventsSlice.reducer;