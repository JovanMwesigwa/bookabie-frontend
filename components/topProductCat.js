import React, { useState } from 'react'
import { View,  StyleSheet, Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { GlobalStyles } from '../styles/GlobalStyles'
import GalleryModal from './Modals/GalleryModal'

import { useNavigation } from '@react-navigation/native'


const TopProductCat = ({ topBrand, token }) => {

  const [ showing, setShowing ] = useState(false);

  const navigation = useNavigation()

  const open = () => {
    setShowing(true)
  }

  const close = () => {
    setShowing(false)
  }

  // () => navigation.navigate('Stories', { item: topBrand, token: token})


const { container } = styles
 return(
   <>
    <GalleryModal modalOpen={showing} closeModal={close} user={topBrand} token={token} />
    <TouchableWithoutFeedback onPress={open}>
        <View style={styles.outer}>
          <View style={container}>
                <Image source={{ uri: topBrand.profile_pic }} style={{ flex: 1,   borderRadius: 5, width: null, height:null, resizeMode: "cover" }} />
          </View>
        </View>
    </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 73,
    backgroundColor: "black",
    width: 73,
    borderRadius: 75/2,
    overflow: 'hidden',
    elevation: 5,
  },
  outer: {
  
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 85/2,
    borderStyle: 'dashed',
    borderColor: GlobalStyles.blue.color,
    height: 85, 
    width: 85,
    justifyContent: 'center'
  }
})
export default TopProductCat