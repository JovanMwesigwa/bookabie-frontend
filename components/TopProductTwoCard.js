import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { FontAwesome} from '@expo/vector-icons';
import { Surface} from 'react-native-paper';


import useFetchData from '../hooks/useFetchData'
import { GlobalStyles } from '../styles/GlobalStyles';


const TopProductTwoCard = ({ image, token, item, onReload, self}) => {

    const [ added, setAdded ] = useState(false)

    const addedProductAPICall = useFetchData(token, `api/add_to_topproduct/${item.id}/`)

    const removeProductAPICall = useFetchData(token, `api/remove_topproduct/${item.id}/`)


    const add = () => {
        setAdded(true)
        addedProductAPICall.request()
    }

    const remove = () => {
        setAdded(false)
        removeProductAPICall.request()
    }


    return (
        <Surface style={ styles.descriptionContainer }>
            {
                item.image &&
                <Image source={{ uri: item.image }} style={styles.imageStyles} />
            }
            <View style={{ flex: 2, }}>
                <Text style={styles.mainText} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.secondaryText} numberOfLines={1}>{item.description}</Text>
                {
                    item.price &&
                    <Text style={{ color: '#218F76', fontWeight: "700" }}>${item.price}</Text>
                }
            </View>
            {
                added ? 
                <TouchableOpacity onPress={remove}>
                    <View style={styles.actionBtns}>
                        <FontAwesome name="check" color={GlobalStyles.themeColor.color} size={18} style={styles.icon} />
                    </View>
                </TouchableOpacity> :

                 <TouchableOpacity onPress={add}>
                    <View style={styles.actionBtns}>
                        <FontAwesome name="plus" color={GlobalStyles.themeColor.color} size={18} style={styles.icon} />
                    </View>
                </TouchableOpacity>
            }


        </Surface>
    )
}

const styles = StyleSheet.create({
    actionBtns: {
        padding: 12,
        justifyContent: 'flex-end',
        paddingHorizontal: 5,
        flexDirection: 'row',
        width: 65,
    },
    descriptionContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        height: 100,
        padding: 10,
        borderTopWidth: 0.5,
        borderTopColor: "#ddd"
      },
      icon: {
       
      },
    imageStyles: { 
        flex: 1, 
        width: null, 
        height:null, 
        marginRight: 12,
        borderRadius: 12, 
        resizeMode: "cover"
     },
    mainText: {
        fontSize: 14, 
        color: '#2C3335', 
        fontWeight: '700'
      },
      secondaryText: {
        color: '#777E8B'
      },
})

export default TopProductTwoCard
