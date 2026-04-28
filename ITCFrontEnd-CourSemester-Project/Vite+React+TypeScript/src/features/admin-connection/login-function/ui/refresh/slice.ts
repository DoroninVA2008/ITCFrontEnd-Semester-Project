import { createSlice } from '@reduxjs/toolkit';

interface AdminRefreshState {
  ready: boolean;
  unauthorized: boolean;
}

const initialState: AdminRefreshState = {
  ready: false,
  unauthorized: false,
};

const adminRefreshSlice = createSlice({
  name: 'adminRefresh',
  initialState,
  reducers: {
    refreshRequest: (state) => {
      state.unauthorized = false;
    },
    refreshSuccess: (state) => {
      state.ready = true;
      state.unauthorized = false;
    },
    refreshUnauthorized: (state) => {
      state.ready = false;
      state.unauthorized = true;
    },
    refreshReset: (state) => {
      state.ready = false;
      state.unauthorized = false;
    },
  },
});

export const { refreshRequest, refreshSuccess, refreshUnauthorized, refreshReset } =
  adminRefreshSlice.actions;
export const adminRefreshReducer = adminRefreshSlice.reducer;
