import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux'



import DrawerContent  from '../screens/DrawerContent/DrawerContent'
import MainTabsNavigation from './MainTabsNavigation';




const Drawer = createDrawerNavigator();


// Root Drawer navigator
const NavigationComponent = ({ navigation,  }) => {

  return(
   <NavigationContainer >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent = {props => <DrawerContent {...props} />}
        drawerType="front"
        drawerStyle={{
            width: 250,
        }}
    >
      <Drawer.Screen name="HomeTab" component={MainTabsNavigation} />
    </Drawer.Navigator>
   </NavigationContainer>
   )
 }

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}

export default connect(mapStateToProps, null)(NavigationComponent);