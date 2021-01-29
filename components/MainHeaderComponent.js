import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import axios from 'axios';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import SearchComponent from '../components/searchComponent';
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import { Title } from 'react-native-paper';
import { fetchCartData } from '../redux/cart/CartRedux';





const MainHeaderComponent = ({  cartData, authToken, cartDataFetch }) => {

    const navigation = useNavigation();

    const token = authToken

    const [ userInfo, setUserInfo ] = useState([]);

    const fetchUserInfo = () => {
      axios.get(`${APIROOTURL}/api/userprofile/user/detail/`,{
        headers: {
            'Authorization': `Token ${token}`
          }
    })
        .then(res => {
            setUserInfo(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
      fetchUserInfo()
      cartDataFetch(token)
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
          <SearchComponent />
          <TouchableOpacity onPress={() => navigation.navigate("Cart")} >
            <AntDesign name='shoppingcart' size={30} 
            style={{paddingHorizontal: 5}}
            color={GlobalStyles.darkFontColor.color}  />
          </TouchableOpacity>
          <View style={styles.cartNumberContainer}>
              <Text style={styles.cartNumber}>{cartData.length}</Text>
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
    elevation: 2
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
    right: 0,
    bottom: 35,
    zIndex: 1,
  }
})

const mapStateToProps = state => {
  return{
    cartData: state.cart.cartItems,
    authToken: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    cartDataFetch: token => dispatch(fetchCartData(token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainHeaderComponent)