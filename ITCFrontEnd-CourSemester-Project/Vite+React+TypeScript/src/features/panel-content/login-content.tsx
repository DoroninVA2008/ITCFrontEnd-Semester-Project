import React from 'react'
import { Link } from 'react-router-dom'

export const LogInContentComponent: React.FC = () => {
  return (
    <div className="AdminLogIn">
      <h1>
        Вход
      </h1>
      <div className="admin-group">
        <div className="admin-login">
          <label htmlFor="name">
            Логин
          </label>
          <br />
          <input
            type="text"
            id="LogIn"
            name="login"
            required
          />
        </div>
        <div className="admin-login">
          <label htmlFor="name">
            Пароль
          </label>
          <br />
          <input
            type="text"
            id="PassWord"
            name="password"
            required
          />
        </div>
      </div>
      <Link to="/adm">
        <button>
          Войти
        </button>
      </Link>
    </div>
  );
};