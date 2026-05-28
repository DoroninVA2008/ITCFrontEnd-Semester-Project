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

  const ready = useSelector((state: any) => state.auth.refreshReady);
  const navigateToLogin = useSelector((state: any) => state.auth.navigateToLogin);

  useEffect(() => {
    dispatch(ReFreshFeature.actions.startRefreshTimer());

    return () => {
      dispatch(ReFreshFeature.actions.stopRefreshTimer());
    };
  }, [dispatch]);

  useEffect(() => {
    if (navigateToLogin) {
      dispatch(ReFreshFeature.actions.clearNavigateToLogin());
      navigate('/log');
    }
  }, [navigateToLogin, dispatch, navigate]);

  return { ready } as const;
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
      return;
    }

    console.log('Токены успешно обновлены');
    yield put(actions.refreshSuccess());
  } catch (error) {
    console.log('Ошибка сети при обновлении токенов:', error);
  }
}

function* handleStartReFreshTimer(): Generator<any, void, any> {
  const isAuthenticated: boolean = yield select(selectors.selectIsAuthenticated);
  
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

function* handleReFreshUnauthorized(): Generator<any, void, any> {
  yield put(actions.stopRefreshTimer());
  yield put(actions.logout());
  yield put(actions.refreshReset());
}

export function* ReFreshInit(): Generator<any, void, any> {
  yield takeLeading(actions.refreshRequest, handleAdminReFresh);
  yield takeLatest(actions.startRefreshTimer, handleStartReFreshTimer);
  yield takeLatest(actions.refreshUnauthorized, handleReFreshUnauthorized);
}