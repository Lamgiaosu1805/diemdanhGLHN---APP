import { Alert, Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import Utils from '../common/Utils';
import ItemOnlyTitle from '../components/ItemOnlyTitle';

export default function HomeScreen({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [fullname, setFullname] = useState('')

    const addMember = async () => {
        try {
            if(fullname == '') {
                alert('Họ và tên không được bỏ trống')
            }
            else {
                const response = await axios.post(`${Utils.apiUrl}/member/createMember`, {
                    fullname: fullname,
                }, {
                    headers: {
                        key: "lamngonzai"
                    }
                })
                const data = response.data
                alert(`${data.message}`)
                if(data.status == true) {
                    setFullname('')
                }
            }
        } catch (error) {
            console.log(error)
            alert("Có lỗi khi thêm thành viên")
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
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
                            <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Thêm thành viên</Text>
                            <TextInput style={{width: Dimensions.get('window').width * 0.7, borderBottomWidth: 1, fontSize: 16, marginTop: 20, height: 32}} placeholder='Tên thánh (nếu có) Họ và tên' placeholderTextColor={'rgba(179, 179, 179, 1)'} value={fullname} onChangeText={(val) => setFullname(val)}/>
                            <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 12, backgroundColor: 'red', marginTop: 20, borderRadius: 12}} onPress={addMember}>
                                <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Header title={"Trang chủ"} />
            <ScrollView>
                <View style={{marginTop: 20, paddingHorizontal: 16}}>
                    <ItemOnlyTitle title={"Danh sách lớp"} onPress={() => navigation.navigate('ListMemberScreen')}/>
                    <ItemOnlyTitle title={"Thêm thành viên"} onPress={() => setModalVisible(true)} />
                    <ItemOnlyTitle title={"Điểm danh"} onPress={() => navigation.navigate("ListSheetDiemDanhScreen")}/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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