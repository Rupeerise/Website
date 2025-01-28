import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleUnauthorized } from "../utilities/navigation";

const getTagArray = createAsyncThunk("tagArray/get", async () => {
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
    return jsonResponse;
  } else {
    console.log("HTTP-Error: " + response.status);
    return [];
  }
});

const deleteTag = createAsyncThunk("tagArray/delete", async (id) => {
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
    return id;
  } else {
    console.log("HTTP-Error: " + response.status);
    return false;
  }
});

const addTag = createAsyncThunk("tagArray/add", async (tag) => {
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
    return jsonResponse;
  } else {
    console.log("HTTP-Error: " + response.status);
    return false;
  }
});

const addTarget = createAsyncThunk("tagArray/addTarget", async (form) => {
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
    return jsonResponse;
  } else {
    console.log("HTTP-Error: " + response.status);
    console.log(response);
    return false;
  }
});

const updateTarget = createAsyncThunk("tagArray/updateTarget", async (form) => {
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
    return jsonResponse;
  } else {
    console.log("HTTP-Error: " + response.status);
    console.log(response);
    return false;
  }
});

const updateTag = createAsyncThunk("tagArray/updateTag", async (tag) => {
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
    return jsonResponse;
  } else {
    console.log("HTTP-Error: " + response.status);
    return false;
  }
});

export const tagArraySlice = createSlice({
  name: "tagArray",
  initialState: {
    value: [],
    status: "not_loaded",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTagArray.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = "loaded";
      })
      .addCase(getTagArray.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTagArray.rejected, (state, action) => {
        state.status = "not_loaded";
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        console.log(action.payload);
        state.value = state.value.filter((tag) => tag._id !== action.payload);
        state.status = "loaded";
      })
      .addCase(deleteTag.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.status = "not_loaded";
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.value.push(action.payload.newTag);
        state.status = "loaded";
      })
      .addCase(addTag.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTag.rejected, (state, action) => {
        state.status = "not_loaded";
      })
      .addCase(addTarget.fulfilled, (state, action) => {
        const index = state.value.findIndex(
          (tag) => tag._id === action.payload.newTarget.tagid
        );
        if (index !== -1) {
          state.value[index].targets.push(action.payload.newTarget);
        }
      })
      .addCase(addTarget.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTarget.rejected, (state, action) => {
        state.status = "not_loaded";
      })
      .addCase(updateTarget.fulfilled, (state, action) => {
        const index = state.value.findIndex(
          (tag) => tag._id === action.payload.updateTarget.tagid
        );
        if (index !== -1) {
          const targetIndex = state.value[index].targets.findIndex(
            (target) => target._id === action.payload.updateTarget._id
          );
          if (targetIndex !== -1) {
            state.value[index].targets[targetIndex] =
              action.payload.updateTarget;
          }
        }
      })
      .addCase(updateTarget.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTarget.rejected, (state, action) => {
        state.status = "not_loaded";
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        const index = state.value.findIndex(
          (tag) => tag._id === action.payload.updateTag._id
        );
        if (index !== -1) {
          state.value[index] = action.payload.updateTag;
        }
      })
      .addCase(updateTag.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.status = "not_loaded";
      });
  },
});

export default tagArraySlice.reducer;
export { getTagArray, deleteTag, addTag, addTarget, updateTarget, updateTag };
