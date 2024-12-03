import { configureStore } from "@reduxjs/toolkit";
import { paymentArraySlice } from "./paymentArraySlice";
import { tagArraySlice } from "./tagArraySlice";
import { usernameSlice } from "./usernameSlice";
import { currencySlice } from "./currencySlice";
import { graphSlice } from "./graphSlice";
import { loanArraySlice } from "./loanArraySlice";

export const store = configureStore({
  reducer: {
    paymentArray: paymentArraySlice.reducer,
    tagArray: tagArraySlice.reducer,
    username: usernameSlice.reducer,
    currency: currencySlice.reducer,
    graph: graphSlice.reducer,
    loanArray: loanArraySlice.reducer,
  },
});

export default store;
