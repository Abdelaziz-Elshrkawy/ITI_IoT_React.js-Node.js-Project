import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const signUp = createAsyncThunk('/user/login', async ({ name, email, password }, thunkAPI) => {
    console.log(`${name} ${email} ${password}`)
    try {
        const singUpResponse = await fetch('http://localhost:3500/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        return await singUpResponse.json()
    } catch (err) {
        return err
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        singUpResponse: null
    },
    reducer: {},
    extraReducers: {
        [signUp.pending]: (stat,action) => {
            
        },
        [signUp.fulfilled]: (stat,action) => {
            stat.singUpResponse = action.payload
        },
        [signUp.rejected]: (stat,action) => {
            
        },
    }
})

export default userSlice.reducer;