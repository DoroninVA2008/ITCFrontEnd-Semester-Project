import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/rootSaga'
import { MainContent } from '../features/main-content'
import cardReducer from './saga/cardSlice'
import { adminLoginReducer } from '../features/admin-connection/login-function/ui/slice'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    ...MainContent.reducer,
    card: cardReducer,
    adminLogin: adminLoginReducer,
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