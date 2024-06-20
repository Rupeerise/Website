import { configureStore } from "@reduxjs/toolkit";
import { paymentArraySlice } from "./paymentArraySlice";
import { tagArraySlice } from "./tagArraySlice";
import { usernameSlice } from "./usernameSlice";

export const store = configureStore({
  reducer: {
    paymentArray: paymentArraySlice,
    tagArray: tagArraySlice,
    username: usernameSlice,
  },
});

export default store;
