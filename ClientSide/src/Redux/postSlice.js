import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getPosts = createAsyncThunk('post/get-all', async (_args, thunAPI) => {
    const {rejectWithValue}  = thunAPI
    try {
        const data = await fetch('http://localhost:3500/post')
        return await data.json()
    } catch (err) {
        return rejectWithValue(err.message)
    }
})
export const addPost = createAsyncThunk('/user/auth', async ({token, data}, thunkAPI) => {
    try {
        const newPost = await fetch('http://localhost:3500/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer '+token
            },
            body: JSON.stringify(data)
        })
        return await newPost.json()
    } catch (err) {
        thunkAPI.rejectWithValue(err)
    }
})
const postSlice = createSlice({
    name: 'post',
    initialState: {
        allPosts: null,
        newPost: {
            newPostResponse: null,
            newPostStatus: false
        }
    },
    reducer: {},
    extraReducers: {
        [getPosts.fulfilled]: (stat, action) => {
            stat.allPosts = action.payload
        },
        [addPost.fulfilled]: (stat, action) => {
            stat.newPost.newPostResponse = action.payload
            stat.newPost.newPostStatus = true
        }
    }
})

export default postSlice.reducer;