import { all, fork } from 'redux-saga/effects'
import { watchFetchData, watchFetchCardData } from './saga.ts'

export function* rootSaga() {
  yield all([
    fork(watchFetchData),
    fork(watchFetchCardData),
  ]);
}