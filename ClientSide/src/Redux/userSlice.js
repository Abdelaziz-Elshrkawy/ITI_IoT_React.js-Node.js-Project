import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { REACT_APP_SERVER_URL } from '../env'
import axios from 'axios'

export const signUp = createAsyncThunk('/user/signup', async (form, thunkAPI) => {
    console.log(form)
    try {
        console.log(REACT_APP_SERVER_URL)
        const singUpResponse = await axios.post(`${REACT_APP_SERVER_URL}/user`, JSON.stringify(form), {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log(singUpResponse)
        return singUpResponse.data
    } catch (err) {
        console.log(err)
        thunkAPI.rejectWithValue(err)
    }
})
export const login = createAsyncThunk('/user/login', async (data, thunkAPI) => {
    console.log(REACT_APP_SERVER_URL)
    try {
        const loginResponse = await axios.post(`${REACT_APP_SERVER_URL}/user/login`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(loginResponse)
        return loginResponse.data
    } catch (err) {
        console.log(err)
        thunkAPI.rejectWithValue(err)
    }

})

export const auth = createAsyncThunk('/user/auth', async (token, thunkAPI) => {
    try {

        const loginResponse = await fetch(`${REACT_APP_SERVER_URL}/user/auth`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + token
            }
        })
        const res = await loginResponse.json()
        console.log(res)
        return res
    } catch (err) {
        thunkAPI.rejectWithValue(err)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        signup: {
            singUpResponse: null,
        },
        login: {
            loginStatus: false,
            loginResponse: null
        },
        auth: null
    },
    reducer: {},
    extraReducers: {
        [signUp.fulfilled]: (stat, action) => {
            stat.signup.singUpResponse = action.payload
        },
        [login.fulfilled]: (stat, action) => {
            stat.login.loginResponse = action.payload
            stat.login.singUpStatus = true
        },
        [auth.fulfilled]: (stat, action) => {
            stat.auth = action
        }
    }
})

export default userSlice.reducer;