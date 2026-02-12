import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './saga/rootSaga.ts'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  // mainContent: {
  //   title: "<h1>Россия — <br /> страна героев</h1>"
  // },
  reducer: {
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