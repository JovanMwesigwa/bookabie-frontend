import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { FontAwesome} from '@expo/vector-icons';
import { Surface} from 'react-native-paper';
import { connect } from 'react-redux'




import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import { fetchaddItemToCart, fetchCartItemRemoveNoRefresh } from '../redux/cart/CartRedux';
import useFetchData from '../hooks/useFetchData'
import useActionButton from '../hooks/useButtonAction'
import useCheck from '../hooks/useCheck'



const TopProduct = ({authUserID, addToCartFunc, removeCartItemFunc, image, token, item, onReload, self}) => {

    const { request } = useFetchData(token, `api/remove_topproduct/${item.id}/`)

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

    const remove = () => {
        onReload()
        request()
    }


    return (
        <Surface style={ styles.descriptionContainer }>
            {
                image &&
                <Image source={{ uri: `${APIROOTURL}${image}` }} style={styles.imageStyles} />
            }
            <View style={{ flex: 2 }}>
                <Text style={styles.mainText} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.secondaryText} numberOfLines={1}>{item.description}</Text>
                {
                  item.price &&
                  <Text style={{ color: '#218F76', fontWeight: "700" }}>${item.price}</Text>
                }
            </View>
            {
                self ?
                <TouchableOpacity onPress={remove}>
                    <View style={styles.actionBtns}>
                        <FontAwesome name="trash" color="red" size={22} style={styles.icon} />
                    </View>
                </TouchableOpacity>  :
                <>
                {
                    !addedToCart ? 
                    <TouchableOpacity onPress={addToCartHandler}>
                        <View style={styles.actionBtns}>
                            <FontAwesome name="plus" color="#1287A5" size={22} style={styles.icon} />
                        </View>
                    </TouchableOpacity> :
                    <>
                        <View style={styles.actionBtns}>
                            <FontAwesome name="check" color="#1287A5" size={22} style={styles.icon} />
                        </View>
                    </>
                }
                </>
            }
        </Surface>
    )
}

const styles = StyleSheet.create({
    actionBtns: {
        padding: 12,
        justifyContent: 'flex-end',
        paddingHorizontal: 5,
        flexDirection: 'row',
        width: 35,
    },
    descriptionContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        height: 100,
        padding: 10,
        borderTopWidth: 0.5,
        borderTopColor: "#ddd"
      },
      icon: {
       
      },
    imageStyles: { 
        flex: 1, 
        width: null, 
        marginRight: 12,
        height:null, 
        borderRadius: 12, 
        resizeMode: "cover"
     },
    mainText: {
        fontSize: 14, 
        color: '#2C3335', 
        fontWeight: '700'
      },
      secondaryText: {
        color: '#777E8B'
      },
})

const mapStateToProps = state => {
    return{
      cartData: state.cart.cartItems
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return{
      addToCartFunc: (token, id) => dispatch(fetchaddItemToCart(token, id)),
      removeCartItemFunc: (token, id) => dispatch(fetchCartItemRemoveNoRefresh(token, id)),
      cartItemDetailsFunc: (token, id) => dispatch(fetchCartItemDetails(token, id)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TopProduct)
