import React, {  useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import { Title } from 'react-native-paper';
import { fetchCartData } from '../redux/cart/CartRedux';


import SearchComponent from '../components/searchComponent';
import { fetchUserProfile } from '../redux/userProfile/userProfileRedux';



const MainHeaderComponent = ({authToken, parentCartData, cartData,  cartDataFetch, main, userProfile, fetchUser }) => {

    const navigation = useNavigation();

    const token = authToken
    
    useEffect(() => {
      cartDataFetch(token)
      fetchUser(token)
    },[])


const { container } = styles
 return(
    <View style={[styles.container, { height: main ? 100 : 65}]}>
      { main && <Title style={styles.headerText}>Bookabie</Title>}
      
       <View style={styles.headerContainer }>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={{ uri: userProfile.profile.profile_pic }} style={[GlobalStyles.smallRoundedPictContainer, { width: main ? 45 : 40, height:  main ? 45 : 40,}]} />
          </TouchableOpacity>
          <SearchComponent />
          <TouchableOpacity onPress={() => navigation.navigate("Cart", {ID: userProfile.profile.id})} style={styles.cartContainer}>
            <AntDesign name='shoppingcart' size={33} 
            color={GlobalStyles.darkFontColor.color}  />
          </TouchableOpacity>
          {
            parentCartData.errors ? null :
            <>
              {
                parentCartData.loading ? 
                <View style={styles.cartNumberContainer}>
                    <Text style={styles.cartNumber}>..</Text>
                </View> :
                <View style={styles.cartNumberContainer}>
                    <Text style={styles.cartNumber}>{cartData.product.length}</Text>
                </View>
              }
            </>
          }
       </View>
    </View>
  )
}


const styles = StyleSheet.create({
  cartContainer: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 45,
  },
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
    parentCartData: state.cart,
    authToken: state.auth.token,
    userProfile: state.userProfile
  }
}

const mapDispatchToProps = dispatch => {
  return{
    cartDataFetch: token => dispatch(fetchCartData(token)),
    fetchUser: token => dispatch(fetchUserProfile(token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainHeaderComponent)