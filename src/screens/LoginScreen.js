import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function LoginScreen({navigation}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const login = () => {
        if(username == "lamngonzai" && password == "nghiemlamhust1") {
            navigation.replace('HomeScreen')
        }
        else {
            alert("Sai tài khoản hoặc mật khẩu")
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>Điểm danh lớp GLHN</Text>
            <View style={{marginTop: 20}}>
                <TextInput style={{width: 300, height: 40, borderBottomWidth: 1}} placeholder='Username' onChangeText={(value) => setUsername(value)} autoCapitalize='none'/>
                <TextInput style={{width: 300, height: 40, borderBottomWidth: 1, marginTop: 20}} placeholder='Password' secureTextEntry={true} onChangeText={(val) => setPassword(val)}/>
            </View>
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 240, height: 50, backgroundColor: 'red', marginTop: 40, borderRadius: 8}} onPress={login}>
                <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})