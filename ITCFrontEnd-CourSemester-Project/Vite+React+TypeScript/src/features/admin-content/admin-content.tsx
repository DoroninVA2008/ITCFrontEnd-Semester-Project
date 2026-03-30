import React from 'react'

export const AdminContentComponent: React.FC = () => {
  return (
    <div className="AdminLogIn">
      <h1>Вход</h1>
      <div className="admin-group">
        <div className="admin-login">
          <label htmlFor="name">Логин</label>
          <br />
          <input
            type="text"
            id="LogIn"
            name="login"
            // placeholder="Введите название события"
            // value={name}
            // onChange={handleNameChange}
            required
          />
        </div>
        <div className="admin-login">
          <label htmlFor="name">Пароль</label>
          <br />
          <input
            type="text"
            id="PassWord"
            name="password"
            // placeholder="Введите название события"
            // value={name}
            // onChange={handleNameChange}
            required
          />
        </div>
      </div>
      <button>Войти</button>
    </div>
  );
};