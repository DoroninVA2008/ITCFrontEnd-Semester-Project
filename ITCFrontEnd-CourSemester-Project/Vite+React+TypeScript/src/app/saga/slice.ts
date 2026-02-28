import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rootappsite: [],
  header: [],
  main: [],
  mapp: [],
  layers: [],
  events: [],
  filters: [],
  form: []
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    // другие редьюсеры
  }
});

export const { setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;