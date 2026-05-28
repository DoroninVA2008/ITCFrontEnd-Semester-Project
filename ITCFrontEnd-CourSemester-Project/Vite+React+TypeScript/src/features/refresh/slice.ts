import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../login/types'

export const name = 'refresh'

const initialState: AuthState = {
  login: '',
  password: '',
  loading: false,
  error: null,
  isAuthenticated: false,
  role: null,
  username: localStorage.getItem('username'),
  logoutLoading: false,
  logoutCompleted: false,
  refreshReady: false,
  refreshUnauthorized: false,
  navigateToLogin: false,
  navigateTo: null,
  auth: null
};

export const { reducer, actions } = createSlice({
  name,
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ role: string | null; username: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.error = null;
      state.navigateToLogin = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.navigateToLogin = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.username = null;
      state.login = '';
      state.password = '';
      state.refreshReady = false;
      localStorage.removeItem('username');
    },
    clearError: (state) => {
      state.error = null;
    },
    logoutRequest: (state) => {
      state.logoutLoading = true;
      state.logoutCompleted = false;
    },
    logoutSuccess: (state) => {
      state.logoutLoading = false;
      state.logoutCompleted = true;
    },
    logoutReset: (state) => {
      state.logoutCompleted = false;
    },
    startRefreshTimer: () => {},
    stopRefreshTimer: () => {},
    refreshRequest: (state) => {
      state.refreshUnauthorized = false;
    },
    refreshSuccess: (state) => {
      state.refreshReady = true;
      state.refreshUnauthorized = false;
      state.navigateToLogin = false;
    },
    refreshUnauthorized: (state) => {
      state.refreshReady = false;
      state.refreshUnauthorized = true;
      state.isAuthenticated = false;
      state.navigateToLogin = true;
    },
    refreshReset: (state) => {
      state.refreshReady = false;
      state.refreshUnauthorized = false;
      state.navigateToLogin = false;
    },
    clearNavigateToLogin: (state) => {
      state.navigateToLogin = false;
    },
    setNavigateToLogin: (state) => {
      state.navigateToLogin = true;
    },
  },
});