import { createSlice } from "@reduxjs/toolkit";

// External function to set month start and end
function getMonthStartAndEnd() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    .toLocaleDateString()
    .split("T")[0];
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toLocaleDateString()
    .split("T")[0];
  return { startOfMonth, endOfMonth };
}

// External function to set week start and end
function getWeekStartAndEnd() {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
    .toISOString()
    .split("T")[0];
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6))
    .toISOString()
    .split("T")[0];
  return { startOfWeek, endOfWeek };
}

function getlastMonthStartAndEnd() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).split(
    "T"
  )[0];
  const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0).split(
    "T"
  )[0];
  return { startOfMonth, endOfMonth };
}

export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    startdate: new Date().toISOString(),
    enddate: new Date().toISOString(),
    paymentType: "credit",
  },
  reducers: {
    setStartDate: (state, action) => {
      state.startdate = action.payload;
    },
    setEndDate: (state, action) => {
      state.enddate = action.payload;
    },
    setMonthStartAndEnd: (state) => {
      const { startOfMonth, endOfMonth } = getMonthStartAndEnd();
      state.startdate = startOfMonth;
      state.enddate = endOfMonth;
    },
    setWeekStartAndEnd: (state) => {
      const { startOfWeek, endOfWeek } = getWeekStartAndEnd();
      state.startdate = startOfWeek;
      state.enddate = endOfWeek;
    },
    setLastMonthStartAndEnd: (state) => {
      const { startOfMonth, endOfMonth } = getlastMonthStartAndEnd();
      state.startdate = startOfMonth;
      state.enddate = endOfMonth;
    },
    changePaymentType: (state, action) => {
      state.paymentType = action.payload;
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  setMonthStartAndEnd,
  setWeekStartAndEnd,
  changePaymentType,
  setLastMonthStartAndEnd,
} = graphSlice.actions;
export default graphSlice.reducer;
