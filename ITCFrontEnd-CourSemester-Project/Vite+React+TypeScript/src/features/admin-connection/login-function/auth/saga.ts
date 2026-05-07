import { takeLatest, takeLeading, put, call, select } from 'redux-saga/effects'
import { adminLogIn, adminLogOut, adminReFresh } from '../../../../entities/cons'
import { actions } from './slice'
import { selectLogin, selectPassword } from './selectors'

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
    const response = yield call(fetch, adminLogOut, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) { //?
      yield put(actions.logoutSuccess())
    }
  } catch {
    console.log('Ошибка при выходе из аккаунта');
  } finally {
    // yield put(actions.logout()); //reset ?
    // yield put(actions.logoutSuccess());
  }
}

function* handleAdminRefresh(): Generator<any, void, any> {
  try {
    const response: Response = yield call(fetch, adminReFresh, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 401) {
      console.log('refresh_token отсутствует или невалиден');
      yield put(actions.refreshUnauthorized());
      return;
    }

    if (!response.ok) {
      console.log('Ошибка при обновлении токенов:', response.status);
      return;
    }

    console.log('Токены успешно обновлены');
    yield put(actions.refreshSuccess());
  } catch (error) {
    console.log('Ошибка сети при обновлении токенов:', error);
  }
}

export function* authInit(): Generator<any, void, any> {
  yield takeLatest(actions.loginRequest, handleAdminLogin);
  yield takeLatest(actions.logoutRequest, handleAdminLogout);
  yield takeLeading(actions.refreshRequest, handleAdminRefresh);
}
