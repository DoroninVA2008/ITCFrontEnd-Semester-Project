import { useNavigate } from 'react-router-dom';
import { adminLogOut } from '../../entities/cons';

export const useAdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(adminLogOut, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      console.log('Ошибка при выходе из аккаунта');
    } finally {
      navigate('/log');
    }
  };

  return { handleLogout };
};
