import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rootappsite: [],
  header: [],
  main: [],
  mapp: [],
  layer: [],
  event: [],
  filter: [],
  form: [],
  card: []
};

const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.event = action.payload;
    },
    // другие редьюсеры
  }
});

export const { setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;