import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REACT_APP_SERVER_URL } from "../env";
import axios from "axios";
const userId = JSON.parse(localStorage.getItem("current_user"))?.user._id;
const token = "Bearer " + localStorage.getItem("current_token");

export const getPosts = createAsyncThunk(
  "post/get-all",
  async (_args, thunkAPI) => {
    try {
      const data = await axios.get(`${REACT_APP_SERVER_URL}/post`);
      console.log(data);
      return data.data;
    } catch (err) {
      return err;
    }
  }
);
export const getUserPosts = createAsyncThunk(
  "post/get-user-posts",
  async (user, thunkAPI) => {
    try {
      console.log(token);
      const data = await axios.get(
        `${REACT_APP_SERVER_URL}/post/${userId ? userId : 123456}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(data);
      return data.data;
    } catch (err) {
      return err;
    }
  }
);
export const addPost = createAsyncThunk(
  "/post/add-post",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const newPost = await axios.post(
        `${REACT_APP_SERVER_URL}/post`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      console.log(newPost);
      return newPost.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);
export const editPost = createAsyncThunk(
  "post/edit-post",
  async ({ postId, data }, thunkAPI) => {
    try {
      console.log(postId);
      const editResponse = await axios.put(
        `${REACT_APP_SERVER_URL}/post/${userId}/${postId}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      console.log(editResponse);
      return editResponse.data;
    } catch (err) {
      return err;
    }
  }
);
export const deletePost = createAsyncThunk(
  "post/edit-post",
  async (postId, thunkAPI) => {
    try {
      console.log(postId);
      const deleteResponse = await axios.delete(
        `${REACT_APP_SERVER_URL}/post/${userId}/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      console.log(deleteResponse);
      return deleteResponse.data;
    } catch (err) {
      return err;
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: null,
    newPost: {
      newPostResponse: null,
      newPostStatus: false,
    },
    userPosts: null,
    editResponse: null,
  },
  reducers: {
    clearPostResponse: (state) => {
      state.newPost.newPostResponse = { response: "" };
      state.newPost.newPostStatus = false;
    },
    clearEditResponse: (state) => {
      state.editResponse = null;
    },
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.allPosts = action.payload;
    },
    [addPost.fulfilled]: (state, action) => {
      state.newPost.newPostResponse = action.payload;
      state.newPost.newPostStatus = true;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.userPosts = action.payload;
    },
    [editPost.fulfilled]: (state, action) => {
      state.editResponse = action.payload;
    },
  },
});

export const { clearPostResponse } = postSlice.actions;
export default postSlice.reducer;
