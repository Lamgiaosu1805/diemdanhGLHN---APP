import { configureStore } from '@reduxjs/toolkit'
import diemDanhReducer from './Silces/DiemDanhSlice'
import sheetDiemDanhReducer from './Silces/SheetDiemDanhSlice'
const rootReducer = {
    diemDanh: diemDanhReducer,
    sheetDiemDanh: sheetDiemDanhReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store