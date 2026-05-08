import { all, fork } from 'redux-saga/effects'
import { watchFetchData, watchFetchCardData } from './saga'
import { Auth } from '../../features/auth'
import { FormDesign } from '../../features/form-design'
import { watchFetchAllEvents } from '../../features/card-information/saga'

export default function* rootSaga() {
  yield all([
    watchFetchData(),
    watchFetchCardData(),
    fork(Auth.sagas.init),
    fork(FormDesign.sagas.init),
    watchFetchAllEvents(),
  ]);
}
