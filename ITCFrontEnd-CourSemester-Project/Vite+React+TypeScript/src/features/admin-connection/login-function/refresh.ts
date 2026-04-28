import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { refreshRequest } from './ui/refresh/slice';
import { selectRefreshReady, selectRefreshUnauthorized } from './ui/refresh/selectors';

export const useAdminRefresh = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ready = useSelector(selectRefreshReady);
  const unauthorized = useSelector(selectRefreshUnauthorized);

  useEffect(() => {
    dispatch(refreshRequest());

    timerRef.current = setInterval(() => {
      console.log('Обновление токенов (15 минут)');
      dispatch(refreshRequest());
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
