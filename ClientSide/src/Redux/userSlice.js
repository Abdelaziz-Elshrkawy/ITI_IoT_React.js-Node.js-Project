import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { REACT_APP_SERVER_URL } from '../env'


export const signUp = createAsyncThunk('/user/signup', async (form, thunkAPI) => {
    console.log(JSON.stringify(form))
    try {
        console.log(REACT_APP_SERVER_URL)
        const singUpResponse = await fetch(`${REACT_APP_SERVER_URL}/user?timestamp=${Date.now()}`, {
            mode: "no-cors",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        return await singUpResponse.json()
    } catch (err) {
        return err
    }
})
export const login = createAsyncThunk('/user/login', async (data, thunkAPI) => {
    console.log(REACT_APP_SERVER_URL)
    try {
        const loginResponse = await fetch(`${REACT_APP_SERVER_URL}/user/login?timestamp=${Date.now()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await loginResponse.json()
        console.log(res)
        return res
    } catch (err) {
        return err
    }

})

export const auth = createAsyncThunk('/user/auth', async (token, thunkAPI) => {
    try {

        const loginResponse = await fetch(`${REACT_APP_SERVER_URL}/user/auth?timestamp=${Date.now()}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + token
            }
        })
        const res = await loginResponse.json()
        console.log(res)
        return res
    } catch (err) {
        return err
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