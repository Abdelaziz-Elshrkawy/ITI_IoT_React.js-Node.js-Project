import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { REACT_APP_SERVER_URL } from '../env'
import axios from 'axios'

export const getPosts = createAsyncThunk('post/get-all', async (_args, thunkAPI) => {
    try {
        const data = await axios.get(`${REACT_APP_SERVER_URL}/post`)
        console.log(data)
        return data.data
    } catch (err) {
        thunkAPI.rejectWithValue(err.message)
    }
})
export const addPost = createAsyncThunk('/post/addPost', async ({ token, data }, thunkAPI) => {
    console.log(data)
    try {
        const newPost = await axios.post(`${REACT_APP_SERVER_URL}/post`, JSON.stringify(data), {
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + token
            }
        })
        return newPost
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