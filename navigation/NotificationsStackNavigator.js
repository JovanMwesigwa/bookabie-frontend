import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import Notifications from '../screens/Notifications/Notifications'
import HeaderComponent from '../components/header'
import Cart from '../screens/Cart/Cart'


const Stack = createStackNavigator()

const NotificationsStackNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            headerTitle: () => <HeaderComponent Cart={Cart} />
        }}
        >
            <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
    )
}

export default NotificationsStackNavigator

