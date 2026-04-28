import { takeLatest, put, call } from 'redux-saga/effects';
import { adminLogOut } from '../../../../../entities/cons';
import { logoutRequest, logoutSuccess } from './slice';
import { logout } from '../login/slice';

function* handleAdminLogout(): Generator<any, void, any> {
  try {
    yield call(fetch, adminLogOut, {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    console.log('Ошибка при выходе из аккаунта');
  } finally {
    yield put(logout());
    yield put(logoutSuccess());
  }
}

export function* watchAdminLogout(): Generator<any, void, any> {
  yield takeLatest(logoutRequest, handleAdminLogout);
}

export const adminLogoutSagas = [watchAdminLogout()];
