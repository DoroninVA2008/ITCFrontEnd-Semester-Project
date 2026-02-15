import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TitleH3State {
  titleH3: string;
}

const initialState: TitleH3State = {
  titleH3: '<h3>Исследуйте историю. Сохраняйте память. Добавляйте события на общую карту подвигов.</h3>', 
};

const titleH3Slice = createSlice({
  name: 'titleH3',
  initialState,
  reducers: {
    setTitleH3: (state, action: PayloadAction<string>) => {
      state.titleH3 = action.payload;
    },
  },
});

export const { setTitleH3 } = titleH3Slice.actions;
export default titleH3Slice.reducer;