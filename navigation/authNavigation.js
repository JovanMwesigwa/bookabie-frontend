import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native'

import Login from '../screens/Registration/Login';

// Stack navigation
import { createStackNavigator } from '@react-navigation/stack'
import Signup from '../screens/Registration/Signup';
import SplashScreen from '../screens/Registration/SplashScreen';

const AuthStack = createStackNavigator();


const AuthNavigation = (props) => {

 return(
  <NavigationContainer>
      <AuthStack.Navigator>

        <AuthStack.Screen
          name='Splash'
          component={SplashScreen}
          options={{
              headerShown: false
          }}
           />

          <AuthStack.Screen
          name='Login'
          component={Login}
          options={{
              headerShown: false
          }}
           />
          <AuthStack.Screen
          name='Signup'
          component={Signup}
          options={{
            headerShown: false
        }} />
      </AuthStack.Navigator>
  </NavigationContainer>
  )
}


export default AuthNavigation