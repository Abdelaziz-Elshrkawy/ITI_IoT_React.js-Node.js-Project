import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getPosts = createAsyncThunk('post/get', async (_args, thunAPI) => {
    const {rejectWithValue}  = thunAPI
    try {
        const data = await fetch('http://localhost:3500/post')
        return await data.json()
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

const postSlice = createSlice({
    name: 'post',
    initialState: {
        loading: true,
        posts: null
    },
    reducer: {},
    extraReducers: {
        [getPosts.pending]: (stat, action) => {
        },
        [getPosts.fulfilled]: (stat, action) => {
            stat.loading = false
            stat.posts = action.payload
            console.l
        },
        [getPosts.rejected]: (stat, action) => {
        },
    }
})

export default postSlice.reducer;