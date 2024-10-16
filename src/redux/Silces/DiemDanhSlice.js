import { createSlice } from "@reduxjs/toolkit";

const diemDanh = createSlice({
    name: 'diemDanh',
    initialState: [],
    /*
        state có dạng:
        {
            idSheet: "abcxyz",
            listMember: [
                {
                    idMember: "sfsfsdf",
                    fullname: "Nghiêm K Lâm",
                    status: 1 //1: Đã điểm danh, 0: Nghỉ
                }
            ]
        }
    */
    reducers: {
        storeListDiemDanh: (state, action) => {
            state.push(action.payload)
        },
        onPressMemberItem: (state, action) => {
            const sheet = state.find(e => e.idSheet == action.payload.idSheet)
            const selectedIndex = sheet.listMember.findIndex((e) => e.idMember == action.payload.member.idMember)
            if(sheet.listMember[selectedIndex].status == 1) {
                sheet.listMember[selectedIndex].status = 0
            }
            else {
                sheet.listMember[selectedIndex].status = 1
            }
            return state
        }
    }
})

const {reducer, actions} = diemDanh
export const { storeListDiemDanh, onPressMemberItem } = actions
export default reducer