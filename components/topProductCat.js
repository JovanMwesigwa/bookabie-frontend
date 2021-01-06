import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native'
import { AntDesign, } from '@expo/vector-icons';
import { Card, Button } from 'react-native-paper';

const TopProductCat = ({ topBrand }) => {

  // console.log('ACCOUNT IS', topBrand.sponsored_profile);
const { container } = styles
 return(
  <Card style={container}>
      <View style={{ flex: 2, }}>
        <Image source={{ uri: topBrand.profile_pic }} style={{ flex: 1,   borderRadius: 5, width: null, height:null, resizeMode: "cover" }} />
      </View>
        <View style={styles.topDescription}>
          <View style={{ flexDirection: "row", justifyContent: 'center' }}>
            <Text style={styles.text}>{topBrand.user}</Text>
            <AntDesign name="star" size={10} color="black" />
          </View>
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
    paddingVertical: 2,
    position: 'absolute',
    backgroundColor: "#fff",
    backfaceVisibility: "hidden",
    width: "100%",
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
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