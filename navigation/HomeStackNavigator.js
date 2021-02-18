import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import Find from '../screens/Feed/Find'
import HeaderComponent from '../components/header'
import Cart from '../screens/Cart/Cart'
import ProductDetails from '../screens/ProductDetails/ProductDetails'
import companyProfile from '../screens/CompanyProfile/companyProfile'
import CompanyList from '../screens/CompanyList/CompanyList'
import CompanyDetails from '../screens/CompanyDetails/CompanyDetails'
import PostProduct from '../screens/PostProduct/PostProduct'
import SearchResults from '../screens/SearchResults/SearchResults'
import AddComment from '../screens/AddComment/AddComment'
import ProductEdit from '../screens/ProductEdit/ProductEdit'
import Messages from '../screens/Messages/Messages'
import SettingsComponent from '../screens/Settings/SettingsComponent'
import ChatRoom from '../screens/Chat/ChatRoom'

const Stack = createStackNavigator()

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={Find}
            />
            <Stack.Screen 
                name="Product Details" 
                component={ProductDetails}
                options={{ 
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
                }} 
            />
            <Stack.Screen 
                name="CompanyProfile" 
                component={companyProfile}
                options={{ 
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
            />
            <Stack.Screen 
                    name="Company List" 
                    component={CompanyList}
                    options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}
                    />
            <Stack.Screen 
                    name="Company Details" 
                    component={CompanyDetails}
                    options={{ 
                    // headerShown: false,
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
            <Stack.Screen 
                    name="Post Product" 
                    component={PostProduct}
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
                    name="Search Results" 
                    component={SearchResults}
                    options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}
          /> 
          <Stack.Screen 
                    name="Cart" 
                    component={Cart}
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
         <Stack.Screen name="Messages" 
                component={Messages}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }} 
        />
        <Stack.Screen 
                name="Settings" 
                component={SettingsComponent}
                options={{ 
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
          /> 
         {/* <Stack.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}    
         /> */}
        </Stack.Navigator>
    )
}

export default HomeStackNavigator

