import React, { useEffect } from 'react'
import { View,  StyleSheet, Modal, FlatList, Dimensions, ActivityIndicator, RefreshControl } from 'react-native'


import useFetchData from '../../hooks/useFetchData'
import StoryComponent from '../StoryComponent';



const GalleryModal = ({modalOpen, closeModal, user, token }) => {


    const { data, errors, request, loading } = useFetchData(token, `api/stories/${user.id}/`)

    const deviceWidth = () => {
        const { width } = Dimensions.get('screen')
        return width
    }

    useEffect(() => {
        request()
    },[])

    const refreshPosts = () => {
        request()
      }
    
const refreshControl = <RefreshControl 
    refreshing={loading}
    onRefresh={refreshPosts}
  />

const { container } = styles
 return(
     
    <Modal visible={modalOpen} animationType='slide' >
            
        <View style={styles.modal}>
                {
                    loading ? 
                    <ActivityIndicator size={18} color="#fff" /> :
                    <FlatList
                        data={data.results}
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={refreshControl}
                        renderItem={({ item }) => (
                            <StoryComponent item={item} onPress={closeModal} user={user}/>
                        )}
                        snapToAlignment="center"
                        snapToInterval={deviceWidth()}
                        decelerationRate="fast"
                        horizontal
                        alwaysBounceHorizontal
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                }

        </View>
    </Modal>
  )
}

const dimensions = Dimensions.get('screen')

const styles = StyleSheet.create({
   modal: {
    height: dimensions.height,
    backgroundColor: 'black',
    width: dimensions.width
  },
})


export default GalleryModal