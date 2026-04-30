import { RootState } from '../../../../app/store'

export const selectLogoutLoading = (state: RootState) => state.adminLogout.loading;
export const selectLogoutCompleted = (state: RootState) => state.adminLogout.completed;
