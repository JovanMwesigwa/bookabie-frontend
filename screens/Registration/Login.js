import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import * as Yup from 'yup'



import {AppCurtain, AppText, AppForm, AppFormField, SubmitButton } from '../../components/'
import { AuthContext } from '../../context/authentication/Context'
import { GlobalStyles  } from '../../styles/GlobalStyles'
import { signIn } from '../../redux/auth/authRedux'




const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password")
})


const logo  = require('../../assets/Logos/logo.png')


const Login = ({ navigation, authLogin }) => {

const {  authState } = useContext(AuthContext);


const [ loading, setLoading ] = useState(false);


const handleSubmit = (values) => {
    const email = values.username;
    const passwordText = values.password;
    authLogin(email, passwordText)
    setLoading(true);
   
}

const { container } = styles
 return(
  <ScrollView style={container} showsVerticalScrollIndicator={false}>

     <View style={styles.info}>
          <View style={styles.logoStyles}>
              <Image source={logo} style={styles.image} />
          </View>
          <View>
            <AppText {...styles.text}>Welcome Back!</AppText>
            <AppText {...styles.subText}>We're glad your back, lets get you going..</AppText>
          </View>
      </View>

    <View style={styles.form}>

    <AppForm  
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

                <AppFormField
                  name="username"
                  placeholder="Your username"
                  icon="user-o"
                />
              <AppFormField
                name="password"
                placeholder="Password"
                icon="lock"
                secureTextEntry
              />

             <SubmitButton title="Login"  />

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}
               >
               <Text style={styles.getStartedTextTwo}>Need an account?</Text>
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
    authData: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authLogin: (email, passwordText) => dispatch(signIn(email, passwordText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
