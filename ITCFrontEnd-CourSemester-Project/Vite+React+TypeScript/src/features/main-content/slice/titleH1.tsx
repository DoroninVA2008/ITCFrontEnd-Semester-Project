import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TitleH1State {
  titleH1: string;
}

const initialState: TitleH1State = {
  titleH1: '<h1>Россия — <br /> страна героев</h1>', 
};

const titleH1Slice = createSlice({
  name: 'titleH1',
  initialState,
  reducers: {
    setTitleH1: (state, action: PayloadAction<string>) => {
      state.titleH1 = action.payload;
    },
  },
});

export const { setTitleH1 } = titleH1Slice.actions;
export default titleH1Slice.reducer;