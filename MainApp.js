import React, { useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, StatusBar,Image, ScrollView, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { APIROOTURL } from './ApiRootURL/ApiRootUrl'
import { UserAuthentication } from './context/authentication/UserAuthenticationContextProvider'
import NavigationComponent from './navigation/navigation'
import Login from './screens/Registration/Login'
import AuthNavigation from './navigation/authNavigation'
import Signup from './screens/Registration/Signup'
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './context/authentication/Context';
import { GlobalStyles } from './styles/GlobalStyles'

const logo = require('./assets/Logos/White.png');

const MainApp = ({navigation}) => {

const { authContext, authState }  = useContext(AuthContext);
const [ loading, setLoading ] = useState(true);

const token = authState.token

useEffect(() => {
  setTimeout(() => {
    setLoading(false)
  },8000)
},[])

 if (loading ) {
   return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: GlobalStyles.themeColor.color }}>
       <StatusBar barStyle="light-content" backgroundColor={GlobalStyles.themeColor.color} />
       <Image source={logo} style={styles.logoStyles} />
       <Text style={{ color: '#fff' }}>Bookabie</Text>
     </View>
   )
 }

 
const { container } = styles

 return(


      <View style={container}>
          <StatusBar barStyle="light-content" />
            {
              token == null ? 
                <AuthNavigation /> :
                <NavigationComponent /> 
            }
      </View>

  )
}


const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#E6EDED",
  },
  logoStyles: { 
    width: 55, 
    height: 55, 
    resizeMode: 'contain',
    borderRadius: 10 
},
})
export default MainApp