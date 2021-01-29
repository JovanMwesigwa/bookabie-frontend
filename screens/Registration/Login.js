import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { UserAuthentication } from '../../context/authentication/UserAuthenticationContextProvider'
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, StatusBar, ActivityIndicator } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../context/authentication/Context'
import { UserInfoContext } from '../../context/userInfoContext/UserInfoContextProvider';
import { GlobalStyles  } from '../../styles/GlobalStyles'
import { signIn } from '../../redux/auth/authRedux'

const Login = ({ navigation, authData, authLogin }) => {

const { authContext, authState } = useContext(AuthContext);

const token = authState.token;

const { userInfo } = useContext(UserInfoContext);

const [ loading, setLoading ] = useState(false);

const [ isValidPassword, setIsValidPassword ] = useState(true);

const [ isValidUsername, setIsValidUsername ] = useState(true);

// console.log(signIn);
// const signIn = authContext.signIn

const [ email , setEmail ] = useState('')

const [ passwordData , setPasswordData ] = useState({
  passText: '',
  showText: false,
})


const emailHandler = (text) => {
  setEmail(text)
}

const passwordHandler = (text) => {
  setPasswordData({
    ...passwordData,
    passText: text,
  })
}

const toggleShowText = () => {
  setPasswordData({
    ...passwordData,
    showText: !passwordData.showText
  })
  
}

const handleUserValidation = (val) => {
  if( val.length >= 2){
    setIsValidUsername(true)
  }else{
    setIsValidUsername(false)
  }
}

const handlePasswordValidation = (val) => {
  if (val.trim().length < 4){
    setIsValidPassword(false)
  }else{
    setIsValidPassword(true)
  }
}


const handleSubmit = () => {
  if ( email.length == 0 || passwordData.passText.length == 0 ) {
    alert("Username and Password can't be empty")
  }else{
    const passwordText = passwordData.passText;
    // console.log(email, passwordText);
    authLogin(email, passwordText)
    setLoading(true);
  }
   
}

const { container } = styles
 return(
  <View style={container}>
    <StatusBar backgroundColor={GlobalStyles.themeColor.color} barStyle='light-content' />
    <View style={styles.header}>
      <Text style={styles.text_header}>Welcome!</Text>
    </View>
    <Animatable.View
      animation="fadeInUpBig" 
      style={styles.footer}>
      <Text style={styles.text_footer}>Username</Text>
      <View style={styles.action}>
          <FontAwesome
          name='user-o'
          color="#05375a"
          size={20} />
          <TextInput
            placeholder="Your username"
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText = {emailHandler}
            onEndEditing={(e) => handleUserValidation(e.nativeEvent.text)}
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
            <Text style={styles.errMsg}>username didn't match any available ones.</Text>
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
      { isValidPassword ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errMsg}>password must be 8 charaters or longer.</Text>
          </Animatable.View>
      }
      {loading ? 
      <TouchableOpacity onPress={handleSubmit}
        style={{ paddingVertical: 32 }} >
        {/* <Text style={styles.getStartedText}>Login</Text> */}
        <ActivityIndicator size='small' color="white" style={styles.getStartedText} />
      </TouchableOpacity> :
      <TouchableOpacity onPress={handleSubmit}
          style={{ paddingVertical: 32 }} >
          <Text style={styles.getStartedText}>Login</Text>
      </TouchableOpacity>
      }

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}
         >
        <Text style={styles.getStartedTextTwo}>Need an account?</Text>
      </TouchableOpacity>

    </Animatable.View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.themeColor.color
   },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  errMsg: {
    fontSize: 14,
    color: 'red'
  },
  getStartedText: {
    backgroundColor: GlobalStyles.themeColor.color,
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
    color: GlobalStyles.themeColor.color,
    padding: 12,
    borderWidth: 1,
    borderColor: GlobalStyles.themeColor.color,
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

const mapStateToProps = state => {
  return{
    authData: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authLogin: (email, passwordText) => dispatch(signIn(email, passwordText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


