import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as Yup from 'yup'



import { AuthContext } from '../../context/authentication/Context'
import { GlobalStyles  } from '../../styles/GlobalStyles'
import { signIn } from '../../redux/auth/authRedux'
import AppForm from '../../components/Forms/AppForm'
import AppFormField from '../../components/Forms/AppFormField';
import AppText from '../../components/AppText'
import SubmitButton from '../../components/Forms/SubmitButton'





const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password")
})



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
  <ScrollView style={container}>
    <View style={styles.info}>
      <AppText {...styles.text}>Login!</AppText>
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

             <SubmitButton title="Login" loading={loading} />

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}
               >
               <Text style={styles.getStartedTextTwo}>Need an account?</Text>
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
    authData: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authLogin: (email, passwordText) => dispatch(signIn(email, passwordText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
