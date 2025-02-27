import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: null,
  errorStatus: null,
  successMessage: null,
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setErrorMessage(state, action) {
      state.errorMessage = action.payload.message;
      state.errorStatus = action.payload.status;
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
    clearMessages(state) {
      state.errorMessage = null;
      state.errorStatus = null;
      state.successMessage = null;
    },
  },
});

export const { setErrorMessage, setSuccessMessage, clearMessages } =
  messageSlice.actions;

export default messageSlice.reducer;
