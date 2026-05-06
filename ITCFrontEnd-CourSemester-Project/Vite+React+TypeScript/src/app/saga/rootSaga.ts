import { all, fork } from 'redux-saga/effects'
import { watchFetchData, watchFetchCardData } from './saga'
import { Auth } from '../../features/admin-connection/login-function/auth'
import { watchFetchAllEvents } from '../../features/card-information/saga'

export default function* rootSaga() {
  yield all([
    watchFetchData(),
    watchFetchCardData(),
    fork(Auth.sagas.init),
    watchFetchAllEvents(),
  ]);
}
