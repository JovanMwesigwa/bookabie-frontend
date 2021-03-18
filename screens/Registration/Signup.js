import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Image,  TouchableOpacity, ScrollView, } from 'react-native'
import * as Yup from 'yup'
import { connect } from 'react-redux'




import {AppCurtain, AppForm, AppFormField, AppText, SubmitButton } from '../../components/'
import { AuthContext } from '../../context/authentication/Context'
import { GlobalStyles } from '../../styles/GlobalStyles';
import { signUp } from '../../redux/auth/authRedux'


const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
  rePassword: Yup.string().required().min(4).matches("password")
})

const logo  = require('../../assets/Logos/logo.png')

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

   <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.info}>
          <View style={styles.logoStyles}>
              <Image source={logo} style={styles.image} />
          </View>
          <View>
            <AppText {...styles.text}>Welcome!</AppText>
            <AppText {...styles.subText}>Join bookabie today and get the best deals..</AppText>
          </View>
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
    <AppCurtain loading={loading} />
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   },
   info: {
    alignItems: 'center',
    backgroundColor: "#fff",
    height: 200,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    width: "100%"
   },
   form: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 30,
    width: "100%"
   },
   text: {
    color: GlobalStyles.themeColor.color,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center',
  },
   subText: {
    color: "#777",
    flexWrap: 'wrap',
    fontSize: 14,
    textAlign: 'center',
   },
   logoStyles: { 
    borderRadius: 75/2,
    height: 75, 
    marginBottom: 8,
    overflow: 'hidden',
    width: 75, 
},
image: {
  width: "100%",
  height: "100%",
  resizeMode: 'contain',
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


