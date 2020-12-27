import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native'


const CompanyCard = ({  item, companyName }) => {

  const navigation = useNavigation();

//  console.log(item);

const { container } = styles
 return(
  <View style={container}>
      <View style={styles.cardContainer}>
            <Image source={{ uri: item.profile_pic }} style={{ width: 60, height: 60 , borderRadius: 50, resizeMode: "cover" }} />
            <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>

            { companyName != item.user ? 
                <TouchableOpacity onPress={() => navigation.navigate("CompanyProfile", 
                { ID: item.id, })}>
  
                  <Text style={{...GlobalStyles.text, fontWeight: '700'}}>{item.user}</Text>
                </TouchableOpacity> :

                <TouchableOpacity onPress={() => navigation.navigate("Profile", 
                { ID: item.id, })}>

                  <Text style={{...GlobalStyles.text, fontWeight: '700'}}>{item.user}</Text>
                </TouchableOpacity>
            
            }
                <Text style={GlobalStyles.mutedText}>{item.profile_type.name}</Text>
                <Text style={{ color: '#218F76', fontWeight: "700" }}>{item.location}</Text>
                <Text style={{ fontSize: 13,color: '#2C3335', fontWeight: "bold", color: "gold", fontWeight: 'bold'}}>Open</Text>
                {/* <TouchableOpacity style={styles.cartBtnContainer} >
                    <Text style={{ backgroundColor: 'red', color: 'white', padding: 5, borderRadius: 12, textAlign: 'center' }}>Add to Cart</Text>
                </TouchableOpacity> */}
            </View>
      </View>
  </View>
  )
}


const styles = StyleSheet.create({
container: {
    
},
cardContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    // flex: 1,
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: '#ddd',
    padding: 18,
  },
  mainText: {
      fontSize: 15,
      fontWeight: '600'
  },
  secondaryText: {
    color: '#777E8B'
  },
  cartBtnContainer: {
      padding: 5,
      paddingLeft: 0,
  }
})
export default CompanyCard