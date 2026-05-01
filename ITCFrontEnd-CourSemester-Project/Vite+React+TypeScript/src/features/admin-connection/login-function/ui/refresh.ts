import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions } from '../auth/slice'
import { selectRefreshReady, selectRefreshUnauthorized } from '../auth/selectors'

export const useAdminRefresh = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ready = useSelector(selectRefreshReady);
  const unauthorized = useSelector(selectRefreshUnauthorized);

  useEffect(() => {
    dispatch(actions.refreshRequest());

    timerRef.current = setInterval(() => {
      console.log('Обновление токенов (15 минут)');
      dispatch(actions.refreshRequest());
    }, 15 * 60 * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (unauthorized) {
      navigate('/log');
    }
  }, [unauthorized, navigate]);

  return { ready };
};
