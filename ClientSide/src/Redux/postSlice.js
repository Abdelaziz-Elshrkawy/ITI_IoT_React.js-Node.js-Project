import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { REACT_APP_SERVER_URL } from '../env'

export const getPosts = createAsyncThunk('post/get-all', async (_args, thunAPI) => {
    const {rejectWithValue}  = thunAPI
    try {
        const data = await fetch(`${REACT_APP_SERVER_URL}/post?timestamp=${Date.now()}`)
        return await data.json()
    } catch (err) {
        return rejectWithValue(err.message)
    }
})
export const addPost = createAsyncThunk('/post/addPost', async ({token, data}, thunkAPI) => {
    try {
        const newPost = await fetch(`${REACT_APP_SERVER_URL}/post?timestamp=${Date.now()}`, {
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