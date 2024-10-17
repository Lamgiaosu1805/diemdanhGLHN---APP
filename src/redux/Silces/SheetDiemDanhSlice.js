import { createSlice } from "@reduxjs/toolkit";

const sheetDiemDanh = createSlice({
    name: 'sheetDiemDanh',
    initialState: [],
    reducers: {
        storeSheetDiemDanh: (state, action) => {
            state = action.payload
            return state
        },
        addSheetDiemDanh: (state, action) => {
            state.unshift(action.payload)
        },
        updateStatusSheet: (state, action) => {
            const item = state.find((e) => e._id == action.payload.sheetId)
            item.status = action.payload.newStatusSheet
            item.updatedAt = action.payload.updatedAt
            return state
        }
    }
})

const {reducer, actions} = sheetDiemDanh
export const { storeSheetDiemDanh, addSheetDiemDanh, updateStatusSheet } = actions
export default reducer