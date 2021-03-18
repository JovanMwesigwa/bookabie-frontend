import React,{ useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'


import AppText from './AppText'
import { GlobalStyles } from '../styles/GlobalStyles'
import useFetchData from '../hooks/useFetchData'


const CheckoutItemCard = ({ item, token }) => {

    const { request, loading, data, errors } = useFetchData(token, `api/profile/${item.author.user}/detail/`)

    useEffect(() =>{
        request()
    },[])

    return (
        <View style={styles.container}>
            {
                item.image &&
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.imageStyles} />
                </View>
            }
            <View style={styles.descriptionContainer}>
                {
                    loading ? <AppText color="#777">...</AppText> :
                    <AppText fontSize={14} fontWeight='bold'>{data.user}</AppText>
                }
                <Text numberOfLines={1} style={{ color: GlobalStyles.darkFontColor.color }}>{item.title}</Text>
                <AppText fontSize={13} color="green">Shs.{item.price}</AppText>
                {
                    item.offer &&
                    <AppText fontSize={13} color="gold">{item.offer} Offer</AppText>
                }
            </View>
            <View style={styles.btnContainer}>
                <View style={styles.delivery}></View>
                <View style={styles.mobileMoney}></View>
                <View style={styles.payPal}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        // flex: 1
        flexDirection: 'row'
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        flexDirection: 'row',
        height: 100,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%'
    },
    delivery: {
        backgroundColor: 'brown',
        borderRadius: 11,
        height: 22,
        width: 22,
    },
    descriptionContainer: {
        flex: 2
    },
    imageContainer: {
        marginRight: 10,
        height: '100%',
        width: 85
    },
    imageStyles: {
        borderRadius: 8,
        height: '100%',
        resizeMode: 'cover',
        width: "100%"
    },
    mobileMoney: {
        backgroundColor: 'gold',
        borderRadius: 11,
        height: 22,
        marginHorizontal: 5,
        width: 22,
    },
    payPal: {
        backgroundColor: 'cyan',
        borderRadius: 11,
        height: 22,
        width: 22,
    }
})

export default CheckoutItemCard
