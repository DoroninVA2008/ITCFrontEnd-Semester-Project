import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions } from '../refresh/slice'
import { selectRefreshReady, selectRefreshUnauthorized, selectIsAuthenticated } from '../refresh/selectors'

export const useAdminRefresh = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ready = useSelector(selectRefreshReady);
  const unauthorized = useSelector(selectRefreshUnauthorized);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      // Пользователь только что залогинился — токены свежие, refresh не нужен
      dispatch(actions.refreshSuccess());
    } else {
      // Перезагрузка страницы — восстанавливаем сессию через куки
      dispatch(actions.refreshRequest());
    }

    timerRef.current = setInterval(() => {
      dispatch(actions.refreshRequest());
    }, 15 * 60 * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (unauthorized) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      dispatch(actions.logout());
      dispatch(actions.refreshReset());
      navigate('/log');
    }
  }, [unauthorized, navigate]);

  return { ready };
};
