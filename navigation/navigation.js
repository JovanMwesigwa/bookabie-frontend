import React from 'react'
import { Text, TouchableRipple } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { GlobalStyles } from '../styles/GlobalStyles'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome, Icon } from '@expo/vector-icons';
import { NavBar } from 'galio-framework';

// These are screen imports
import Notifications from '../screens/Notifications/Notifications';
import SettingsComponent from '../screens/Settings/SettingsComponent';
import Find from '../screens/Feed/Find';
import Categories from '../screens/Categories/Categories';
import Cart from '../screens/Cart/Cart';
import Profile from '../screens/MyProfile/Profile';
import NotificationsComponent from '../screens/MyNotifications/NotificationsComponent';
import Product from '../screens/Product/Product';
import Category from '../screens/Category/Category';
import HeaderComponent from '../components/header';
import TopProducts from '../screens/TopProducts/TopProducts';
import CompanyProfile from '../screens/CompanyProfile/companyProfile';
import { MyTheme } from '../themes/MyTheme'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

// These are navigation imports
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetails from '../screens/ProductDetails/ProductDetails';
import CompanyList from '../screens/CompanyList/CompanyList';
import CompanyDetails from '../screens/CompanyDetails/CompanyDetails';
import { DrawerContent } from '../screens/DrawerContent/DrawerContent'
import ProductEdit from '../screens/ProductEdit/ProductEdit';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import PopularProducts from '../components/PopularProducts';
import PostProduct from '../screens/PostProduct/PostProduct';
import EditProfile from '../screens/EditProfile/EditProfile';
import AddComment from '../screens/AddComment/AddComment';
import SearchResults from '../screens/SearchResults/SearchResults';
import Messages from '../screens/Messages/Messages';
import ChatRoom from '../screens/Chat/ChatRoom';
import { TouchableHighlight } from 'react-native-gesture-handler';




// These are navigation initiallization variables
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const topNavigator = createMaterialTopTabNavigator();

// Top tabnavigation

function TopTabs() {
  return(
    <topNavigator.Navigator>
      <topNavigator.Screen
        name="Home"
        component={PopularProducts}
      />
    </topNavigator.Navigator>
  )
}

// TAB NAVIGTAION
// This is where the Feed TAB navigation is created
function MyTabs({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Find"
      activeColor={GlobalStyles.themeColor.color}
      inactiveColor={GlobalStyles.darkFontColor.color}
      barStyle={{ 
        backgroundColor: '#fff', 
        elevation: 2, 
        borderTopWidth: 0.8, 
        borderTopColor: "#ddd",
        paddingBottom: 5
       }}
      >

      <Tab.Screen name="Find" 
      component={Find}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            // <MaterialCommunityIcons name="newspaper" color={color} size={size} />
              <FontAwesome name="newspaper-o" size={20}  color={color} />
          )
        }} />

      <Tab.Screen name="Categories" component={Categories}
      options={{
        tabBarLabel: "Category",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="gamepad-circle" color={color} size={22} />
          )
      }} />

       <Tab.Screen name="Notifications" component={NotificationsComponent}
      options={{
        tabBarLabel: "Notifications",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={22} /> 
        )
      }} />
      
      {/* <Tab.Screen name="Cart" component={Cart}
        options={{
          tabBarLabel: "My Cart",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" color={color} size={size} />
          )
        }} /> */}

      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={22} />
          )
        }} />
    </Tab.Navigator>
  );
}


// Home Stack NAVIGATION
// Here am nesting the Tab Navigation with the Stak Navigation.
const HomeStackNaviator = ({ navigation }) => {

 return(
  <Stack.Navigator >

  <Stack.Screen 
    name="BookABuy" 
    component={MyTabs}
    options={{ 
      headerShown: false,
      headerTitle: () => <HeaderComponent Cart={Cart} />
     }}/>
  
  <Stack.Screen name="Product" 
      component={Product}
      options={{ 
        headerTitle: () => <HeaderComponent Cart={Cart} />
       }} />

<Stack.Screen name="Messages" 
      component={Messages}
      options={{ 
        headerShown: false,
        headerTitle: () => <HeaderComponent Cart={Cart} />
       }} />

<Stack.Screen name="Chat" 
      component={ChatRoom}
      options={{ 
        headerShown: false,
        headerTitle: () => <HeaderComponent Cart={Cart} />
       }} />
  
  <Stack.Screen name="Category" 
      component={Category}
      options={{ 
        headerShown: false,
        headerTitle: () => <HeaderComponent Cart={Cart} />
       }} />
  
  <Stack.Screen name="TopProducts" 
      component={TopProducts}
      options={{ 
        headerTitle: () => <HeaderComponent Cart={Cart} />
       }} />
  
  <Stack.Screen name="Cart" 
        component={Cart}
        options={{ 
          headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }} />
  
  <Stack.Screen name="Product Details" 
        component={ProductDetails}
        options={{ 
          headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }} />
  <Stack.Screen name="CompanyProfile" 
        component={CompanyProfile}
        options={{ 
          headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }}
          />
  <Stack.Screen name="Company List" 
        component={CompanyList}
        options={{ 
          headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }}
          />
  <Stack.Screen name="Company Details" 
        component={CompanyDetails}
        options={{ 
          // headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }}
          />
    <Stack.Screen name="Edit Post" 
        component={ProductEdit}
        options={{ 
          headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }}
          />
    <Stack.Screen name="Edit Profile" 
        component={EditProfile}
        options={{ 
          headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }}
          />
    <Stack.Screen name="Post Product" 
        component={PostProduct}
        options={{ 
          headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }}
          />  
    <Stack.Screen name="Search Results" 
        component={SearchResults}
        options={{ 
          headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }}
          />   
    <Stack.Screen name="AddComment" 
        component={AddComment}
        options={{ 
          headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }}
          /> 
    <Stack.Screen name="Settings" 
        component={SettingsComponent}
        options={{ 
          headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
         }}
          />    
  </Stack.Navigator>
  )
}

// Settings stack navigator

const SettingsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
       <Stack.Screen 
        name="Settings" 
        component={SettingsComponent}
        options={{ 
          // headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
        }}/>
    </Stack.Navigator>
  )
}

// Notifications stack navigator

const NoficationsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Notifications" 
        component={Notifications}
        options={{ 
          // headerShown: false,
          headerTitle: () => <HeaderComponent Cart={Cart} />
        }}/>
    </Stack.Navigator>
  )
}

// Root Drawer navigator
const NavigationComponent = ({ navigation }) => {


  return(
   <NavigationContainer >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent = {props => <DrawerContent {...props} />}
        drawerType="front"
        // hideStatusBar={true}
        drawerStyle={{
            width: 250,
            // backgroundColor: '#d2fae5',
        }}
    >
      <Drawer.Screen name="Home" component={HomeStackNaviator} />
      {/* <Drawer.Screen name="Nofications" component={NoficationsStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsStackNavigator} /> */}
    </Drawer.Navigator>
   </NavigationContainer>
   )
 }


export default NavigationComponent