import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Utils from '../common/Utils'
import { onPressMemberItem, storeListDiemDanh } from '../redux/Silces/DiemDanhSlice'
import ItemOnlyTitle from '../components/ItemOnlyTitle'

export default function DiemDanhScreen({route}) {
    const dispatch = useDispatch()
    var listSheetMemberDiemDanh = useSelector(state => state.diemDanh)
    const { idSheet } = route.params

    const currentSheet = listSheetMemberDiemDanh.find(item => item.idSheet == idSheet)
    const listMember = currentSheet?.listMember || []

    const handlePressItem = (item) => {
        dispatch(onPressMemberItem({
            idSheet,
            member: item
        }))
    }

    const softSubmit = async () => {
        try {
            const response = await axios.post(`${Utils.apiUrl}/diemdanh/sortSubmit`, {
                idSheet,
                listThanhVien: listMember
            }, {
                headers: {
                    key: 'lamngonzai'
                }
            })
            const data = response.data
            if(data.status == true) {

            }
            alert(data.message)
        } catch (error) {
            alert("Có lỗi khi lưu điểm danh")
        }
    }

    const getListMember = async () => {
        try {
            const response = await axios.get(`${Utils.apiUrl}/member/getMember`, {
                headers: {
                key: 'lamngonzai'
                }
            })
            const data = response.data
            if(data.status == true) {
                const diemDanhMember = data.data.map((item) => {
                    return {
                        idMember: item._id,
                        fullname: item.fullname,
                        status: 0
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
                    {
                        listMember.map((item, index) => {
                            return (
                                <ItemOnlyTitle title={`${index+1}. ${item.fullname}`} key={item.idMember} onPress={() => handlePressItem(item)} buttonStyle={item.status == 1 && styles.selectedItem}/>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <View style={{flexDirection: 'row', marginBottom: 40, alignSelf: 'center'}}>
                <TouchableOpacity style={{backgroundColor: '#bee09d', padding: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16}} activeOpacity={0.7} onPress={softSubmit}>
                    <Text>Lưu điểm danh</Text>
                </TouchableOpacity>
                <View style={{width: 32}}></View>
                <TouchableOpacity style={{backgroundColor: '#e6b491', padding: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16}} activeOpacity={0.7}>
                    <Text>Khoá điểm danh</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selectedItem: {
        backgroundColor: '#e38d8d'
    }
})