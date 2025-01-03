import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getLoanArray = createAsyncThunk("loanArray/getLoanArray", async () => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/loan", {
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
    return [];
  }
});

const deleteLoan = createAsyncThunk("loanArray/deleteLoan", async (id) => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/loan/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    return id;
  } else {
    console.log("HTTP-Error: " + response.status);
    return false;
  }
});

const addLoan = createAsyncThunk("loanArray/addLoan", async (loan) => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  //   console.log(apiUrl + "/loan");
  let response = await fetch(backendUrl + "/loan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(loan),
  });
  if (response.ok) {
    let jsonResponse = await response.json();
    return jsonResponse;
  } else {
    console.log("HTTP-Error: " + response.status);
    return false;
  }
});

const updateLoan = createAsyncThunk("loanArray/updateLoan", async (loan) => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/loan/" + loan._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(loan),
  });
  if (response.ok) {
    let jsonResponse = await response.json();
    // console.log(jsonResponse);
    return jsonResponse;
  } else {
    console.log("HTTP-Error: " + response.status);
    return false;
  }
});

export const loanArraySlice = createSlice({
  name: "loanArray",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoanArray.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.value = state.value.filter((loan) => loan._id !== action.payload);
      })
      .addCase(addLoan.fulfilled, (state, action) => {
        // console.log(action.payload.newPayment);
        state.value.push(action.payload.newLoan);
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        state.value = state.value.map((loan) =>
          loan._id === action.payload.updateLoan._id
            ? action.payload.updateLoan
            : loan
        );
      });
  },
});

export default loanArraySlice.reducer;
export { getLoanArray, deleteLoan, addLoan, updateLoan };
