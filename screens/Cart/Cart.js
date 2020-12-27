import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomHeaderComponent from '../../components/CustomHeaderComponent'


const Cart = ({navigation}) => {

  const navigateBack = () => {
    navigation.goBack()
  }

const { container } = styles
 return(
  <View style={container}>
    <CustomHeaderComponent navigateBack={navigateBack} />
    <Text>Cart</Text>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,

  }
})
export default Cart