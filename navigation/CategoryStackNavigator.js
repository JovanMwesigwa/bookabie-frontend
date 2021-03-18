import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'



import {AddComment, ChatRoom, Category, Categories, companyProfile, ProductEdit,  ProductDetails,  } from '../screens/'
import HeaderComponent from '../components/header'


const Stack = createStackNavigator()

const CategoryStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
            }}
        >
            <Stack.Screen 
                name="Categories" 
                component={Categories}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }} 
         />
         <Stack.Screen 
                name="Category" 
                component={Category}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }} 
         />
         <Stack.Screen 
                name="Product Details" 
                component={ProductDetails}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }} 
            />
        <Stack.Screen name="CompanyProfile" 
                component={companyProfile}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
          />
          <Stack.Screen name="Chat" 
                component={ChatRoom}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }} 
        />
        <Stack.Screen 
                name="AddComment" 
                component={AddComment}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
          /> 
        <Stack.Screen 
                name="Edit Post" 
                component={ProductEdit}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
            />
        </Stack.Navigator>
    )
}

export default CategoryStackNavigator

