import { configureStore } from '@reduxjs/toolkit'
import { counterReducer, modalReducer } from '@/store/index'

export default configureStore({
    reducer:{
        state:counterReducer,
        modal:modalReducer
    }
})