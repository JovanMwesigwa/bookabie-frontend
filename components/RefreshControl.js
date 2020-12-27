import React from 'react'
import { View, Text, StyleSheet, RefreshControl } from 'react-native'


const RefreshComponent = (props) => {

const { container } = styles

 return(
  <View style={container}>
    <Text>RefreshComponent</Text>
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
export default RefreshComponent