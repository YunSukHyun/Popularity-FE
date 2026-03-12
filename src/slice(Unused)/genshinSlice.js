import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gCharSelected: []
}

const genshinSlice = createSlice({
  name: 'genshin',
  initialState,
  reducers: {
    gSelect: (state, action) => {
      state.gCharSelected.push(action.payload);
    },
    gUnselect: (state, action) => {
      state.gCharSelected = state.gCharSelected.filter(user => user !== action.payload)
    },
    gReset: (state) => {
      state.gCharSelected = [];
    }
  }
})

export const {gSelect, gUnselect, gReset} = genshinSlice.actions
export default genshinSlice.reducer;