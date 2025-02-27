import { createSlice } from "@reduxjs/toolkit";

export const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    graphType: "paid",
    graphTypeEnum: ["paid", "received"],
  },
  reducers: {
    setGraphType: (state, action) => {
      state.graphType = action.payload;
    },
  },
});

export const { setGraphType } = budgetSlice.actions;
export default budgetSlice.reducer;
