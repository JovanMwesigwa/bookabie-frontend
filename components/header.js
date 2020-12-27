import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Icon } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const HeaderComponent = ({ Cart }) => {

  const navigation = useNavigation();

 return(
  <View style={styles.header}>
    <View style={styles.logo}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialIcons name='menu' size={28} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>BookABuy</Text>
    </View>

    <AntDesign name='shoppingcart' size={28} style={styles.cart} onPress={() => navigation.navigate(Cart)} />
    <View style={styles.cartNumberContainer}>
        <Text style={styles.cartNumber}>4</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  header: {
   width: "100%",
   height: 10,
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "center"
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
    position: 'absolute',
    right: 5
  },
  cartNumber: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#B83227",
    padding: 4,
    borderRadius: 12
  },
  cartNumberContainer: {
    position: "absolute",
    right: 1,
    bottom: 1,
    zIndex: 1,
  }
  
})
export default HeaderComponent;