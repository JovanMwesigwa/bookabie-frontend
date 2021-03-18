import React, { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { connect } from 'react-redux'


import {AppText, CheckoutItemCard, OtherHeaderComponent, } from '../../components/'
import { fetchCartData } from '../../redux/cart/CartRedux';
import useFetchData from '../../hooks/useFetchData'





const Checkout = ({ cartData,cartDataErrors }) => {
    
    const route = useRoute()

    const { token, ID } = route.params;

    const cartPrice = useFetchData(token, `api/cart_cost/${ID}/`)

  useEffect(() => {
    fetchCartData(token)
    cartPrice.request()
  },[])

    return (
        <>
        <OtherHeaderComponent name="Checkout" />
            <View style={styles.container}>
                <FlatList
                    data={cartData.product}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 1, width: '100%', backgroundColor: "#ddd" }} />}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                      <View >
                          <CheckoutItemCard item={item} token={token} />
                      </View>
                    )}
                    ListFooterComponent={
                      <View  style={styles.priceContainer}>
                        <AppText 
                          paddingHorizontal={8}
                          paddingVertical={12} 
                          fontSize={18} 
                          fontWeight='bold'
                          alignSelf="flex-end"> Shs - {cartPrice.data.cost}</AppText>
                      </View>
                    }
                />
                {
                    cartDataErrors ? 
                    <View style={styles.errorStyles}>
                        <Text>{cartDataErrors}</Text>
                    </View> :
                    null
                }
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 15,
    },
    errorStyles: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    priceContainer: {
      borderTopWidth: 0.5,
      borderTopColor: "#ddd",
      marginVertical: 20
    }
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

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)

