import { RootState } from '../../app/store'

export const selectLogin = (state: RootState) => state.adminLogin.login;
export const selectPassword = (state: RootState) => state.adminLogin.password;
export const selectLoading = (state: RootState) => state.adminLogin.loading;
export const selectError = (state: RootState) => state.adminLogin.error;
export const selectIsAuthenticated = (state: RootState) => state.adminLogin.isAuthenticated;
export const selectRole = (state: RootState) => state.adminLogin.role;
export const selectUsername = (state: RootState) => state.adminLogin.username;
export const selectAdminLoginState = (state: RootState) => state.adminLogin;
export const selectLogoutLoading = (state: RootState) => state.adminLogout.loading;
export const selectLogoutCompleted = (state: RootState) => state.adminLogout.completed;
export const selectRefreshReady = (state: RootState) => state.adminRefresh.ready;
export const selectRefreshUnauthorized = (state: RootState) => state.adminRefresh.unauthorized;