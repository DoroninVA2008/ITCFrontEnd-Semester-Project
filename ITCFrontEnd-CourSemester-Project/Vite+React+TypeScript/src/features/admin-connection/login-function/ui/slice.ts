import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminLoginState {
  login: string;
  password: string;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  role: string | null;
  username: string | null;
}

const initialState: AdminLoginState = {
  login: '',
  password: '',
  loading: false,
  error: null,
  isAuthenticated: false,
  role: null,
  username: localStorage.getItem('username'),
};

const adminLoginSlice = createSlice({
  name: 'adminLogin',
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
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.username = null;
      state.login = '';
      state.password = '';
      localStorage.removeItem('username');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLogin,
  setPassword,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} = adminLoginSlice.actions;

export const adminLoginReducer = adminLoginSlice.reducer;

