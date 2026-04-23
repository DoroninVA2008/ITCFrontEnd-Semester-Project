import { createSlice } from '@reduxjs/toolkit'
// import { adminLoginReducer } from '../../features/admin-connection/login-function/ui/slice'

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
  // adminLogin: adminLoginReducer,
    // другие редьюсеры
  }
});

export const { setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;