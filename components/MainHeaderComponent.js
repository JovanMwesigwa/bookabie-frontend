import React, {  useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import { Title } from 'react-native-paper';
import { fetchCartData } from '../redux/cart/CartRedux';


import useAuthUser from '../hooks/useAuthUser'
import SearchComponent from '../components/searchComponent';



const MainHeaderComponent = ({authToken,  cartData,  cartDataFetch, main }) => {

    const navigation = useNavigation();

    const token = authToken

    const userInfo  = useAuthUser(token);
    
    useEffect(() => {
      cartDataFetch(token)
    },[])



const { container } = styles
 return(
    <View style={[styles.container, { height: main ? 100 : 65}]}>
      { main && <Title style={styles.headerText}>Bookabie</Title>}
      
       <View style={styles.headerContainer }>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={{ uri: userInfo.profile_pic }} style={[GlobalStyles.smallRoundedPictContainer, { width: main ? 45 : 40, height:  main ? 45 : 40,}]} />
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
    elevation: 2,  
    paddingHorizontal: 15, 
  },
  headerText: {
    fontSize: 25,
    letterSpacing: 2,
    paddingTop: 5,
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
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
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