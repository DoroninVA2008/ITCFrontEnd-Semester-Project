import { all } from 'redux-saga/effects';
import { watchFetchData, watchFetchCardData } from './saga';
import { adminLoginSagas } from '../../features/admin-connection/login-function/ui/login/saga';
import { adminLogoutSagas } from '../../features/admin-connection/login-function/ui/logout/saga';
import { adminRefreshSagas } from '../../features/admin-connection/login-function/ui/refresh/saga';

export default function* rootSaga() {
  yield all([
    watchFetchData(),
    watchFetchCardData(),
    ...adminLoginSagas,
    ...adminLogoutSagas,
    ...adminRefreshSagas,
  ]);
}
