import { RootState } from '../../../../../app/store';

export const selectRefreshReady = (state: RootState) => state.adminRefresh.ready;
export const selectRefreshUnauthorized = (state: RootState) => state.adminRefresh.unauthorized;
