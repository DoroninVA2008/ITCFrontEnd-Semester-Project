import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/rootSaga'
import { MainContent } from '../features/main-content'
import cardReducer from './saga/cardSlice'
import { adminLoginReducer } from '../features/admin-connection/login-function/ui/login/slice'
import { adminLogoutReducer } from '../features/admin-connection/login-function/ui/logout/slice'
import { adminRefreshReducer } from '../features/admin-connection/login-function/ui/refresh/slice'
import { Auth } from '../features/auth'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    ...MainContent.reducer,
    card: cardReducer,
    adminLogin: adminLoginReducer,
    adminLogout: adminLogoutReducer,
    adminRefresh: adminRefreshReducer,
    ...Auth.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
