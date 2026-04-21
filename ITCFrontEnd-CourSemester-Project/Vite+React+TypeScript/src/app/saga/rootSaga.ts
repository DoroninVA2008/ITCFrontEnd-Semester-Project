import { all } from 'redux-saga/effects';
import { watchFetchData, watchFetchCardData } from './saga';
import { adminLoginSagas } from '../../features/admin-connection/login-function/ui/saga';

export default function* rootSaga() {
  yield all([
    watchFetchData(),
    watchFetchCardData(),
    ...adminLoginSagas
  ]);
}