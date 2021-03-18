import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Entypo } from '@expo/vector-icons';



import HomeStackNaviator from './HomeStackNavigator'
import CategoryStackNavigator from './CategoryStackNavigator'
import NoficationsStackNavigator from './NotificationsStackNavigator'
import ProfileStackNavigator from './ProfileStackNavigator'
import { GlobalStyles } from '../styles/GlobalStyles';


const Tab = createMaterialBottomTabNavigator()


const MainTabsNavigation = ({ navigation, authToken }) => {
    return (
      <Tab.Navigator
        initialRouteName="Find"
        activeColor={GlobalStyles.themeColor.color}
        inactiveColor={GlobalStyles.darkFontColor.color}
        labeled={false}
        barStyle={{ 
          backgroundColor: '#fff', 
          elevation: 2, 
          borderTopWidth: 0.8, 
          borderTopColor: "#ddd",
          paddingBottom: 5
         }}
        >
  
      <Tab.Screen 
            name="Find" 
            component={HomeStackNaviator}
            options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => (
                <Entypo name="shop" size={25} color={color} />
                )
            }}
        />
  
        <Tab.Screen 
            name="Categories" 
            component={CategoryStackNavigator}
            options={{
            tabBarLabel: "Category",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="gamepad-circle" color={color} size={25} />
                )
            }} 
        />
  
         <Tab.Screen 
            name="Notifications" 
            component={NoficationsStackNavigator}
            options={{
            tabBarLabel: "Notifications",
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={25} /> 
            )
            }} 
        />
        
        <Tab.Screen 
            name="Profile" 
            component={ProfileStackNavigator}
            options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={28} />
                )
            }} 
        />
      </Tab.Navigator>
    );
  }

  export default MainTabsNavigation