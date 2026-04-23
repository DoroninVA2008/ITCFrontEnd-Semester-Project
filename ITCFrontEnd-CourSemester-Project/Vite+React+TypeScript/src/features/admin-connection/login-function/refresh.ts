import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminReFresh } from '../../../entities/cons'

// Глобальное состояние для предотвращения множественных запросов
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;
let refreshSubscribers: Array<(success: boolean) => void> = [];

const subscribeToRefresh = (callback: (success: boolean) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshComplete = (success: boolean) => {
  refreshSubscribers.forEach(cb => cb(success));
  refreshSubscribers = [];
};

export const useAdminRefresh = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const accessTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMountedRef = useRef(true);

  const refreshTokens = async (): Promise<boolean> => {
    // Если уже идет обновление, возвращаем существующий промис
    if (isRefreshing && refreshPromise) {
      console.log('Обновление токена уже выполняется, ожидаем...');
      return new Promise((resolve) => {
        subscribeToRefresh(resolve);
      });
    }

    isRefreshing = true;
    refreshPromise = new Promise(async (resolve) => {
      try {
        console.log('Начинаем обновление токенов...');
        const response = await fetch(adminReFresh, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!isMountedRef.current) {
          resolve(false);
          return;
        }

        if (response.status === 401) {
          console.log('refresh_token отсутствует или невалиден');
          navigate('/log');
          onRefreshComplete(false);
          resolve(false);
          return;
        }

        if (!response.ok) {
          console.log('Ошибка при обновлении токенов:', response.status);
          onRefreshComplete(false);
          resolve(false);
          return;
        }

        console.log('Токены успешно обновлены');
        onRefreshComplete(true);
        resolve(true);
      } catch (error) {
        console.log('Ошибка сети при обновлении токенов:', error);
        onRefreshComplete(false);
        resolve(false);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    });

    return refreshPromise;
  };

  useEffect(() => {
    isMountedRef.current = true;
    
    const initialize = async () => {
      // Небольшая задержка перед первым запросом
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (isMountedRef.current) {
        const success = await refreshTokens();
        if (success) {
          setReady(true);
        }
      }
    };

    initialize();

    // Обновление access_token каждые 7 минут
    accessTimerRef.current = setInterval(async () => {
      console.log('Обновление access_token (7 минут)');
      await refreshTokens();
    }, 15 * 60 * 1000);

    // Обновление refresh_token каждые 15 минут
    refreshTimerRef.current = setInterval(async () => {
      console.log('Обновление refresh_token (15 минут)');
      await refreshTokens();
    }, 15 * 60 * 1000);

    return () => {
      isMountedRef.current = false;
      if (accessTimerRef.current) {
        clearInterval(accessTimerRef.current);
      }
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, []);

  return { 
    ready, 
    refreshTokens // Экспортируем функцию для ручного обновления
  };
};