import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './saga/rootSaga.ts'
import titleH1 from '../features/main-content/slice/titleH1.tsx'
import titleH2 from '../features/main-content/slice/titleH2.tsx'
import titleH3 from '../features/main-content/slice/titleH3.tsx'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    title1: titleH1,
    title2: titleH2,
    title3: titleH3
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