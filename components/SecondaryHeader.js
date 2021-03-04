import React, {  useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import SearchComponent from '../components/searchComponent';
import { connect } from 'react-redux';
import { fetchCartData } from '../redux/cart/CartRedux';




const SecondaryHeader = ({cartData, authToken, cartDataFetch }) => {

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
       <View style={{...styles.headerContainer }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={{ uri: userInfo.profile_pic }} style={styles.imageStyle} />
          </TouchableOpacity>
          <SearchComponent />
       </View> 
       <View>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")} >
            <AntDesign name='shoppingcart' size={30} 
            style={{paddingHorizontal: 5}}
            color={GlobalStyles.darkFontColor.color}  />
          </TouchableOpacity>
          <View style={styles.cartNumberContainer}>
              <Text style={styles.cartNumber}>{cartData.product.length}</Text>
          </View>
       </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',   
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15, 
    height: 55,
    elevation: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingVertical: 2,
    color: '#B83227'
  },
  profileContainer: { 
    // backgroundColor: '#ddd', 
    // padding: 18, 
    width: 25, 
    height: 25, 
    borderRadius: 65 
},
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cart: {
    color: 'black',

  },
  imageStyle: { 
    width: 35, 
    height: 35, 
    borderRadius: 35,
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
    right: 2,
    bottom: 15,
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
export default connect(mapStateToProps, mapDispatchToProps)(SecondaryHeader);