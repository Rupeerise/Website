import { configureStore } from "@reduxjs/toolkit";
import { paymentArraySlice } from "./paymentArraySlice";
import { tagArraySlice } from "./tagArraySlice";
import { usernameSlice } from "./usernameSlice";
import { currencySlice } from "./currencySlice";

export const store = configureStore({
  reducer: {
    paymentArray: paymentArraySlice.reducer,
    tagArray: tagArraySlice.reducer,
    username: usernameSlice.reducer,
    currency: currencySlice.reducer,
  },
});

export default store;