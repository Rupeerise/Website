import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleUnauthorized } from "../utilities/navigation";
import { setSuccessMessage, setErrorMessage } from "./messageSlice";

const getTagArray = createAsyncThunk(
  "tagArray/get",
  async (_, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/tag", {
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
      return { data: jsonResponse };
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue(data);
    }
  }
);

const deleteTag = createAsyncThunk(
  "tagArray/delete",
  async (id, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/tag/" + id, {
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
      dispatch(setSuccessMessage("Tag deleted successfully"));
      return { id: id };
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue({ error });
    }
  }
);

const addTag = createAsyncThunk(
  "tagArray/add",
  async (tag, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(tag),
    });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (response.ok) {
      let jsonResponse = await response.json();
      dispatch(setSuccessMessage("Tag added successfully"));
      return { data: jsonResponse };
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue({ error });
    }
  }
);

const addTarget = createAsyncThunk(
  "tagArray/addTarget",
  async (form, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/target", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (response.ok) {
      let jsonResponse = await response.json();
      dispatch(setSuccessMessage("Target added successfully"));
      return { data: jsonResponse };
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue({ error });
    }
  }
);

const updateTarget = createAsyncThunk(
  "tagArray/updateTarget",
  async (form, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/target", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (response.ok) {
      let jsonResponse = await response.json();
      dispatch(setSuccessMessage("Target updated successfully"));
      return { data: jsonResponse };
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue({ error });
    }
  }
);

const updateTag = createAsyncThunk(
  "tagArray/updateTag",
  async (tag, { dispatch, rejectWithValue }) => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/tag/" + tag._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(tag),
    });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (response.ok) {
      let jsonResponse = await response.json();
      dispatch(setSuccessMessage("Tag updated successfully"));
      return { data: jsonResponse };
    } else {
      const error = await response.json();
      dispatch(
        setErrorMessage({ message: error.message, status: response.status })
      );
      return rejectWithValue({ error });
    }
  }
);

export const tagArraySlice = createSlice({
  name: "tagArray",
  initialState: {
    value: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTagArray.fulfilled, (state, action) => {
        state.value = action.payload.data;
        state.status = "success";
      })
      .addCase(getTagArray.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTagArray.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        console.log(action.payload);
        state.value = state.value.filter(
          (tag) => tag._id !== action.payload.id
        );
        state.status = "success";
      })
      .addCase(deleteTag.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.value.push(action.payload.data.newTag);
        state.status = "success";
      })
      .addCase(addTag.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTag.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addTarget.fulfilled, (state, action) => {
        const index = state.value.findIndex(
          (tag) => tag._id === action.payload.data.newTarget.tagid
        );
        if (index !== -1) {
          state.value[index].targets.push(action.payload.data.newTarget);
        }
        state.status = "success";
      })
      .addCase(addTarget.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTarget.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateTarget.fulfilled, (state, action) => {
        const index = state.value.findIndex(
          (tag) => tag._id === action.payload.data.updateTarget.tagid
        );
        if (index !== -1) {
          const targetIndex = state.value[index].targets.findIndex(
            (target) => target._id === action.payload.data.updateTarget._id
          );
          if (targetIndex !== -1) {
            state.value[index].targets[targetIndex] =
              action.payload.data.updateTarget;
          }
        }
        state.status = "success";
      })
      .addCase(updateTarget.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTarget.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        const index = state.value.findIndex(
          (tag) => tag._id === action.payload.data.updateTag._id
        );
        if (index !== -1) {
          state.value[index] = action.payload.data.updateTag;
        }
        state.status = "success";
      })
      .addCase(updateTag.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default tagArraySlice.reducer;
export { getTagArray, deleteTag, addTag, addTarget, updateTarget, updateTag };
