import React, { InputEvent } from 'react'
import { useAdminLogin } from '../login/login'
import { useDispatch, useSelector } from 'react-redux';
import { LoginFeature } from '../login';

export const LogInContentComponent: React.FC = () => {
  // Удаляешь и меняешь на useSelector(selector login frature) || dispatch(action login feature) (useDispatch)
  // const { login, setLogin, password, setPassword, error, loading, handleLogin } = useAdminLogin();
  const login = useSelector(LoginFeature.selectors.selectLogin)

  const dispatch = useDispatch();
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(LoginFeature.actions.setLogin(e.target.value))
  }
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
            onChange={handleLoginChange}
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