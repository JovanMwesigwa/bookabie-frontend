import React from 'react'
import { StyleSheet, Text, Image, View, Dimensions, TouchableOpacity } from 'react-native'
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';




const StoryComponent = ({item, onPress, user}) => {

    return (
        <View style={styles.container}>
        <Image
            source={{ uri: item.image }}
            style={{ flex: 1, width: null, height: null, resizeMode: "contain" }}
        />
            <View style={styles.topCurtain}></View>
            <View style={styles.topBtns}>

                <View style={styles.header}>
                    <Image source={{ uri: user.profile_pic }} style={styles.userImage} />
                    <View >
                        <Text style={styles.userStyles} >{user.user}</Text>
                        <Text style={[styles.userStyles, { fontSize: 14, color: "#777" }]} >{ moment(item.created).startOf('hour').fromNow()}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.topBtnContainer}  onPress={onPress} >
                    <MaterialIcons name="close" size={25} color="#fff" /> 
                </TouchableOpacity>

            </View>
            <View style={styles.textContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.text} numberOfLines={4}>{item.content}</Text>
                </View>
            </View>
        </View>
    )
}

const dimensions = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        height: dimensions.height,
        width: dimensions.width
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#777",
        padding: 12,
        opacity: 0.6
    },
    topBtnContainer: {
        padding: 15, 
        borderRadius: 64, 
    },
    topCurtain: {
        // backgroundColor: 'black',
        height: 70,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        opacity: 0.2,
        width: '100%',
    },
    topBtns: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 35,
        position: 'absolute',
        top: 15,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        width: '100%',
    },
    header: { 
        alignItems: 'center', 
        flexDirection: 'row',
        justifyContent: 'center'
},
    userContainer: {
        alignItems: 'center',
        backgroundColor: 'brown',
        borderRadius: 55/2,
        height: 55,
        marginRight: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        width: 55,
    },
    imageContainer: {
        backgroundColor: 'black',
        height: 560,
        flex: 2,
        width: '100%',
    },
    infoContainer: {
        bottom: 0,
        position: 'absolute', 
        width: "100%", 
        opacity: 0.6,
        height: 140, 
        backgroundColor: 'black' 
    },
    imageStyles: {
        opacity: 1,
        height: '100%',
        width: '100%'
    },
    userImage: {  
        borderRadius: 45/2, 
        height:45,
        marginRight: 8,
        width: 45, 
      },
    textContainer: {
        alignSelf: 'center',
        bottom: 45,
        position: 'absolute',
        flexDirection: 'row',
        width: "100%"
    },
    text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: "normal",
        zIndex: 99
    },
    userStyles: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold",
    }
})

export default StoryComponent
