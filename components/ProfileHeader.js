import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';


const ProfileHeader = ({ profileName }) => {

    const navigation = useNavigation();

    // console.log(profileName);

const { container } = styles
 return(
    <View>
    <View style={{...styles.headerContainer }}>
      <Text style={{...GlobalStyles.headerText, color: 'black', fontWeight: '500', fontSize: 18, paddingHorizontal: 10}}>{profileName}</Text>
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
export default ProfileHeader