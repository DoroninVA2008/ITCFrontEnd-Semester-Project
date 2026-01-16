import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Описываем интерфейс для состояния
interface CounterState {
  value: number;
}

// 2. Применяем интерфейс к начальному состоянию
const initialState: CounterState = { 
  value: 0 
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Используем PayloadAction<number | undefined>, так как payload может не быть
    increment: (state, action: PayloadAction<number | undefined>) => {
      const step = typeof action.payload === 'number' ? action.payload : 1;
      state.value += step;
    },
    decrement: (state, action: PayloadAction<number | undefined>) => {
      const step = typeof action.payload === 'number' ? action.payload : 1;
      state.value -= step;
    },
    reset: (state) => {
      state.value = 0;
    },
    // Здесь мы строго ожидаем число (number)
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, reset, setValue } = counterSlice.actions;
export default counterSlice.reducer;