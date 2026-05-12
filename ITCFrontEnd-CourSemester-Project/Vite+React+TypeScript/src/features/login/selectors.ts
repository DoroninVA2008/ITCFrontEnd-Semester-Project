// import { RootState } from '../../app/store'

import { name } from "./slice";
import { AuthState } from "./types";

interface State {
    [name]: AuthState
}
const selectLogin = (state: State) => state.auth.login;
const selectPassword = (state: RootState) => state.auth.password;
const selectLoading = (state: RootState) => state.auth.loading;
const selectError = (state: RootState) => state.auth.error;
const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
const selectRole = (state: RootState) => state.auth.role;
const selectUsername = (state: RootState) => state.auth.username;
const selectAdminLoginState = (state: RootState) => state.auth;
const selectLogoutLoading = (state: RootState) => state.auth.logoutLoading;
const selectLogoutCompleted = (state: RootState) => state.auth.logoutCompleted;
const selectRefreshReady = (state: RootState) => state.auth.refreshReady;
const selectRefreshUnauthorized = (state: RootState) => state.auth.refreshUnauthorized;

export const selectors = {
    selectLogin,
    selectPassword,
    selectLoading,
    selectError,
    selectIsAuthenticated,
    selectRole,
    selectUsername,
    selectAdminLoginState,
    selectLogoutLoading,
    selectLogoutCompleted,
    selectRefreshReady,
    selectRefreshUnauthorized,
}