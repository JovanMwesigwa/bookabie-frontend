import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const Notifications = (props) => {

const { container } = styles
 return(
  <View style={container}>
    <Text>Notifications</Text>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  }
})
export default Notifications