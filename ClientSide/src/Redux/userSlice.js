import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REACT_APP_SERVER_URL } from "../env";
import axios from "axios";

export const signUp = createAsyncThunk(
  "/user/signup",
  async (form, thunkAPI) => {
    console.log(form);
    try {
      console.log(REACT_APP_SERVER_URL);
      const singUpResponse = await axios.post(
        `${REACT_APP_SERVER_URL}/user`,
        JSON.stringify(form),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(singUpResponse);
      return singUpResponse.data;
    } catch (err) {
      console.log(err);
      thunkAPI.rejectWithValue(err);
    }
  }
);
export const login = createAsyncThunk("/user/login", async (data, thunkAPI) => {
  console.log(REACT_APP_SERVER_URL);
  try {
    const loginResponse = await axios.post(
      `${REACT_APP_SERVER_URL}/user/login`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(loginResponse);
    return loginResponse.data;
  } catch (err) {
    console.log(err);
    return err.response;
  }
});

export const auth = createAsyncThunk("/user/auth", async (token, thunkAPI) => {
  try {
    const loginResponse = await fetch(`${REACT_APP_SERVER_URL}/user/auth`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const res = await loginResponse.json();
    console.log(res);
    return res;
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    signup: {
      singUpResponse: null,
    },
    login: {
      loginStatus: false,
      loginResponse: null,
    },
    auth: null,
  },
  reducers: {
    clearSignUpResponse: (state) => {
      state.signup.singUpResponse = null;
    },
  },
  extraReducers: {
    [signUp.fulfilled]: (state, action) => {
      state.signup.singUpResponse = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.login.loginResponse = action.payload;
      state.login.loginStatus = true;
    },
    [auth.fulfilled]: (state, action) => {
      state.auth = action;
    },
  },
});

export const { clearSignUpResponse } = userSlice.actions;
export default userSlice.reducer;
