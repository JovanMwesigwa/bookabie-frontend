import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

import {MainHeaderComponent} from '../../components'

const NotificationsScreen = () => {
  return (
    <View>
        <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
        <MainHeaderComponent />
      <Text></Text>
    </View>
  )
}
const styles = StyleSheet.create({

})

export default NotificationsScreen

