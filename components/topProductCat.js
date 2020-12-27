import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Card, Button } from 'react-native-paper';

const TopProductCat = ({ topBrand }) => {

  // console.log('ACCOUNT IS', topBrand.sponsored_profile);
const { container } = styles
 return(
  <Card style={container}>
       {/* <StatusBar backgroundColor='#fff' barStyle='dark-content' /> */}
        <Image source={{ uri: topBrand.profile_pic }} style={{ flex: 2, width: null, height:null,borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomLeftRadius: 8, borderBottomRightRadius: 8,  resizeMode: "cover" }} />
        <View style={styles.topDescription}>
            <Text style={styles.text}>{topBrand.user}</Text>
            <Text style={styles.secText}>{topBrand.profile_type.name}</Text>   
        </View>
  </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 135,
    backgroundColor: "white",
    margin: 12,
    width: 200,
    borderRadius: 8,
    elevation: 5,
  },
  topDescription: {
    // flex: 1,
    // backgroundColor: '#fff',
    paddingVertical: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3335'
  },
  secText:{
    textAlign: 'center',
    fontSize: 12,
    color: '#7777'
  }
})
export default TopProductCat