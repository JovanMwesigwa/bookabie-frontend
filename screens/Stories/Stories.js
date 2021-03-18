import React, { useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native'


import {AppText, StoryComponent } from '../../components/AppText'
import useFetchData from '../../hooks/useFetchData'


const Stories = () => {

    const navigation = useNavigation()

    const route = useRoute();

    const { item, token } = route.params

    const { data, errors, request, loading } = useFetchData(token, `api/stories/${item.id}/`)

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

    return (
        <View style={styles.container}>
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

                    <TouchableOpacity style={styles.topBtnContainer}  onPress={() => navigation.goBack()} >
                        <MaterialIcons name="close" size={20} color="black" /> 
                    </TouchableOpacity>

                </View>

                <>
                    {
                        loading ? 
                        <ActivityIndicator size={18} color="#fff" /> :
                        <FlatList
                            data={data.results}
                            keyExtractor={(item) => item.id.toString()}
                            refreshControl={refreshControl}
                            renderItem={({ item }) => (
                                <StoryComponent item={item} />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    }
                </>

        </View>
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
         height: 65,
         justifyContent: 'space-between',
         width: '100%',
       },
       userContainer: {
           alignItems: 'center',
           flexDirection: 'row'
       },
       storyContainer: { 
         flex: 1,
       }
})

export default Stories
