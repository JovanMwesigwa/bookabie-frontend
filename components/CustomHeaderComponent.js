import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'


const CustomHeaderComponent = ({ navigateBack }) => {

const { container } = styles
 return(
    <View>

    <View style={{...styles.headerContainer }}>
      <TouchableOpacity onPress={() => navigateBack()} >
        <AntDesign name="leftcircleo" size={26} color="black" />
      </TouchableOpacity>
      <Text style={{...GlobalStyles.headerText, color: 'black', fontWeight: '500', fontSize: 18, paddingHorizontal: 18}}>BookABuy</Text>
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',   
    paddingHorizontal: 15, 
    elevation: 2, 
    height: 55, 
    borderBottomWidth: 5, 
    borderBottomColor: '#B83227',
  },
})
export default CustomHeaderComponent