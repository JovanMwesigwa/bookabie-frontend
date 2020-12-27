import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';


const FullImageModal = ({showModal, closeModal, image }) => {

const { container } = styles
 return(
        <Modal visible={showModal} animationType='slide' style={styles.modal}>

            <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.topBtnContainer} >
                    <MaterialIcons name="close" size={28} color="black" onPress={() => closeModal(false)} /> 
                </TouchableOpacity>

                <Image source={{uri: image }} style={{flex: 1, width: null, height: null, resizeMode: 'contain'}} />
            </View>

        </Modal>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,

  },
  topBtnContainer: {
    padding: 5, 
    backgroundColor: '#fff', 
    borderRadius: 3, 
    width: 38,
    marginVertical: 12,
    marginHorizontal: 12
  },
})
export default FullImageModal