import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import SecondaryHeader from '../../components/SecondaryHeader'

const NotificationsComponent = () => {
  return (
    <View>
        <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
      <SecondaryHeader />
      <Text></Text>
    </View>
  )
}

export default NotificationsComponent

const styles = StyleSheet.create({

})
