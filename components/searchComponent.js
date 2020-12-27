import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import axios from 'axios'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import { AuthContext } from '../context/authentication/Context'

const SearchComponent = ({getSearch}) => {

    const navigation = useNavigation();

    const [ enteredText, setEnteredText ] = useState(null);

    const { authState } = useContext(AuthContext);

    const token = authState.token;


const { container } = styles
 return(
  <View style={container}>
    <TextInput
        placeholder="Search for product...."
        style={styles.input}
        value={enteredText}
        onChangeText={text => setEnteredText(text)}
    />
      <TouchableOpacity style={styles.icon}
        onPress={() => getSearch(enteredText)}
      >
        <MaterialIcons name="search" size={15} color="#B83227" />
      </TouchableOpacity>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    height: 80,
//    flexDirection: 'row'
    // borderRadius: 14
   
  },
//   menuIcon: {
//       paddingHorizontal: 10
//   },
  headerText: {
      padding: 20
  },
  icon: {
    position: 'absolute',
    bottom: 5.5,
    left: 22
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    // backgroundColor: '#ddd',
    marginHorizontal: 15,
    width: "90%",
    paddingHorizontal: 28
},
})
export default SearchComponent;