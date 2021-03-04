import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { fetchCartItemRemove } from '../redux/cart/CartRedux';
import { connect } from 'react-redux'


const CartItemCard = ({ item, refreshItems, authToken, removeCartItemFunc }) => {

  const navigation = useNavigation();

  const [ isLoading, setIsLoading ] = useState(false);

  const token = authToken

  const handleRemoveProduct = () => {
    setIsLoading(true);
    setTimeout(() => {
      removeCartItemFunc(token, item.id)
    },500)
  }

const { container } = styles
 return(
  <View style={container}>
       <View style={styles.cardContainer}>
            { 
              item.image ? <Image source={{uri:item.image}} style={{ flex: 2, width: null, height:null, borderRadius: 12, resizeMode: "cover" }} /> 
              :
              <View></View> 
            }
            <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
                <TouchableOpacity style={{ flex: 1 }} 
                  onPress={() => navigation.navigate("Product Details", { post: item, ID: item.id,})}
                >
                  <Text numberOfLines={1} style={{...GlobalStyles.darkHeaderText, fontSize: 15}}>{item.title}</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={{...GlobalStyles.greyTextSmall, flex: 1, fontSize: 13}}>From - {item.author.user}</Text>
                {
                  item.price ? <Text style={{ color: '#218F76', fontWeight: "700",  }}>$ {item.price}</Text> :
                  <Text style={{  flex: 1, color: '#218F76', fontWeight: "700",  }}>OFFER</Text>
                } 
                {
                  item.offer ? <Text style={styles.offerStyles}>{item.offer} Off</Text> :
                  null
                
                }
                <TouchableOpacity onPress={handleRemoveProduct}>
                  {
                    isLoading ? <ActivityIndicator size={18} color="#B83227" /> :
                    <Text style={styles.cartBtn}>Remove</Text>
                  }
                </TouchableOpacity>
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
    flex: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    height: 145,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    padding: 10,
    paddingVertical: 12,
  },
  cartBtn: { 
    backgroundColor: "white", 
    borderWidth: 1,
    borderColor: '#B83227',
    color: '#B83227', 
    fontSize: 12, 
    padding: 5, 
    borderRadius: 5, textAlign: 'center' },
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
    authToken: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    removeCartItemFunc: (token, id) => dispatch(fetchCartItemRemove(token, id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartItemCard)
