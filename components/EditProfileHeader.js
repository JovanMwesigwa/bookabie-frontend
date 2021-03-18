import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';


const EditProfileHeader = ({submitHandler}) => {

    const navigation = useNavigation();

const { container } = styles
 return(
    <View>
    <View style={{...styles.headerContainer }}>
      <View>
        <Text style={{...GlobalStyles.headerText, color: '#B83227', fontWeight: '500', fontSize: 15, paddingHorizontal: 10}}>Edit Profile</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} >
      <Text style={{...GlobalStyles.headerText, color: '#333945', fontWeight: '500', fontSize: 15, paddingHorizontal: 10}}>Cancel</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    backgroundColor: 'white',   
    paddingHorizontal: 15,
    borderBottomWidth: 0.9, 
    borderBottomColor: "#ddd",
    elevation: 0,
    height: 45, 
  },
})
export default EditProfileHeader