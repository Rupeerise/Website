import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getUsername = createAsyncThunk("username/get", async () => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/api/user", {
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

export const usernameSlice = createSlice({
  name: "username",
  initialState: {
    value: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsername.fulfilled, (state, action) => {
      state.value = action.payload.username;
    });
  },
});

export default usernameSlice.reducer;
export { getUsername };
