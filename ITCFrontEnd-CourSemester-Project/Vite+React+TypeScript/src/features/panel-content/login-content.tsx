import React from 'react'
import { useAdminLogin } from '../admin-connection/login'

export const LogInContentComponent: React.FC = () => {
  const { login, setLogin, password, setPassword, error, loading, handleLogin } = useAdminLogin();

  return (
    <form className="AdminLogIn" onSubmit={handleLogin}>
      <h1>
        Вход
      </h1>
      <div className="admin-group">
        <div className="admin-login">
          <label htmlFor="LogIn">
            Логин
          </label>
          <br />
          <input
            type="text"
            id="LogIn"
            name="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="admin-login">
          <label htmlFor="PassWord">
            Пароль
          </label>
          <br />
          <input
            type="password"
            id="PassWord"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      {error && <p className="login-error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};