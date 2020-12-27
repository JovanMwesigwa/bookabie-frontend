import React, { useContext } from 'react'
import { UserAuthentication } from '../../context/authentication/UserAuthenticationContextProvider'
import { View, Text, StyleSheet, Button, Dimensions, Image, TouchableOpacity, StatusBar } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {

const { LogoutHandler } = useContext(UserAuthentication);

const { container } = styles
 return(
  <View style={container}>
    <StatusBar backgroundColor='#B83227' barStyle='light-content' />
      <View style={styles.header}>
        <Animatable.Image 
            source={require('../../assets/Logos/White.png')}
            animation="bounceIn"
            delay={500}
            duration = {2000}
            style={styles.logo}
         />
        <Animatable.View 
          animation="bounceIn"
          delay={500}
          duration = {2000}
          style={styles.logoName}>
          <Text style={{ fontSize: 30, color: '#fff',  }}>Bookabie</Text>
        </Animatable.View>
      </View>
      <Animatable.View 
        style={styles.footer}
        animation="fadeInUpBig"
        delay={500}>
        <Text style={styles.title}>Connect with all your customers!</Text>
 
        <View style={styles.signIn}>
            <TouchableOpacity>
                <Text style={styles.text}></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
                <Text style={styles.getStartedText}>Get Started</Text>
                <MaterialIcons
                    name='navigate-next'
                    color='#fff'
                    size={25}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>

      </Animatable.View>
    {/* <Button title='Login now' onPress={() => navigation.navigate('Login')} /> */}
  </View>
  )
}

const {height} = Dimensions.get('screen')
const height_logo = height * 0.2


const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#B83227'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  logo: {
    width: height_logo,
    height: height_logo,
    // borderRadius: 85,
    borderRadius: 12,
    resizeMode: 'contain',
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
    backgroundColor: '#B83227',
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