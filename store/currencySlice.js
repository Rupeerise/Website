import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getCurrency = createAsyncThunk("currency/get", async () => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/api/currency", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    let jsonResponse = await response.json();
    return jsonResponse;
  } else {
    console.log("HTTP-Error: " + response.status);
    return "";
  }
});

const updateCurrency = createAsyncThunk("currency/update", async (currency) => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/api/currency", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(currency),
  });
  if (response.ok) {
    let jsonResponse = await response.json();
    return jsonResponse;
  } else {
    console.log("HTTP-Error: " + response.status);
    return "";
  }
});

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    value: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrency.fulfilled, (state, action) => {
      state.value = action.payload.currency;
    });
    builder.addCase(updateCurrency.fulfilled, (state, action) => {
      state.value = action.payload.currency;
    });
  },
});

export default currencySlice.reducer;
export { getCurrency, updateCurrency };
