import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter.ts'

// Добавь слово export перед const
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

// Это пригодится для типизации useSelector
export type RootState = ReturnType<typeof store.getState>;