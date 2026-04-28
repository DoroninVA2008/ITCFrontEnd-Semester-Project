import { createSlice } from '@reduxjs/toolkit';

interface AdminLogoutState {
  loading: boolean;
  completed: boolean;
}

const initialState: AdminLogoutState = {
  loading: false,
  completed: false,
};

const adminLogoutSlice = createSlice({
  name: 'adminLogout',
  initialState,
  reducers: {
    logoutRequest: (state) => {
      state.loading = true;
      state.completed = false;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.completed = true;
    },
    logoutReset: (state) => {
      state.completed = false;
    },
  },
});

export const { logoutRequest, logoutSuccess, logoutReset } = adminLogoutSlice.actions;
export const adminLogoutReducer = adminLogoutSlice.reducer;
