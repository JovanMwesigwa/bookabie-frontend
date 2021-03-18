import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import {Cart, NotificationsScreen} from '../screens/'
import HeaderComponent from '../components/header'


const Stack = createStackNavigator()

const NotificationsStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
            }}
        >
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
    )
}

export default NotificationsStackNavigator

