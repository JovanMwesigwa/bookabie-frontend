import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';


const OtherHeaderComponent = ({ name }) => {

    const navigation = useNavigation();

const { container } = styles
 return(
    <View>
      <View style={{...styles.headerContainer }}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <AntDesign name="arrowleft" size={24} color={GlobalStyles.darkFontColor.color} />
        </TouchableOpacity>
        <Text style={{...GlobalStyles.headerText, color: GlobalStyles.darkFontColor.color, fontWeight: '500', fontSize: 18, paddingHorizontal: 18}}>{name}</Text>
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
    height: 45, 
  },
})
export default OtherHeaderComponent