import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'



import Category from '../screens/Category/Category'
import HeaderComponent from '../components/header'
import Categories from '../screens/Categories/Categories'
import ProductDetails from '../screens/ProductDetails/ProductDetails'
import companyProfile from '../screens/CompanyProfile/companyProfile'
import ProductEdit from '../screens/ProductEdit/ProductEdit'
import AddComment from '../screens/AddComment/AddComment'
import ChatRoom from '../screens/Chat/ChatRoom'



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

