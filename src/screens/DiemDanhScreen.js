import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Utils from '../common/Utils'
import { onPressMemberItem, storeListDiemDanh } from '../redux/Silces/DiemDanhSlice'
import ItemOnlyTitle from '../components/ItemOnlyTitle'
import { updateStatusSheet } from '../redux/Silces/SheetDiemDanhSlice'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function DiemDanhScreen({route}) {
    const dispatch = useDispatch()
    var listSheetMemberDiemDanh = useSelector(state => state.diemDanh)
    const listSheet = useSelector(state => state.sheetDiemDanh)
    const { idSheet, statusSheet } = route.params

    const currentSheetMember = listSheetMemberDiemDanh.find(item => item.idSheet == idSheet)
    const listMember = currentSheetMember?.listMember || []
    const currentSheet = listSheet?.find(item => item._id == idSheet)

    const handlePressItem = (item) => {
        dispatch(onPressMemberItem({
            idSheet,
            member: item
        }))
    }

    const downloadExcel = async () => {
        const uri = `${Utils.apiUrl}/diemdanh/genExcelFile/${idSheet}`; // API tải file Excel
        const response = await fetch(uri);
        const data = await response.text();
        const fileName = `DiemDanh.xlsx`;
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;

        try {
            // Ghi dữ liệu base64 vào file
            await FileSystem.writeAsStringAsync(fileUri, data, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Chia sẻ file với người dùng
            await Sharing.shareAsync(fileUri, {
                dialogTitle: 'Save Excel File',
                UTI: 'com.microsoft.excel.xls', // Định danh loại file cho Excel
            });
            // Alert.alert('Success', 'File has been saved and shared!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to save file.');
        }
    };

    const softSubmit = async () => {
        try {
            const response = await axios.post(`${Utils.apiUrl}/diemdanh/softSubmit`, {
                idSheet,
                listThanhVien: listMember
            }, {
                headers: {
                    key: 'lamngonzai'
                }
            })
            const data = response.data
            if(data.status == true) {
                dispatch(updateStatusSheet({
                    sheetId: idSheet,
                    newStatusSheet: 1,
                    updatedAt: data.data.updatedAt
                }))
            }
            alert(data.message)
        } catch (error) {
            alert("Có lỗi khi lưu điểm danh")
        }
    }

    const blockDiemDanh = async () => {
        try {
            const response = await axios.post(`${Utils.apiUrl}/diemdanh/blockDiemDanh`, {
                idSheet,
            }, {
                headers: {
                    key: 'lamngonzai'
                }
            })
            const data = response.data
            if(data.status == true) {
                dispatch(updateStatusSheet({
                    sheetId: idSheet,
                    newStatusSheet: 2,
                    updatedAt: data.data.updatedAt
                }))
            }
            alert(`${data.message}`)
        } catch (error) {
            console.log(error)
            alert('Chốt điểm danh thất bại')
        }
    }

    const getListMember = async () => {
        try {
            var response;
            if(statusSheet == 0) {
                response = await axios.get(`${Utils.apiUrl}/member/getMember`, {
                    headers: {
                        key: 'lamngonzai'
                    }
                })
            }
            else {
                response = await axios.get(`${Utils.apiUrl}/diemdanh/getListMemberDiemDanh/${idSheet}`, {
                    headers: {
                        key: 'lamngonzai'
                    }
                })
            }
            if(!response) {
                alert("Không thể lấy danh sách thành viên điểm danh")
                return
            }
            const data = response.data
            if(data.status == true) {
                const diemDanhMember = data.data.map((item) => {
                    return {
                        idMember: statusSheet == 0 ? item._id : item.infoThanhVien.idMember,
                        fullname: statusSheet == 0 ? item.fullname : item.infoThanhVien.fullname,
                        status: statusSheet == 0 ? 0 : item.status
                    }
                })
                const storeData = {
                    idSheet: idSheet,
                    listMember: diemDanhMember
                }
                dispatch(storeListDiemDanh(storeData))
            }
            else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
            alert('Có lỗi khi lấy danh sách member')
        }
    }
    
    useEffect(() => {
        const indexItem = listSheetMemberDiemDanh.findIndex((e) => e.idSheet == idSheet)
        if(indexItem == -1) {
            getListMember()
        }
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Header title={"Điểm danh"}/>
            <ScrollView>
                <View style={{marginTop: 20, paddingHorizontal: 16, marginBottom: 16}}>
                    <Text style={{marginBottom: 16, fontSize: 16}}>
                        {Utils.parseDayTime(currentSheet?.time) + ' - ' + Utils.formatDate(currentSheet?.createdAt) + `${currentSheet?.status == 0 ? "" : currentSheet?.status == 1 ? " - Đã lưu" : " - Đã chốt"}`}
                    </Text>
                    <Text style={{marginBottom: 16, fontSize: 16}}>
                        {"Cập nhật lần cuối" + ' - ' + Utils.formatDateTime(currentSheet?.updatedAt)}
                    </Text>
                    {
                        listMember.map((item, index) => {
                            return (
                                <ItemOnlyTitle title={`${index+1}. ${item.fullname}`} key={index.toString()} onPress={() => {currentSheet.status == 2 ? null : handlePressItem(item)}} buttonStyle={item.status == 1 && styles.selectedItem}/>
                            )
                        })
                    }
                </View>
            </ScrollView>
            {
                currentSheet.status != 2
                ?
                <View style={{flexDirection: 'row', marginBottom: 32, alignSelf: 'center'}}>
                    <TouchableOpacity style={{backgroundColor: '#bee09d', padding: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16}} activeOpacity={0.7} onPress={softSubmit}>
                        <Text>Lưu điểm danh</Text>
                    </TouchableOpacity>
                    <View style={{width: 32}}></View>
                    <TouchableOpacity style={{backgroundColor: '#e6b491', padding: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16}} activeOpacity={0.7} onPress={blockDiemDanh}>
                        <Text>Chốt điểm danh</Text>
                    </TouchableOpacity>
                </View>
                :
                <TouchableOpacity style={{backgroundColor: '#e6b491', padding: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16}} activeOpacity={0.7} onPress={downloadExcel}>
                    <Text>Lưu danh sách điểm danh</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    selectedItem: {
        backgroundColor: '#e38d8d'
    }
})