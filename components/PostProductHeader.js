import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
// import { useNavigation } from '@react-navigation/native';


const PostProductHeader = ({submitHandler, onPress}) => {

    // const navigation = useNavigation();

const { container } = styles
 return(
    <View>
      <View style={{...styles.headerContainer }}>
        <TouchableOpacity onPress={onPress} >
          <AntDesign name="close" size={25} color="black" />
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
    backgroundColor: 'white', 
    justifyContent: 'space-between',  
    paddingHorizontal: 15, 
    elevation: 2, 
    height: 45, 
  },
})
export default PostProductHeader