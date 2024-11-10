import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Utils from '../common/Utils'
import ItemOnlyTitle from '../components/ItemOnlyTitle'

export default function ListMemberScreen() {
  const [listMember, setListMember] = useState([])

  const getListMember = async () => {
    try {
      const response = await axios.get(`${Utils.apiUrl}/member/getMember`, {
        headers: {
          key: 'lamngonzai'
        }
      })
      const data = response.data
      if(data.status == true) {
        setListMember(data.data)
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
    getListMember()
  }, [])

  return (
    <View style={{flex:1, backgroundColor: 'white'}}>
      <Header title={"Danh sách thành viên"}/>
      <ScrollView>
        <View style={{marginTop: 20, paddingHorizontal: 16, marginBottom: 20}}>
          {
            listMember.map((item, index) => (
              <ItemOnlyTitle title={index+1 + '. ' + item.fullname} key={item._id}/>
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})