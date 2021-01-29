import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import axios from 'axios'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { GlobalStyles  } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import { AuthContext } from '../context/authentication/Context'

const SearchComponent = () => {

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
        
      >
        <MaterialIcons name="search" size={18} color={GlobalStyles.themeColor.color} />
      </TouchableOpacity>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  headerText: {
      padding: 20
  },
  icon: {
    position: 'absolute',
    bottom: 5.5,
    left: 22
  },
  input: {
    borderWidth: 0.3,
    borderColor: GlobalStyles.darkFontColor.color,
    borderRadius: 15,
    padding: 2,
    marginHorizontal: 15,
    width: "90%",
    paddingHorizontal: 28,
    alignItems: 'center',
},
})
export default SearchComponent;