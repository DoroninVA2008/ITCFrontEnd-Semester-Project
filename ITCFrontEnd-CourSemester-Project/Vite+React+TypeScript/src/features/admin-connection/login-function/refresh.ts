import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { adminReFresh } from '../../../entities/cons'

export const useAdminRefresh = () => {
  // const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await fetch(adminReFresh, {
          method: 'POST',
          credentials: 'include',
        });

        if (response.status === 401) {
          console.log('refresh_token отсутствует или невалиден');
          // navigate('/log');
        }
      } catch {
        console.log('Ошибка при обновлении токена');
      } finally {
        setReady(true);
      }
    };

    refresh();
  }, []);

  return { ready };
};
