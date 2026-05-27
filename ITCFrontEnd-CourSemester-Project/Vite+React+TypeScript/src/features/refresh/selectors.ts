import { RootState } from '../../app/store'

export const selectLogin = (state: RootState) => state.auth.login;
export const selectPassword = (state: RootState) => state.auth.password;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectRole = (state: RootState) => state.auth.role;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectAdminLoginState = (state: RootState) => state.auth;
export const selectLogoutLoading = (state: RootState) => state.auth.logoutLoading;
export const selectLogoutCompleted = (state: RootState) => state.auth.logoutCompleted;
export const selectRefreshReady = (state: RootState) => state.auth.refreshReady;
export const selectRefreshUnauthorized = (state: RootState) => state.auth.refreshUnauthorized;
export const selectNavigateToLogin = (state: RootState) => state.auth.navigateToLogin; // navigateTo