import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogIn } from '../../entities/cons'

export const useAdminLogin = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Отправляем:', JSON.stringify({ login, password }));
      const response = await fetch(adminLogIn, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ login, password }),
      });

      if (response.status === 401) {
        console.log('Неверный логин или пароль');
        alert('Неверный логин или пароль');
        return;
      }

      // Определяем роль: сначала из тела ответа, иначе по логину
      let role: string | null = null;
      try {
        const data = await response.json();
        role = data?.role ?? null;
      } catch {
        // тело пустое или не JSON — ок
      }

      localStorage.setItem('username', login);

      if (role === 'moderator' || (!role && login === 'admin_TeSt2')) {
        navigate('/adm');
      } else {
        navigate('/mad');
      }
    } catch {
      alert('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return { login, setLogin, password, setPassword, error, loading, handleLogin };
};
