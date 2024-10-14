import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'

export default function HomeScreen() {
    const Item = ({title}) => (
        <TouchableOpacity style={styles.item} activeOpacity={0.6}>
            <Text style={{fontSize: 16, fontWeight: '400'}}>{title}</Text>
        </TouchableOpacity>
    )
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Header title={"Trang chủ"} />
            <ScrollView>
                <View style={{marginTop: 20, paddingHorizontal: 16}}>
                    <Item title={"Danh sách lớp"}/>
                    <Item title={"Thêm thành viên"}/>
                    <Item title={"Điểm danh"}/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 16
    }
})