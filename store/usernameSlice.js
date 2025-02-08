import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getUsername = createAsyncThunk(
  "username/get",
  async (_, { rejectWithValue }) => {
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
      const data = await response.json();
      return rejectWithValue({ data });
    }
  }
);

export const usernameSlice = createSlice({
  name: "username",
  initialState: {
    value: "",
    autorization: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsername.fulfilled, (state, action) => {
      state.value = action.payload.username;
      state.autorization = true;
    });
    builder.addCase(getUsername.rejected, (state, action) => {
      state.value = "";
      state.autorization = false;
    });
  },
});

export default usernameSlice.reducer;
export { getUsername };
