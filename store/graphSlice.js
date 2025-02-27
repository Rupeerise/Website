import { createSlice } from "@reduxjs/toolkit";

// External function to set month start and end
function getMonthStartAndEnd() {
  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  ).toISOString();
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).toISOString();
  return { startOfMonth, endOfMonth };
}

// External function to set week start and end
function getWeekStartAndEnd() {
  const now = new Date();
  const startOfWeek = new Date(
    now.setDate(now.getDate() - now.getDay())
  ).toISOString();
  const endOfWeek = new Date(
    now.setDate(now.getDate() - now.getDay() + 6)
  ).toISOString();
  return { startOfWeek, endOfWeek };
}

function getlastMonthStartAndEnd() {
  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  ).toISOString();
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0
  ).toISOString();
  return { startOfMonth, endOfMonth };
}

function getYearStartAndEnd() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString();
  const endOfYear = new Date(now.getFullYear(), 11, 31).toISOString();
  return { startOfYear, endOfYear };
}

export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    startdate: new Date().toISOString(),
    enddate: new Date().toISOString(),
    graphType: "paid",
    graphTypeEnum: ["paid", "received"],
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
    setYearStartAndEnd: (state) => {
      const { startOfYear, endOfYear } = getYearStartAndEnd();
      state.startdate = startOfYear;
      state.enddate = endOfYear;
    },
    setGraphType: (state, action) => {
      state.graphType = action.payload;
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  setMonthStartAndEnd,
  setWeekStartAndEnd,
  setLastMonthStartAndEnd,
  setGraphType,
  setYearStartAndEnd,
} = graphSlice.actions;
export default graphSlice.reducer;
