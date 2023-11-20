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
      console.log(form, singUpResponse);
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

export const auth = createAsyncThunk("/user/auth", async (_, thunkAPI) => {
  try {
    const loginResponse = await axios.post(
      `${REACT_APP_SERVER_URL}/user/auth`,
      JSON.stringify({auth:'auth'}),
      {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("current_token")
        },
      }
    );
    const res = await loginResponse.json();
    console.log(res);
    return res;
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err)
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    signup: {
      singUpResponse: null,
    },
    login: {
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
    },
    [auth.fulfilled]: (state, action) => {
      state.auth = action.payload;
    },
    [auth.rejected]: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { clearSignUpResponse } = userSlice.actions;
export default userSlice.reducer;
