import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header({title}) {
    return (
        <View style={{backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', paddingVertical: 20}}>
            <SafeAreaView>
                <Text style={{fontSize: 20, fontWeight: '800', color: 'white'}}>{title}</Text>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({})