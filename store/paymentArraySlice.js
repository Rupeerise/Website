import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getPaymentArray = createAsyncThunk("paymentArray/get", async () => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/payment", {
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

const deletePayment = createAsyncThunk("paymentArray/delete", async (id) => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/payment/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    return true;
  } else {
    console.log("HTTP-Error: " + response.status);
    return false;
  }
});

const addPayment = createAsyncThunk("paymentArray/add", async (payment) => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payment),
  });
  if (response.ok) {
    let jsonResponse = await response.json();
    return jsonResponse;
  } else {
    console.log("HTTP-Error: " + response.status);
    return false;
  }
});

const updatePayment = createAsyncThunk(
  "paymentArray/update",
  async (payment) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/payment/" + payment._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payment),
    });
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse;
    } else {
      console.log("HTTP-Error: " + response.status);
      return false;
    }
  }
);

export const paymentArraySlice = createSlice({
  name: "paymentArray",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentArray.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = state.value.filter(
            (payment) => payment._id !== action.meta.arg
          );
        }
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        if (action.payload) {
          state.value.push(action.payload.newPayment);
        }
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = state.value.map((payment) =>
            payment._id === action.payload._id ? action.payload : payment
          );
        }
      });
  },
});

export default paymentArraySlice.reducer;
export { getPaymentArray, deletePayment, addPayment };
