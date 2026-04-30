import { all, fork } from 'redux-saga/effects'
import { watchFetchData, watchFetchCardData } from './saga'
import { adminLoginSagas } from '../../features/admin-connection/login-function/login/saga'
import { adminLogoutSagas } from '../../features/admin-connection/login-function/logout/saga'
import { adminRefreshSagas } from '../../features/admin-connection/login-function/refresh/saga'
import { Auth } from '../../features/admin-connection/login-function/auth'

export default function* rootSaga() {
  yield all([
    watchFetchData(),
    watchFetchCardData(),
    ...adminLoginSagas,
    ...adminLogoutSagas,
    ...adminRefreshSagas,
    fork(Auth.sagas.init)
  ]);
}
