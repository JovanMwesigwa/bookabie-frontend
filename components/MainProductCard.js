import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native'



import { fetchaddItemToCart, fetchCartItemRemoveNoRefresh } from '../redux/cart/CartRedux';
import useCheck from '../hooks/useCheck'


const MainProductCard = ({ item, authToken, addToCartFunc, removeCartItemFunc }) => {

  const navigation = useNavigation()

  const token = authToken

  // This action button hook is called when a user adds an item to the cart..
  // passing in the token and the url
  const { 
    approved: addedToCart, 
    setApproved: setAddedToCart 
  } = useCheck(token, `api/check_in_cart/${item.id}`)


  const addToCart = () => {
    setAddedToCart(true);
  }

  const addToCartHandler = () => {
    addToCart();
    addToCartFunc(token, item.id);
  }

  const removeFromCart = () => {
    setAddedToCart(false);
    removeCartItemFunc(token, item.id)
  }

const { container } = styles
 return(
  <View style={container}>
      <View style={styles.cardContainer}>
            { item.image == null ? null :
            <Image source={{uri:item.image}} style={{ flex: 2, width: null, height:null, borderRadius: 12, resizeMode: "cover" }} />
            }
            <View style={styles.infoContainer}>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Product Details", { post: item, ID: item.id,})}
                >
                  <Text numberOfLines={1} style={{...GlobalStyles.darkHeaderText, fontSize: 15}}>{item.title}</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={{...GlobalStyles.greyTextSmall, fontSize: 13}}>From - {item.author.user.username}</Text>
                {
                  item.price ? <Text style={{ color: '#218F76', fontWeight: "700",  }}>$ {item.price}</Text> :
                  <Text style={{color: '#218F76', fontWeight: "700",  }}>OFFER</Text>
                } 
                {
                  item.offer && <Text style={styles.offerStyles}>{item.offer} Off</Text> 
                  
                }
              </View>
                {
                  item.price &&
                  <>
                    {
                      addedToCart ? 
                      <TouchableOpacity onPress={removeFromCart}>
                          <Text style={styles.outlineCartBtn}>Added to Cart</Text> 
                      </TouchableOpacity> :
                      <TouchableOpacity onPress={addToCartHandler}>
                          <Text style={styles.cartBtn}>Add to Cart</Text>
                      </TouchableOpacity>
                    }
                  </>
                }
            </View>
      </View>
  </View>
  )
}


const styles = StyleSheet.create({
container: {
  flex: 1,
},
cardContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    height: 145,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    padding: 10,
    paddingVertical: 12,
  },
  infoContainer: { 
    flex: 2, 
    paddingLeft: 20, 
    justifyContent: 'space-between' 
},
  outlineCartBtn: {
    backgroundColor: 'white', 
    borderWidth: 1,
    borderColor: GlobalStyles.themeColor.color,
    borderRadius: 15, 
    color: GlobalStyles.themeColor.color, 
    fontSize: 12, 
    marginTop: 12,
    padding: 5, 
    textAlign: 'center' ,
  },
  cartBtn: { 
    backgroundColor: GlobalStyles.themeColor.color, 
    color: 'white', 
    fontSize: 12, 
    padding: 5, 
    marginTop: 12,
    borderRadius: 15, 
    textAlign: 'center' 
  },
  mainText: {
      fontSize: 15,
      fontWeight: '600'
  },
  secondaryText: {
    color: '#777E8B'
  },
  offerStyles: { 
    flex: 1, 
    fontSize: 13,
    color: '#2C3335', 
    fontWeight: "bold", 
    color: "gold", 
    fontWeight: 'bold'
},
  cartBtnContainer: {
      flex: 1,
      padding: 5,
      paddingLeft: 0,
  }
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addToCartFunc: (token, id) => dispatch(fetchaddItemToCart(token, id)),
    removeCartItemFunc: (token, id) => dispatch(fetchCartItemRemoveNoRefresh(token, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProductCard)