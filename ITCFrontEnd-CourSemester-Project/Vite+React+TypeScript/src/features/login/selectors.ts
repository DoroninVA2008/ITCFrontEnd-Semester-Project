// import { RootState } from '../../app/store'
import { name } from './slice'
import { AuthState } from './types'

interface State {
    [name]: AuthState
}

const selectLogin = (state: State) => state.auth.login;
const selectPassword = (state: State) => state.auth.password;
const selectLoading = (state: State) => state.auth.loading;
const selectError = (state: State) => state.auth.error;
const selectIsAuthenticated = (state: State) => state.auth.isAuthenticated;
const selectRole = (state: State) => state.auth.role;
const selectUsername = (state: State) => state.auth.username;
const selectAdminLoginState = (state: State) => state.auth;
const selectLogoutLoading = (state: State) => state.auth.logoutLoading;
const selectLogoutCompleted = (state: State) => state.auth.logoutCompleted;
const selectRefreshReady = (state: State) => state.auth.refreshReady;
const selectRefreshUnauthorized = (state: State) => state.auth.refreshUnauthorized;
const selectNavigateTo = (state: State) => state.auth.navigateTo;

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
    selectNavigateTo,
}