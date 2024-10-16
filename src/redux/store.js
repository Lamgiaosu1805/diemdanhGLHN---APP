import { configureStore } from '@reduxjs/toolkit'
import diemDanhReducer from './Silces/DiemDanhSlice'
const rootReducer = {
    diemDanh: diemDanhReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store