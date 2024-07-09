import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getTagArray = createAsyncThunk("tagArray/get", async () => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/tag", {
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

const deleteTag = createAsyncThunk("tagArray/delete", async (id) => {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;
  let response = await fetch(backendUrl + "/tag/" + id, {
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
  console.log(response);
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTagArray.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.value = state.value.filter((tag) => tag._id !== action.payload);
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.value.push(action.payload.newTag);
      })
      .addCase(addTarget.fulfilled, (state, action) => {
        const index = state.value.findIndex(
          (tag) => tag._id === action.payload.newTarget.tagid
        );
        if (index !== -1) {
          state.value[index].targets.push(action.payload.newTarget);
        }
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
      .addCase(updateTag.fulfilled, (state, action) => {
        const index = state.value.findIndex(
          (tag) => tag._id === action.payload.updateTag._id
        );
        if (index !== -1) {
          state.value[index] = action.payload.updateTag;
        }
      });
  },
});

export default tagArraySlice.reducer;
export { getTagArray, deleteTag, addTag, addTarget, updateTarget, updateTag };
