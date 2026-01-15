import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter.ts'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})