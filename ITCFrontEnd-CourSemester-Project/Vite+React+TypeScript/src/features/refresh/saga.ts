import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { takeLatest, takeLeading, put, call, select, delay, race, take } from 'redux-saga/effects'
import { adminLogIn, adminLogOut, adminReFresh } from '../../entities/cons'
import { actions } from './slice'
import { selectLogin, selectPassword, selectIsAuthenticated } from './selectors'
import { Auth } from './index'

export const useAdminRefresh = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ready = useSelector((state: any) => state.auth.refreshReady);
  const navigateToLogin = useSelector((state: any) => state.auth.navigateToLogin);

  useEffect(() => {
    dispatch(Auth.actions.startRefreshTimer());

    return () => {
      dispatch(Auth.actions.stopRefreshTimer());
    };
  }, [dispatch]);

  useEffect(() => {
    if (navigateToLogin) {
      dispatch(Auth.actions.clearNavigateToLogin());
      navigate('/log');
    }
  }, [navigateToLogin, dispatch, navigate]);

  return { ready } as const;
};

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
      role === 'super_admin' || (!role && login === 'super_admin')
        ? 'super_admin'
        : role || 'moderator';

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
    yield put(actions.logoutSuccess());
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

function* handleStartRefreshTimer(): Generator<any, void, any> {
  const isAuthenticated: boolean = yield select(selectIsAuthenticated);
  
  if (isAuthenticated) {
    yield put(actions.refreshSuccess());
  } else {
    yield put(actions.refreshRequest());
  }

  while (true) {
    const { stopped } = yield race({
      timeout: delay(15 * 60 * 1000),
      stopped: take(actions.stopRefreshTimer),
    });

    if (stopped) break;

    yield put(actions.refreshRequest());
  }
}

function* handleRefreshUnauthorized(): Generator<any, void, any> {
  yield put(actions.stopRefreshTimer());
  yield put(actions.logout());
  yield put(actions.refreshReset());
}

export function* authInit(): Generator<any, void, any> {
  yield takeLatest(actions.loginRequest, handleAdminLogin);
  yield takeLatest(actions.logoutRequest, handleAdminLogout);
  yield takeLeading(actions.refreshRequest, handleAdminRefresh);
  yield takeLatest(actions.startRefreshTimer, handleStartRefreshTimer);
  yield takeLatest(actions.refreshUnauthorized, handleRefreshUnauthorized);
}