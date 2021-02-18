import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation} from '@react-navigation/native'



const CompanyCard = ({  item, authUserName }) => {

  const navigation = useNavigation();


const { container } = styles
 return(
  <View style={container}>
      <View style={styles.cardContainer}>

      { authUserName === item.user ? 
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { ID: item.id, })}>
            <Image source={{ uri: item.profile_pic }} style={GlobalStyles.largeRoundedPictContainer} />
          </TouchableOpacity> :


          <TouchableOpacity onPress={() => navigation.navigate("CompanyProfile", { ID: item.id, })}>
            <Image source={{ uri: item.profile_pic }} style={GlobalStyles.largeRoundedPictContainer} />
          </TouchableOpacity> 

      }


            <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
            { authUserName === item.user ? 
                <TouchableOpacity onPress={() => navigation.navigate("Profile", 
                { ID: item.id, })}>
                  <Text style={{...GlobalStyles.text, fontWeight: '700'}}>{item.user}</Text>
                </TouchableOpacity> :

                <TouchableOpacity onPress={() => navigation.navigate("CompanyProfile", 
                { ID: item.id, })}>

                  <Text style={{...GlobalStyles.text, fontWeight: '700'}}>{item.user}</Text>
                </TouchableOpacity>
            
            }
                <Text style={GlobalStyles.mutedText}>{item.profile_type.name}</Text>
                <Text style={{ color: GlobalStyles.greenColor.color, fontWeight: "700" }}>{item.location}</Text>
                <Text style={{ fontSize: 13,color: '#2C3335', fontWeight: "bold", color: "gold", fontWeight: 'bold'}}>Open</Text>
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
    borderRadius: 5,
    borderTopWidth: 0.8,
    borderTopColor: "#ddd",
    padding: 18,
    paddingLeft: 24,
    paddingRight: 24,
    // paddingTop: 24,
    // paddingBottom: 24,
    // marginLeft: 24,
    // marginRight: 24,
    // height: 95,
    // width: "85%",
    // borderRadius: 5,
    // borderTopWidth: 0.8,
    // borderTopColor: "#ddd",
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