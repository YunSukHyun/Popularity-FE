import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pCharSelected: [],
};

const priconneSlice = createSlice({
  name: "priconne",
  initialState,
  reducers: {
    pSelect: (state, action) => {
      state.pCharSelected.push(action.payload);
    },
    pUnselect: (state, action) => {
      state.pCharSelected = state.pCharSelected.filter(
        (user) => user !== action.payload
      );
    },
    pReset: (state) => {
      state.pCharSelected = [];
    },
  },
});

export const { pSelect, pUnselect, pReset } = priconneSlice.actions;
export default priconneSlice.reducer;
