import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons, AntDesign,FontAwesome5, Feather } from '@expo/vector-icons';


const FullImageModal = ({showModal, closeModal, image, comments, likes }) => {



const { container } = styles
 return(
        <Modal visible={showModal} animationType='slide' style={styles.modal}>

            <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.topBtnContainer} >
                    <MaterialIcons name="close" size={28} color="black" onPress={() => closeModal(false)} /> 
                </TouchableOpacity>

                <Image source={{uri: image }} style={{flex: 2, width: null, height: null, resizeMode: 'contain'}} />
            </View>
        <View style={{backgroundColor: 'black', justifyContent: 'space-evenly', flexDirection: 'row'}}>
          {
            likes === 0 ? <Text style={{ color: '#777',  }}>0 likes</Text> :
            <Text style={{ color: '#777', }}>{likes} likes</Text>
          } 
          {
            comments === 0 ? <Text style={{ color: '#777',  }}>0 Comments</Text> :
            <Text style={{ color: '#777',  }}>{comments} Comments</Text>
          }
            <Text style={{ color: '#777', }}>0  Shares</Text>
          
        </View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.likeStyle}>
            <FontAwesome5 name="heart" size={18} color="#616C6F" style={{ textAlign: 'center' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentStyle}>
            <FontAwesome5 name="comment" size={18} color="#616C6F" style={{ textAlign: 'center' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareStyle}>
            <Feather name="share-2" size={18} color="#616C6F" style={{ textAlign: 'center' }} />
          </TouchableOpacity>
        </View>
        </Modal>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,

  },
  likeStyle: {
    flex: 1,
    padding: 5
  },
  commentStyle: {
    flex: 1,
    padding: 5
  },
  shareStyle: {
    flex: 1,
    padding: 5
  },
  topBtnContainer: {
    padding: 5, 
    backgroundColor: '#777', 
    borderRadius: 64, 
    width: 38,
    marginVertical: 12,
    marginHorizontal: 12,
    elevation: 5
  },
  bottomButtons: {
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: '#616C6F',
    height: 40,  
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black'
  }
})
export default FullImageModal