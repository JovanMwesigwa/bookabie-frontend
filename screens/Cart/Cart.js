import React, { useEffect, useReducer, useContext, useState } from 'react'
import { View, StyleSheet, RefreshControl, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import axios from 'axios';
import OtherHeaderComponent from '../../components/OtherHeaderComponent'
import { AntDesign } from '@expo/vector-icons';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { AuthContext } from '../../context/authentication/Context'
import { Text } from 'react-native-paper'
import CartItemCard from '../../components/CartItemCard';
import MainProductCard from '../../components/MainProductCard';




const initialState = {
  loading: true,
  products: [],
  errors: ""
}

const reducer = (state, action) => {
  switch(action.type){
    case "FETCH_SUCCESS":
      return {
        loading: false,
        products: action.payload,
        errors: ""
      }
    case "FETCH_FAILED":
      return{
        loading: false,
        products: [],
        errors: "Something occured while fetching your cart information."
      }

    default:
      return state;
  }
}


const Cart = ({navigation}) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const [ totalProducts, setTotalProducts ] = useState(0);

  const { authState } = useContext(AuthContext);

  const token = authState.token;

  const navigateBack = () => {
    navigation.goBack()
  }

  const fetchCartData = () => {
      axios.get(`${APIROOTURL}/api/my_cart/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(res => {
        dispatch({type: "FETCH_SUCCESS", payload: res.data.results})
        setTotalProducts(res.data.count);
      })
      .catch(err => {
        dispatch({type: "FETCH_FAILED"})
      })
  }

  const fastRefresh = () => {
    fetchCartData()
  }

  useEffect(() => {
    fetchCartData()
  },[])

const refreshControl = <RefreshControl
    color="#B83227"
    refreshing={state.loading}
    onRefresh={fastRefresh}
  />

  if (state.products.length === 0){
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
        {
          state.loading ? 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <ActivityIndicator size='small' collapsable color='#B83227' />
            </View>
            :
            <FlatList
              data={state.products}
              refreshControl={refreshControl}
              renderItem={({item}) => (
                <View style={{ flex: 2 }}>
                  <CartItemCard item={item} refreshItems={fastRefresh} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
        }
        {
          state.errors ? 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>{state.errors}</Text>
          </View> :
          null
        }
          <View style={styles.pricing}>
            <View style={styles.pricingInfo}>
              <Text style={styles.infoText}>Items - {totalProducts}</Text>
              <Text style={styles.infoText}>Price - </Text>
            </View>
          </View>
          <View style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}> Place Your Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
    padding: 12,
    backgroundColor:"#B83227",
    margin: 8,
    borderRadius: 8,
  },
  cancelBtn: {
    padding: 12,
    backgroundColor:"#fff",
    borderWidth: 1,
    borderColor: "#B83227",
    margin: 8,
    borderRadius: 8
  },
  checkoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17
  },
  cancelText: {
    color: "#B83227",
    textAlign: "center",
    fontSize: 17
  }
})
export default Cart