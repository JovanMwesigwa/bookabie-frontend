import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UploadProfilePicture from './CreateProfileScreens/UploadProfilePicture';
import AddDescriptionScreen from './CreateProfileScreens/AddDescriptionScreen';
import AddContactScreen from './CreateProfileScreens/AddContactScreen';

const Stack = createStackNavigator();


const CreateProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='UploadPicture'
                component={UploadProfilePicture}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='AddDescription'
                component={AddDescriptionScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='AddContact'
                component={AddContactScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}


export default CreateProfileStack
