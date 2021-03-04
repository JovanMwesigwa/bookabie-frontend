import React from 'react'
import { View, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


import AppText from '../AppText'
import { GlobalStyles } from '../../styles/GlobalStyles';



const GalleryModal = ({modalOpen, closeModal, item }) => {

    

const { container } = styles
 return(
        <Modal visible={modalOpen} animationType='slide' style={styles.modal}>
            <View style={container}>

            <View style={styles.topBtns}>

                <View style={styles.userContainer}>
                    <TouchableOpacity style={styles.imageContainer}   >
                        <Image source={{ uri: item.profile_pic }} style={styles.image} />
                    </TouchableOpacity>
                    <View>
                        <AppText color="#fff" fontSize={15}>{item.user}</AppText>
                        <AppText  fontSize={12}>{item.profile_type.name}</AppText>
                    </View>
                </View>

                <TouchableOpacity style={styles.topBtnContainer}  onPress={closeModal} >
                    <MaterialIcons name="close" size={20} color="black" /> 
                </TouchableOpacity>

            </View>

            </View>
        </Modal>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor: 'black'
  },
  image: { 
      flex: 1, 
      width: "100%", 
      height:"100%", 
      resizeMode: "cover" 
    },
imageContainer: {
    borderRadius: 40/2,
    height: 40,
    overflow: 'hidden',
    marginVertical: 12,
    marginHorizontal: 12,
    width: 40,
},
  topBtnContainer: {
      alignItems: 'center',
    padding: 5, 
    backgroundColor: '#777', 
    borderRadius: 64, 
    width: 30,
    height: 30,
    marginVertical: 12,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  topBtns: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  userContainer: {
      alignItems: 'center',
      flexDirection: 'row'
  }
})
export default GalleryModal