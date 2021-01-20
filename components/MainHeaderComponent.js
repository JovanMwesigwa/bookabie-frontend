import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import SearchComponent from '../components/searchComponent';
import { UserInfoContext } from '../context/userInfoContext/UserInfoContextProvider';
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import { AuthContext } from '../context/authentication/Context'
import { Title } from 'react-native-paper';

const logo = require('../assets/Logos/bbieL.png');

const MainHeaderComponent = ({ getSearch }) => {

    const navigation = useNavigation();

    const { authState } = useContext(AuthContext);

    const [ cartCount, setCartCount ] = useState(0);

    const token = authState.token;

    const { userInfo } = useContext(UserInfoContext);


    const fetchCartNumber = () => {
      axios.get(`${APIROOTURL}/api/my_cart/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(res => {
        setCartCount(res.data.count)
      })
      .catch(err => {
        console.log(err);
      })
    }

    useEffect(() => {
      fetchCartNumber()
    },[])



const { container } = styles
 return(
    <View style={styles.container}>
      <View style={styles.topLogoContainer}>
        <Title style={styles.headerText}>Bookabie</Title>
      </View>
       <View style={{...styles.headerContainer }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={{ uri: userInfo.profile_pic }} style={GlobalStyles.smallRoundedPictContainer} />
          </TouchableOpacity>
          <SearchComponent getSearch={getSearch} />
          <AntDesign name='shoppingcart' size={30} color={GlobalStyles.darkFontColor.color} onPress={() => navigation.navigate("Cart")} />
          <View style={styles.cartNumberContainer}>
              <Text style={styles.cartNumber}>{cartCount}</Text>
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
    color: GlobalStyles.themeColor.color,
    fontWeight: "600",
  },
  profileContainer: { 
    width: 25, 
    height: 25, 
    borderRadius: 65 
},
logoStyles: {  
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