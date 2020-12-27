import React, { useContext, useState } from 'react'
import { UserAuthentication } from '../../context/authentication/UserAuthenticationContextProvider'
import { View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator, TextInput, StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../context/authentication/Context'
import { ScrollView } from 'react-native-gesture-handler'

const Signup = ({ navigation, }) => {


  const { authContext } = useContext(AuthContext);

  const signUp = authContext.signUp

  const [ loading, setLoading ] = useState(false)

const { LogoutHandler, LoginHandler } = useContext(UserAuthentication);

const [ isValidUsername, setIsValidUsername ] = useState(true);
const [ isValidEmail, setIsValidEmail ] = useState(true);
const [ isValidPassword, setIsValidPassword ] = useState(true);
const [ isValidConfirmedPassword, setIsValidConfirmedPassword ] = useState(true);

const [ username , setUsername ] = useState('')
const [ email , setEmail ] = useState('')
const [ passwordData , setPasswordData ] = useState({
  passText: '',
  showText: false,
})

const [ confirmPasswordData , setConfirmPasswordData ] = useState({
  passText: '',
  showText: false,
})

const usernameHandler = (text) => {
  setUsername(text)
}

const emailHandler = (text) => {
  setEmail(text)
}

const passwordHandler = (text) => {
  setPasswordData({
    ...passwordData,
    passText: text,
  })
}

const confirmPasswordHandler = (text) => {
  setConfirmPasswordData({
    ...passwordData,
    passText: text
  })
}

const toggleShowText = () => {
  setPasswordData({
    ...passwordData,
    showText: !passwordData.showText
  })
}

const handleUsernameValidation = (val) => {
  if (username.trim().length < 4){
    setIsValidUsername(false)
  }else{
    setIsValidUsername(true)
  }
}

const handleEmailValidation = val => {
  if(email.includes('@') == false){
    setIsValidEmail(false)
  }else{
    setIsValidEmail(true)
  }
}

const handlePasswordValidation = (val) => {
  if(passwordData.passText.trim().length < 8){
    setIsValidPassword(false)
  }else{
    setIsValidPassword(true)
  }
}

const handleConfirmedPasswordValidation = (val) => {
  if(passwordData.passText != confirmPasswordData.passText){
    setIsValidPassword(false)
  }else{
    setIsValidPassword(true)
  }
}

const goToLogin = () => {
  navigation.navigate('Login')
}

const handleSignUpSubmit = () => {
  if (username.length == 0 || email.length == 0 || passwordData.passText.length == 0 || confirmPasswordData.passText.length == 0 ) {
    alert("All fields must be filled.")
  }else{
    const password = passwordData.passText;
    // const confirmPassword = confirmPasswordData.passText;
    // console.log( username, email, password, );
    signUp(username, email, password, goToLogin)
    setLoading(true)
  }
  
}


const { container } = styles
 return(
   <KeyboardAvoidingView
   behavior={Platform.OS == "ios" ? "padding" : "height"}
   style={styles.container}
>
   <ScrollView>

    <StatusBar backgroundColor='#B83227' barStyle='light-content' />
    <View style={styles.header}>
      <Text style={styles.text_header}>Welcome!</Text>
    </View>
    <Animatable.View style={styles.footer}
      animation="fadeInUpBig"
      >
      <Text style={{...styles.text_footer}}>Username</Text>
      <View style={styles.action}>
          <FontAwesome
          name='user-o'
          color="#05375a"
          size={20} />
          <TextInput
            placeholder="Enter your username"
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText = {usernameHandler}
            // onEndEditing={e => handleUsernameValidation(e.nativeEvent.text)}
          />
          {email.length >= 1 ? 
          <Feather
            name='check-circle'
            color='green'
            size={15}
          /> : null
          }
      </View>

      { isValidUsername ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errMsg}>username must be 4 letters or more.</Text>
          </Animatable.View>
      }

      <Text style={{...styles.text_footer, marginTop: 32}}>Email</Text>
      <View style={styles.action}>
          <FontAwesome
          name='user-o'
          color="#05375a"
          size={20} />
          <TextInput
            placeholder="Your email"
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText = {emailHandler}
            onEndEditing={e => handleEmailValidation(e.nativeEvent.text)}
          />
          {email.length >= 1 ? 
          <Feather
            name='check-circle'
            color='green'
            size={15}
          /> : null
          }
      </View>
      { isValidEmail ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errMsg}>Enter a valid email address.</Text>
          </Animatable.View>
      }
      <Text style={{...styles.text_footer, marginTop: 32}}>Password</Text>
      <View style={styles.action}>
          <FontAwesome
          name='lock'
          color="#05375a"
          size={20} />
          <TextInput
            secureTextEntry={passwordData.showText ? false : true }
            placeholder="Your password"
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText={passwordHandler}
            onEndEditing={e => handlePasswordValidation(e.nativeEvent.text)}
          />
          {passwordData.passText.length >= 1 ? 
          <TouchableOpacity onPress={() => toggleShowText()}>
            <Feather
              name={passwordData.showText ? 'eye-off' : 'eye'}
              color='grey'
              size={15}
            />
          </TouchableOpacity>
          : null }
      </View>

      { isValidUsername ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errMsg}>Password must be 8 characters or more.</Text>
          </Animatable.View>
      }

      <Text style={{...styles.text_footer, marginTop: 32}}>Confirm Password</Text>
      <View style={styles.action}>
          <FontAwesome
          name='lock'
          color="#05375a"
          size={20} />
          <TextInput
            secureTextEntry={passwordData.showText ? false : true }
            placeholder="Your password"
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText={confirmPasswordHandler}
            onEndEditing={e => handleConfirmedPasswordValidation(e.nativeEvent.text)}
          />
          {passwordData.passText.length >= 1 ? 
          <TouchableOpacity onPress={() => toggleShowText()}>
            <Feather
              name={passwordData.showText ? 'eye-off' : 'eye'}
              color='grey'
              size={15}
            />
          </TouchableOpacity>
          : null }
      </View>

      { isValidConfirmedPassword ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errMsg}>Your passwords didnot match.</Text>
          </Animatable.View>
      }

      { loading ? 
      <TouchableOpacity onPress={handleSignUpSubmit}
        style={{ paddingVertical: 20 }} >
        <ActivityIndicator size='small' color="white" style={styles.getStartedText} />
      </TouchableOpacity> :
      <TouchableOpacity onPress={handleSignUpSubmit}
        style={{ paddingVertical: 20 }} >
        <Text style={styles.getStartedText}>Sign Up</Text>
      </TouchableOpacity>
      }

      <TouchableOpacity onPress={() => navigation.navigate('Login')}
         >
        <Text style={styles.getStartedTextTwo}>Already have an account?</Text>
      </TouchableOpacity>

    </Animatable.View>
</ScrollView>
  </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B83227'
   },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 44,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  errMsg: {
    fontSize: 14,
    color: 'red'
  },
  getStartedText: {
    backgroundColor: '#B83227',
    textAlign: 'center',
    color: 'white',
    padding: 12,
    paddingHorizontal: 20,
    paddingRight: 32,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 'bold'
  },
  getStartedTextTwo: {
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#B83227',
    padding: 12,
    borderWidth: 1,
    borderColor: '#B83227',
    paddingHorizontal: 20,
    paddingRight: 32,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 'bold'
  },
  icon: {
    position: 'absolute',
    right: 1,
    top: 10
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})
export default Signup


