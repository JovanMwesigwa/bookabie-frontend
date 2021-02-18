import React from 'react'
import { View,  StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const CartComponent = ({ Cart }) => {

  const navigation = useNavigation();

  // const { email, id, username } = useContext(UserInfoContext)

  // console.log(username);

 return(
  <View style={styles.header}>
    {/* <Text>{name}</Text> */}
    <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.openDrawer()}>
        
        {/* <Image source={profPic} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} /> */}
    </TouchableOpacity>

    <AntDesign name='shoppingcart' size={28} style={styles.cart} onPress={() => navigation.navigate("Cart")} />
    <View style={styles.cartNumberContainer}>
        {/* <Text style={styles.cartNumber}>8</Text> */}
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 8,
    paddingHorizontal: 27
  },
  profileContainer: { 
    backgroundColor: '#ddd', 
    padding: 18, 
    width: 25, 
    height: 25, 
    borderRadius: 65 
},
  headerText: {
    // fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    paddingHorizontal: 18
    // letterSpacing: 1
  },
  logo: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0.1
  },
  cart: {
    color: 'white'
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

  }
  
})
export default CartComponent;