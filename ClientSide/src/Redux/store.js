import {configureStore} from '@reduxjs/toolkit'
import user from './userSlice'
import post from './postSlice'
export default configureStore({
    reducer: {
        user,
        post
    }
})