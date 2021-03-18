import React, { useContext } from 'react'
import { UserAuthentication } from '../../context/authentication/UserAuthenticationContextProvider'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';


import { GlobalStyles } from '../../styles/GlobalStyles'


  
const SplashScreen = ({ navigation }) => {

const { LogoutHandler } = useContext(UserAuthentication);

const { container } = styles
 return(
  <View style={container}>
    <StatusBar backgroundColor={GlobalStyles.themeColor.color} barStyle='light-content' />
      <View style={styles.header}>
        <Animatable.View 
          animation="bounceIn"
          delay={500}
          duration = {2000}
          style={styles.logo}
        >
          <Image 
              source={require('../../assets/Logos/logo.png')}
              style={{ width: "100%", height: "100%", resizeMode: 'contain', }}
          />
        </Animatable.View>
        <Animatable.View 
          animation="bounceIn"
          delay={500}
          duration = {2000}
          style={styles.logoName}>
          <Text style={{ fontSize: 30, color: '#fff', marginTop: 8  }}>Bookabie</Text>
        </Animatable.View>
      </View>
      <Animatable.View 
        style={styles.footer}
        animation="fadeInUpBig"
        delay={500}>
        <Text style={styles.title}>Get to sell and buy beyond!</Text>
 
        <View style={styles.signIn}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.text}>Login into your account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
                <Text style={styles.getStartedText}>Join Today!</Text>
                <MaterialIcons
                    name='navigate-next'
                    color='#fff'
                    size={25}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>

      </Animatable.View>
  </View>
  )
}

const {height} = Dimensions.get('screen')
const height_logo = height * 0.2


const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: GlobalStyles.themeColor.color
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  logo: {
    padding: 8,
    borderWidth: 2,
    borderColor: "#fff",
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo/2,
    overflow: 'hidden'
  },
  logoName: {
    
  },
  icon: {
    position: 'absolute',
    right: 1,
    top: 10
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  title: {
      color: '#05325a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  getStartedText: {
    backgroundColor: GlobalStyles.themeColor.color,
    color: 'white',
    padding: 12,
    paddingHorizontal: 20,
    paddingRight: 32,
    borderRadius: 24,
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop: 5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
})
export default SplashScreen