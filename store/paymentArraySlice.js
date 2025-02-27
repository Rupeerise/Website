import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleUnauthorized } from "../utilities/navigation";
import { setSuccessMessage, setErrorMessage } from "./messageSlice";

const getPaymentArray = createAsyncThunk(
  "paymentArray/get",
  async (_, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/payment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse;
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue(data);
    }
  }
);

const deletePayment = createAsyncThunk(
  "paymentArray/delete",
  async (id, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/payment/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (response.ok) {
      dispatch(setSuccessMessage("Payment deleted successfully"));
      return true;
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue({ error });
    }
  }
);

const addPayment = createAsyncThunk(
  "paymentArray/add",
  async (payment, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payment),
    });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (response.ok) {
      let jsonResponse = await response.json();
      dispatch(setSuccessMessage("Payment added successfully"));
      return jsonResponse;
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue({ error });
    }
  }
);

const updatePayment = createAsyncThunk(
  "paymentArray/update",
  async (payment, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/payment/" + payment._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payment),
    });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (response.ok) {
      let jsonResponse = await response.json();
      dispatch(setSuccessMessage("Payment updated successfully"));
      return jsonResponse;
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue({ error });
    }
  }
);

export const paymentArraySlice = createSlice({
  name: "paymentArray",
  initialState: {
    value: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentArray.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = "success";
      })
      .addCase(deletePayment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = state.value.filter(
            (payment) => payment._id !== action.meta.arg
          );
        }
        state.status = "success";
      })
      .addCase(addPayment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        if (action.payload) {
          state.value.push(action.payload.newPayment);
        }
        state.status = "success";
      })
      .addCase(updatePayment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = state.value.map((payment) =>
            payment._id === action.payload._id ? action.payload : payment
          );
        }
        state.status = "success";
      })
      .addCase(getPaymentArray.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPaymentArray.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default paymentArraySlice.reducer;
export { getPaymentArray, deletePayment, addPayment, updatePayment };
