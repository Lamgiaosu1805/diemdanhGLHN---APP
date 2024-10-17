import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Utils from '../common/Utils'
import ItemOnlyTitle from '../components/ItemOnlyTitle'
import { useDispatch, useSelector } from 'react-redux'
import { addSheetDiemDanh, storeSheetDiemDanh } from '../redux/Silces/SheetDiemDanhSlice'

export default function ListSheetDiemDanhScreen({navigation}) {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedType, setSelectedType] = useState(1)
    const dispatch = useDispatch()

    const listSheet = useSelector(state => state.sheetDiemDanh)

    const getListSheet = async () => {
        try {
            const response = await axios.get(`${Utils.apiUrl}/diemdanh/getListSheetDiemDanh`, {
                headers: {
                    key: 'lamngonzai'
                }
            })
            const data = response.data
            if(data.status == true) {
                dispatch(storeSheetDiemDanh(data.data))
            }
            else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
            alert("Có lỗi khi get list sheet")
        }
    }

    const createSheetDiemDanh = async () => {
        try {
            const response = await axios.post(`${Utils.apiUrl}/diemdanh/createSheetDiemDanh`, {
                time: selectedType
            }, {
                headers: {
                    key: 'lamngonzai'
                }
            })
            const data = response.data
            if(data.status == true) {
                dispatch(addSheetDiemDanh(data.data))
                alert("Tạo phiếu điểm danh thành công")
                setModalVisible(false)
            }
            else {
                alert(`${data.message}`)
            }
        } catch (error) {
            console.log(error)
            alert("Có lỗi khi tạo phiếu điểm danh")
        }
    }

    useEffect(() => {
        getListSheet()
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Header title={"Danh sách điểm danh"}/>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType='fade'
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={{backgroundColor: selectedType == 1 ? '#8db1eb' : 'white', padding: 12, borderRadius: 8}} onPress={() => {setSelectedType(1)}}>
                                    <Text>Sáng</Text>
                                </TouchableOpacity>
                                <View style={{width: 20}}>

                                </View>
                                <TouchableOpacity style={{backgroundColor: selectedType == 2 ? '#8db1eb' : 'white', padding: 12, borderRadius: 8}} onPress={() => {setSelectedType(2)}}>
                                    <Text>Chiều</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 12, backgroundColor: 'red', marginTop: 20, borderRadius: 12}} onPress={createSheetDiemDanh}>
                                <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
            <View style={{marginTop: 20, paddingHorizontal: 16}}>
                <TouchableOpacity style={{paddingHorizontal: 8, paddingVertical: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 20, backgroundColor: '#8db1eb', width: 200, borderRadius: 16, alignSelf: 'center'}} activeOpacity={0.6} onPress={() => setModalVisible(true)}>
                    <Text>Tạo phiếu điểm danh</Text>
                </TouchableOpacity>
                {
                    listSheet.map((item) => (
                        <ItemOnlyTitle title={Utils.parseDayTime(item.time) + ' - ' + Utils.formatDate(item.createdAt) + `${item.status == 0 ? "" : item.status == 1 ? " - Đã lưu" : " - Đã chốt"}`} key={item._id} style={styles.itemTitle} onPress={() => navigation.navigate('DiemDanhScreen', {idSheet: item._id, title: Utils.parseDayTime(item.time) + ' - ' + Utils.formatDate(item.createdAt) + `${item.status == 0 ? "" : item.status == 1 ? " - Đã lưu" : " - Đã chốt"}`, statusSheet: item.status})}/>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemTitle: {
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(126, 123, 123, 0.7)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
        width: Dimensions.get('window').width - 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingVertical: 20
    },
})