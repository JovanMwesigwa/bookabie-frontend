import React, { useEffect } from 'react'
import { View, StyleSheet, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native-paper'
import { connect } from 'react-redux'
import { useRoute } from '@react-navigation/native'


import {AppText, CartItemCard, OtherHeaderComponent} from '../../components/'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { fetchCartData } from '../../redux/cart/CartRedux';
import useFetchData from '../../hooks/useFetchData'






const Cart = ({authToken, cartDataLoading, cartData,cartDataErrors, navigation}) => {
  
  const token = authToken;
  
  const route = useRoute()
  
  const { ID } = route.params
  
  const cartPrice = useFetchData(token, `api/cart_cost/${ID}/`)

  const fastRefresh = () => {
    fetchCartData(token)
    cartPrice.request()
  }

  const navigateBack = () => navigation.goBack()

  useEffect(() => {
    fetchCartData(token)
    cartPrice.request()
  },[])


const refreshControl = <RefreshControl
    color="#B83227"
    refreshing={cartDataLoading}
    onRefresh={fastRefresh}
  />

  if (cartData.length === 0){
      return(
        <>
          <OtherHeaderComponent />
          <View style={styles.container}>
            <View style={{backgroundColor: '#ddd', padding: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#777', letterSpacing: 1 }}>My Cart</Text>
            </View>
            <View style={styles.firstContainer}>
              <AntDesign name='shoppingcart' size={50} color="#777" />
              <Text style={styles.fillerText}>You have nothing in your cart</Text>
            </View>
          </View>
      </>
    )
  }else{
    return(
      <>
        <OtherHeaderComponent />
        <View style={styles.container}>
        <View style={{backgroundColor: '#ddd', padding: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#777', letterSpacing: 1 }}>My Cart</Text>
          </View>

            <FlatList
              data={cartData.product}
              showsVerticalScrollIndicator={false}
              refreshControl={refreshControl}
              renderItem={({item}) => (
                <View style={{ flex: 2 }}>
                  <CartItemCard item={item} refreshItems={fastRefresh}  cartPrice={fastRefresh}/>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              ListFooterComponent={
                <>
                <View style={styles.pricing}>
                  <View style={styles.pricingInfo}>
                      <AppText paddingHorizontal={8} fontSize={18} fontWeight='bold' alignSelf="flex-end">Items : {cartData.product.length}</AppText>
                    {
                      cartData.loading ? 
                      <Text style={styles.infoText}>...</Text> :
                      <AppText paddingHorizontal={8} fontSize={18} fontWeight='bold' alignSelf="flex-end"> Shs - {cartPrice.data.cost}</AppText>
                    }
                  </View>
                </View>
                <View style={styles.pricingBtns}>
                  <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('Checkout',{token: token, ID: ID})}>
                    <Text style={styles.checkoutText}> Place Your Order</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn} onPress={navigateBack}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
              </View>
              </>
              }
            />
        
        {
          cartDataErrors ? 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>{cartDataErrors}</Text>
          </View> :
          null
        }
        </View>
      </>
      )
    }
}


const styles = StyleSheet.create({
  container: {
  flex: 1,
  },
  firstContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  fillerText: {
    fontSize: 15,
    color: "#777",
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center"
  },
  cartHeaderStyles: {
    padding: 10,
    zIndex: 2,
    elevation: 5,
    width: "100%",
  },
  pricing: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },
  pricingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoText: {
    fontSize: 15,
    letterSpacing: 1,
  },
  checkoutBtn: {
    padding: 8,
    backgroundColor: GlobalStyles.themeColor.color,
    margin: 8,
    borderRadius: 25,
  },
  cancelBtn: {
    padding: 8,
    backgroundColor:"#fff",
    borderWidth: 1,
    borderColor:  GlobalStyles.themeColor.color,
    margin: 8,
    borderRadius: 25
  },
  checkoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17
  },
  cancelText: {
    color:  GlobalStyles.themeColor.color,
    textAlign: "center",
    fontSize: 17
  },
  pricingBtns: { 
    paddingVertical: 20,
    paddingHorizontal: 10
  },
})

const mapStateToProps = state => {
  return{
    cartData: state.cart.cartItems,
    cartDataLoading: state.cart.loading,
    cartDataErrors: state.cart.errors,
    authToken: state.auth.token
  }
}
const mapDispatchToProps = dispatch => {
  return{
    fetchCartData: (token) => dispatch(fetchCartData(token)),    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)