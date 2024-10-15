import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function ItemOnlyTitle({title, onPress}) {
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.6} onPress={onPress}>
        <Text style={{fontSize: 16, fontWeight: '400'}}>{title}</Text>
    </TouchableOpacity>
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
    },
})