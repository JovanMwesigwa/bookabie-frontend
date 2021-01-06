import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import SearchComponent from '../components/searchComponent';
import { UserInfoContext } from '../context/userInfoContext/UserInfoContextProvider';
import { Title } from 'react-native-paper';

const logo = require('../assets/Logos/bbieL.png');

const MainHeaderComponent = ({ getSearch }) => {

    const navigation = useNavigation();

    const { userInfo } = useContext(UserInfoContext);

    // console.log(userInfo);


const { container } = styles
 return(
    <View style={styles.container}>
      <View style={styles.topLogoContainer}>
        {/* <Image source={logo} style={styles.logoStyles} /> */}
        <Title style={styles.headerText}>Bookabie</Title>
      </View>
       {/* <Text ></Text>  */}
       <View style={{...styles.headerContainer }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={{ uri: userInfo.profile_pic }} style={styles.imageStyle} />
          </TouchableOpacity>
          <SearchComponent getSearch={getSearch} />
          <AntDesign name='shoppingcart' size={30} style={styles.cart} onPress={() => navigation.navigate("Cart")} />
          <View style={styles.cartNumberContainer}>
              <Text style={styles.cartNumber}>4</Text>
          </View>
       </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',   
    paddingHorizontal: 15, 
    height: 94,
    elevation: 5,
  },
  headerText: {
    flex: 1,
    fontSize: 25,
    letterSpacing: 2,
    paddingTop: 10,
    color: '#B83227',
    fontWeight: "600",
  },
  profileContainer: { 
    // backgroundColor: '#ddd', 
    // padding: 18, 
    width: 25, 
    height: 25, 
    borderRadius: 65 
},
logoStyles: { 
  // flex: 1, 
  height:34, 
  resizeMode: 'contain',
},
topLogoContainer: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
},
  headerContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cart: {
    color: 'black',

  },
  imageStyle: { 
    width: 35, 
    height: 35, 
    borderRadius: 35,
    borderWidth: 0.5,
    borderColor: '#ddd'
  },
  cartNumber: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: 'center',
    color: "#fff",
    backgroundColor: "#B83227",
    padding: 1,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 5,
    borderRadius: 18
  },
  cartNumberContainer: {
    position: "absolute",
    left: 320,
    bottom: 30,
    zIndex: 1,
  }
})
export default MainHeaderComponent