import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const thunk = createAsyncThunk('/user/login', async (_args, thunkAPI) => {
    try {
        userData = await fetch('')
    } catch (err) {
        return err
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null },
    reducer: {}
})

export default userSlice.reducer;