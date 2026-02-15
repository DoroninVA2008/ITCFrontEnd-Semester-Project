import { all, fork } from 'redux-saga/effects'
import { watchFetchData } from './saga.ts'

export function* rootSaga() {
  yield all([
    fork(watchFetchData)
  ]);
}