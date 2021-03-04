import React, { useContext, useState } from 'react'
import { UserAuthentication } from '../../context/authentication/UserAuthenticationContextProvider'
import { View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator, TextInput, StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import * as Yup from 'yup'



import AppForm from '../../components/Forms/AppForm'
import AppFormField from '../../components/Forms/AppFormField';
import AppText from '../../components/AppText'
import SubmitButton from '../../components/Forms/SubmitButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../context/authentication/Context'
import { ScrollView } from 'react-native-gesture-handler'
import { GlobalStyles } from '../../styles/GlobalStyles';
import { connect } from 'react-redux'
import { signUp } from '../../redux/auth/authRedux'



const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
  rePassword: Yup.string().required().min(4).matches("password")
})


const Signup = ({  navigation, authSignUp }) => {


  const { authContext } = useContext(AuthContext);

  const signUp = authContext.signUp

  const [ loading, setLoading ] = useState(false)

const goToLogin = () => {
  navigation.navigate('CreateProfile')
}

const handleSignUpSubmit = (values) => {
    setLoading(true)
    const username = values.username;
    const email = values.email;
    const password = values.password;
    authSignUp(username, email, password, goToLogin)  
}


const { container } = styles
 return(

   <ScrollView>
      <View style={styles.info}>
        <AppText {...styles.text}>Join!</AppText>
      </View>

    <View style={styles.form}>
        
        <AppForm 
          initialValues={{ email: "", username: "", password: "", rePassword: "", }}
          validationSchema={validationSchema}
          onSubmit={handleSignUpSubmit}
        >
          <AppFormField
            name="username"
            placeholder="Username"
            icon="user-o"
          />
          <AppFormField
            name="email"
            placeholder="example@gmail.com"
            icon="user-o"
          />
          <AppFormField
            name="password"
            placeholder="password"
            icon="lock"
            secureTextEntry
          />
          <AppFormField
            name="rePassword"
            placeholder="Confirm password"
            icon="lock"
            secureTextEntry
          />

          <SubmitButton title="Signup" loading={loading} />

          <TouchableOpacity onPress={() => navigation.navigate('Login')}
               >
               <Text style={styles.getStartedTextTwo}>Need to login?</Text>
            </TouchableOpacity>

        </AppForm>

    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   },
   info: {
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    height: 180,
    width: "100%"
   },
   form: {
     backgroundColor: "#fff",
     borderTopRightRadius: 30,
     borderTopLeftRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 30,
    width: "100%"
   },
   text: {
    color: GlobalStyles.themeColor.color,
     fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20
   },
  getStartedTextTwo: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    textAlign: 'center',
    color: GlobalStyles.themeColor.color,
    padding: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold'
  },
})

const mapStateToProps = state => {
  return{
    authState: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authSignUp: (username, email, password, goToLogin) => dispatch(signUp(username, email, password, goToLogin))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)


