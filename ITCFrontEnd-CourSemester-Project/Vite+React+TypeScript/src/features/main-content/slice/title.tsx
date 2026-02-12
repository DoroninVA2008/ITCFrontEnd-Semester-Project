import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import React from 'react';

interface TitleState {
  title: string;
}

const initialState: TitleState = {
  title: 'Россия —\nстрана героев', 
};

const titleSlice = createSlice({
  name: 'main-content',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = titleSlice.actions;
export default titleSlice.reducer;