import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: { posts: null },
    reducer: {}
})

export default postSlice.reducer;