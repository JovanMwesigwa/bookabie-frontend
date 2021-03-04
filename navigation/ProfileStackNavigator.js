import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'



import Profile from '../screens/MyProfile/Profile'
import HeaderComponent from '../components/header'
import Cart from '../screens/Cart/Cart'
import EditProfile from '../screens/EditProfile/EditProfile'
import AddTopProducts from '../screens/AddTopProducts/AddTopProducts'


const Stack = createStackNavigator()

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
            }}
        >
            <Stack.Screen 
                name="Profile" 
                component={Profile} 
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
        />
            <Stack.Screen 
                name="Edit Profile" 
                component={EditProfile}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
        />

            <Stack.Screen 
                name="AddTopProducts" 
                component={AddTopProducts}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
        />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator

