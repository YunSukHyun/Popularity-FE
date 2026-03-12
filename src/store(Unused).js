import priconneReducer from "./slice/priconneSlice";
import genshinReducer from "./slice/genshinSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    priconne: priconneReducer,
    genshin: genshinReducer,
  },
});

export default store;
