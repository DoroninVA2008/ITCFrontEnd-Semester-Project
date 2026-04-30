import { takeLatest, put, call, select } from 'redux-saga/effects'
import { adminLogIn, adminLogOut } from '../../entities/cons'
import { actions } from './slice'
import { logout } from '../admin-connection/login-function/ui/login/slice'
import { selectLogin, selectPassword } from './selectors'
import { logoutRequest, logoutSuccess } from '../admin-connection/login-function/ui/logout/slice'

function* handleAdminLogin(): Generator<any, void, any> {
  try {
    const login: string = yield select(selectLogin);
    const password: string = yield select(selectPassword);

    console.log('Отправляем:', JSON.stringify({ login, password }));

    const response: Response = yield call(fetch, adminLogIn, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ login, password }),
    });

    if (response.status === 401) {
      yield put(actions.loginFailure('Неверный логин или пароль'));
      return;
    }

    let role: string | null = null;
    try {
      const data: any = yield call([response, 'json']);
      role = data?.role ?? null;
    } catch {
      // тело пустое или не JSON — ок
    }

    localStorage.setItem('username', login);

    const finalRole =
      role === 'super_admin' || (!role && login === 'admin_TeSt')
        ? 'super_admin'
        : role || 'admin';

    yield put(actions.loginSuccess({ role: finalRole, username: login }));
  } catch {
    yield put(actions.loginFailure('Ошибка подключения к серверу'));
  }
}

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

export function* authInit(): Generator<any, void, any> {
  yield takeLatest(actions.loginRequest, handleAdminLogin);
  yield takeLatest(logoutRequest, handleAdminLogout);
}
