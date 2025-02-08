import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleUnauthorized } from "../utilities/navigation";
import { setSuccessMessage, setErrorMessage } from "./messageSlice";

const getLoanArray = createAsyncThunk(
  "loanArray/getLoanArray",
  async (_, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/loan", {
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
      dispatch(setErrorMessage(error.message));
      return rejectWithValue(error);
    }
  }
);

const deleteLoan = createAsyncThunk(
  "loanArray/deleteLoan",
  async (id, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/loan/" + id, {
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
      dispatch(setSuccessMessage("Loan deleted successfully"));
      return id;
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue(error);
    }
  }
);

const addLoan = createAsyncThunk(
  "loanArray/addLoan",
  async (loan, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/loan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loan),
    });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (response.ok) {
      let jsonResponse = await response.json();
      dispatch(setSuccessMessage("Loan added successfully"));
      return jsonResponse;
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue(error);
    }
  }
);

const updateLoan = createAsyncThunk(
  "loanArray/updateLoan",
  async (loan, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/loan/" + loan._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loan),
    });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (response.ok) {
      let jsonResponse = await response.json();
      dispatch(setSuccessMessage("Loan updated successfully"));
      return jsonResponse;
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue(error);
    }
  }
);

export const loanArraySlice = createSlice({
  name: "loanArray",
  initialState: {
    value: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoanArray.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = "success";
      })
      .addCase(getLoanArray.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getLoanArray.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.value = state.value.filter((loan) => loan._id !== action.payload);
        state.status = "success";
      })
      .addCase(deleteLoan.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteLoan.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addLoan.fulfilled, (state, action) => {
        state.value.push(action.payload.newLoan);
        state.status = "success";
      })
      .addCase(addLoan.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addLoan.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        state.value = state.value.map((loan) =>
          loan._id === action.payload.updateLoan._id
            ? action.payload.updateLoan
            : loan
        );
        state.status = "success";
      })
      .addCase(updateLoan.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateLoan.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default loanArraySlice.reducer;
export { getLoanArray, deleteLoan, addLoan, updateLoan };
