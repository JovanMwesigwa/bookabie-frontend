import React, { useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, StatusBar,Image, } from 'react-native'
import NavigationComponent from './navigation/navigation'
import AuthNavigation from './navigation/authNavigation'
import { GlobalStyles } from './styles/GlobalStyles'
import { connect } from 'react-redux'
import { load } from './redux/auth/authRedux';

const logo = require('./assets/Logos/logo.png');

const MainApp = ({ authToken,  loadToken}) => {

const [ loading, setLoading ] = useState(true);

const token = authToken;

useEffect(() => {
  loadToken()
  setTimeout(() => {
    setLoading(false)
  },8000)
},[])

 if (loading ) {
   return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: GlobalStyles.themeColor.color }}>
       <StatusBar barStyle="light-content" backgroundColor={GlobalStyles.themeColor.color} />
       <View style={styles.logoStyles}>
         <Image source={logo} style={styles.image} />
       </View>
       <Text style={{ color: '#fff', fontSize: 16, letterSpacing: 0.5 }}>Bookabie</Text>
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
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
  },
  logoStyles: { 
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 5,
    height: 70, 
    overflow: 'hidden',
    width: 70, 
    marginBottom: 5
},
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token,
    authLoading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return{
    loadToken: () => dispatch(load())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainApp)