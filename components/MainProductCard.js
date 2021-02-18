import React,{ useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { connect } from 'react-redux';
import { fetchaddItemToCart, fetchCartItemRemove } from '../redux/cart/CartRedux';
import { useNavigation } from '@react-navigation/native'


const MainProductCard = ({ item, authToken, addToCartFunc, removeItemFromCartFunc }) => {

  const navigation = useNavigation()

  const [ addedToCart, setAddToCart ] = useState(false);

  const [ loading, setLoading ] = useState(false);

  const addToCartData = {
    product: item.id,
}


const token = authToken

  const addToCart = () => {
    setLoading(true);
    setAddToCart(true)
  }

  const removeFromCart = () => {
    setLoading(true);
    setAddToCart(false)
  }

  const fetchaddItemToCart = () => {
    addToCart()
    addToCartFunc(token, addToCartData);
    setLoading(false)
  }

  const fetchRemoveItemToCart = () => {
    removeFromCart()
    removeItemFromCartFunc(token, item.id)
    setLoading(false)
  }

const { container } = styles
 return(
  <View style={container}>
      <View style={styles.cardContainer}>
            { item.image == null ? null :
            <Image source={{uri:item.image}} style={{ flex: 2, width: null, height:null, borderRadius: 12, resizeMode: "cover" }} />
            }
            <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
                <TouchableOpacity style={{ flex: 1 }} 
                  onPress={() => navigation.navigate("Product Details", { post: item, ID: item.id,})}
                >
                  <Text numberOfLines={1} style={{...GlobalStyles.darkHeaderText, fontSize: 15}}>{item.title}</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={{...GlobalStyles.greyTextSmall, flex: 1, fontSize: 13}}>From - {item.author.user.username}</Text>
                {
                  item.price ? <Text style={{  flex: 1, color: '#218F76', fontWeight: "700",  }}>$ {item.price}</Text> :
                  <Text style={{  flex: 1, color: '#218F76', fontWeight: "700",  }}>OFFER</Text>
                } 
                {
                  item.offer ? <Text style={styles.offerStyles}>{item.offer} Off</Text> :
                  null
                
                }
                  {
                    addedToCart ? 
                    <TouchableOpacity onPress={fetchRemoveItemToCart}>
                        <Text style={styles.outlineCartBtn}>Added to Cart</Text> 
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={fetchaddItemToCart}>
                        <Text style={styles.cartBtn}>Add to Cart</Text>
                    </TouchableOpacity>
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
  outlineCartBtn: {
    backgroundColor: 'white', 
    color: GlobalStyles.themeColor.color, 
    fontSize: 12, 
    padding: 5, 
    borderRadius: 5, 
    textAlign: 'center' ,
    borderWidth: 1,
    borderColor: GlobalStyles.themeColor.color,
  },
  cartBtn: { 
    backgroundColor: GlobalStyles.themeColor.color, 
    color: 'white', 
    fontSize: 12, 
    padding: 5, 
    borderRadius: 5, 
    textAlign: 'center' 
  },
  mainText: {
      fontSize: 15,
      fontWeight: '600'
  },
  secondaryText: {
    color: '#777E8B'
  },
  offerStyles: { flex: 1, fontSize: 13,color: '#2C3335', fontWeight: "bold", color: "gold", fontWeight: 'bold'},
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
    removeItemFromCartFunc: (token, id) => dispatch(fetchCartItemRemove(token, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProductCard)