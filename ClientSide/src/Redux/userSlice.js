import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { server_url } from '../components/singlepost/SinglePost'


export const signUp = createAsyncThunk('/user/signup', async (form, thunkAPI) => {
    try {
        const singUpResponse = await fetch(`${server_url}/user`, {
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
    console.log(server_url)
    try {
        const loginResponse = await fetch(`${server_url}/user/login`, {
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
        const loginResponse = await fetch(`${server_url}/user/auth`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer '+token
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