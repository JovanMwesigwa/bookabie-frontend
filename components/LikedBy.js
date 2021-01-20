import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const LikedBy = ({item}) => {

    // console.log(item.liker);
const { container } = styles
 return(
  <View style={container}>
    <Image source={{ uri: item.liker.profile_pic }} style={{ width: 25, height: 25, borderRadius: 25, borderWidth: 0.1, borderColor: '#777'}} />
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   elevation: 2
//    justifyContent: 'center',
//    alignItems: 'center',
  }
})
export default LikedBy