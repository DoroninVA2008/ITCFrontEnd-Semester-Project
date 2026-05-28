import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { takeLatest, takeLeading, put, call, select, delay, race, take } from 'redux-saga/effects'
import { adminReFresh } from '../../entities/cons'
import { actions } from './slice'
import { selectors } from './selectors'
import { ReFreshFeature } from './index'

export const useAdminReFresh = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ready = useSelector(selectors.selectRefreshReady);
  const isAuthenticated = useSelector(selectors.selectIsAuthenticated);
  const navigateToLogin = useSelector(selectors.selectNavigateToLogin);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(ReFreshFeature.actions.startRefreshTimer());
    }

    return () => {
      dispatch(ReFreshFeature.actions.stopRefreshTimer());
    };
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (navigateToLogin) {
      dispatch(ReFreshFeature.actions.clearNavigateToLogin());
      navigate('/log');
    }
  }, [navigateToLogin, dispatch, navigate]);

  return { ready, isAuthenticated } as const;
};

function* handleAdminReFresh(): Generator<any, void, any> {
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
      if (response.status === 403 || response.status === 500) {
        yield put(actions.refreshUnauthorized());
      }
      return;
    }

    const data = yield response.json();
    console.log('Токены успешно обновлены');
    
    yield put(actions.refreshSuccess());
    
    if (data.role && data.username) {
      yield put(actions.loginSuccess({ 
        role: data.role, 
        username: data.username 
      }));
    }
  } catch (error) {
    console.log('Ошибка сети при обновлении токенов:', error);
    yield put(actions.refreshUnauthorized());
  }
}

function* handleStartReFreshTimer(): Generator<any, void, any> {
  const isAuthenticated: boolean = yield select(selectors.selectIsAuthenticated);
  
  if (!isAuthenticated) {
    return;
  }
  
  yield put(actions.refreshRequest());
  
  const { success, unauthorized } = yield race({
    success: take(actions.refreshSuccess),
    unauthorized: take(actions.refreshUnauthorized),
    timeout: delay(5000)
  });

  if (unauthorized || !success) {
    return;
  }

  while (true) {
    const { stopped } = yield race({
      timeout: delay(15 * 60 * 1000), // 15 минут
      stopped: take(actions.stopRefreshTimer),
    });

    if (stopped) break;

    yield put(actions.refreshRequest());
  }
}

function* handleReFreshUnauthorized(): Generator<any, void, any> {
  console.log('handleReFreshUnauthorized: очистка состояния');
  const navigate = useNavigate();
  navigate('/log');
  yield put(actions.stopRefreshTimer());
  yield put(actions.logout());
  yield put(actions.refreshReset());
  yield put(actions.setNavigateToLogin());
}

export function* ReFreshInit(): Generator<any, void, any> {
  yield takeLeading(actions.refreshRequest, handleAdminReFresh);
  yield takeLatest(actions.startRefreshTimer, handleStartReFreshTimer);
  yield takeLatest(actions.refreshUnauthorized, handleReFreshUnauthorized);
}