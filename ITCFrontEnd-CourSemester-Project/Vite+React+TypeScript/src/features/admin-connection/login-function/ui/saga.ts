import { takeLatest, put, call, select } from 'redux-saga/effects'
// import { PayloadAction } from '@reduxjs/toolkit'
import { adminLogIn } from '../../../../entities/cons'
import { 
  loginSuccess, 
  loginFailure,
  ADMIN_LOGIN_REQUEST,
} from './slice'
import { selectLogin, selectPassword } from './selectors'

// interface LoginCredentials {
//   login: string;
//   password: string;
// }

function* handleAdminLogin(): Generator<any, void, any> {
  try {
    // Получаем логин и пароль из стейта
    const login: string = yield select(selectLogin);
    const password: string = yield select(selectPassword);

    console.log('Отправляем:', JSON.stringify({ login, password }));
    
    const response: Response = yield call(fetch, adminLogIn, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ login, password }),
    });

    if (response.status === 401) {
      console.log('Неверный логин или пароль');
      yield put(loginFailure('Неверный логин или пароль'));
      return;
    }

    // Определяем роль: сначала из тела ответа, иначе по логину
    let role: string | null = null;
    try {
      const data: any = yield call([response, 'json']);
      role = data?.role ?? null;
    } catch {
      // тело пустое или не JSON — ок
    }

    // Сохраняем username в localStorage
    localStorage.setItem('username', login);

    // Определяем итоговую роль для навигации
    const finalRole = role === 'super_admin' || (!role && login === 'admin_TeSt') 
      ? 'super_admin' 
      : role || 'admin';

    yield put(loginSuccess({ 
      role: finalRole, 
      username: login 
    }));

  } catch (error: any) {
    yield put(loginFailure('Ошибка подключения к серверу'));
  }
}

export function* watchAdminLogin(): Generator<any, void, any> {
  yield takeLatest(ADMIN_LOGIN_REQUEST, handleAdminLogin);
}

// Экспортируем для добавления в rootSaga
export const adminLoginSagas = [
  watchAdminLogin(),
];