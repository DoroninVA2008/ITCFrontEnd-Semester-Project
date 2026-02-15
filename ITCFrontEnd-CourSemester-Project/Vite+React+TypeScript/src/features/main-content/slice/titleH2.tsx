import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TitleH2State {
  titleH2: string;
}

const initialState: TitleH2State = {
  titleH2: '<h2>Интерактивная карта исторических<br />событий</h2>', 
};

const titleH2Slice = createSlice({
  name: 'titleH2',
  initialState,
  reducers: {
    setTitleH2: (state, action: PayloadAction<string>) => {
      state.titleH2 = action.payload;
    },
  },
});

export const { setTitleH2 } = titleH2Slice.actions;
export default titleH2Slice.reducer;