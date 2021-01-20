import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import axios from 'axios'
import { AuthContext } from '../context/authentication/Context'
import { ActivityIndicator } from 'react-native';



const CartItemCard = ({ item, refreshItems }) => {

  const navigation = useNavigation();

  const { authState } = useContext(AuthContext);

  const [ isLoading, setIsLoading ] = useState(false);

  const token = authState.token

  const removeFromCart = async() => {
    await axios.delete(`${APIROOTURL}/api/cart_item/${item.id}/remove/`, {
      headers: {
        'Authorization': `Token ${token}`, 
      }
    })
    
    .then(res => {
      refreshItems()
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleRemoveProduct = () => {
    setIsLoading(true);
    setTimeout(() => {
    removeFromCart();
    },1000)
  }

const { container } = styles
 return(
  <View style={container}>
      <View style={styles.cardContainer}>
            { item.product.image == null ? null :
            <Image source={{uri:item.product.image}} style={{ flex: 2, width: null, height:null, borderRadius: 12, resizeMode: "cover" }} />
            }
            <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
                <TouchableOpacity style={{ flex: 1 }} 
                  onPress={() => navigation.navigate("Product Details", { post: item, ID: item.product.id,})}
                >
                  <Text numberOfLines={1} style={{...GlobalStyles.darkHeaderText, fontSize: 15}}>{item.product.title}</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={{...GlobalStyles.greyTextSmall, flex: 1, fontSize: 13}}>From - {item.product.author.user}</Text>
                {
                  item.product.price ? <Text style={{ color: '#218F76', fontWeight: "700",  }}>$ {item.product.price}</Text> :
                  <Text style={{  flex: 1, color: '#218F76', fontWeight: "700",  }}>OFFER</Text>
                } 
                {
                  item.product.offer ? <Text style={styles.offerStyles}>{item.product.offer} Off</Text> :
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
export default CartItemCard
