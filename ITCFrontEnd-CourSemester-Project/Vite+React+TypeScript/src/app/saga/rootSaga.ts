import { all, fork } from 'redux-saga/effects'
import { watchFetchData } from './saga.ts'

// Импортируйте ваши саги
// import { watchSomeSaga } from './someSaga';
// import { watchAnotherSaga } from './anotherSaga';

export function* rootSaga() {
  yield all([
    fork(watchFetchData)
  ]);
}