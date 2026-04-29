import { takeLatest, put, call } from 'redux-saga/effects'
import { adminReFresh } from '../../../../../entities/cons'
import { refreshRequest, refreshSuccess, refreshUnauthorized } from './slice'

function* handleAdminRefresh(): Generator<any, void, any> {
  try {
    const response: Response = yield call(fetch, adminReFresh, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 401) {
      console.log('refresh_token отсутствует или невалиден');
      yield put(refreshUnauthorized());
      return;
    }

    if (!response.ok) {
      console.log('Ошибка при обновлении токенов:', response.status);
      return;
    }

    console.log('Токены успешно обновлены');
    yield put(refreshSuccess());
  } catch (error) {
    console.log('Ошибка сети при обновлении токенов:', error);
  }
}

export function* watchAdminRefresh(): Generator<any, void, any> {
  yield takeLatest(refreshRequest, handleAdminRefresh);
}

export const adminRefreshSagas = [watchAdminRefresh()];
