import React from 'react'
import { StyleSheet, TouchableOpacity, View, } from 'react-native'
import { MaterialCommunityIcons} from '@expo/vector-icons';

import AppText from './AppText'



const CategoryPickerComponent = ({closeModal, item, getCategoryName}) => {


    const setCategory = () => {
        getCategoryName(item)
        closeModal()
    }
    
    return (
        <TouchableOpacity onPress={setCategory}>
              <View style={[styles.container]} >
                <View style={[styles.iconContainer, {backgroundColor: item.color}]}>
                    <MaterialCommunityIcons name={item.icon} size={28} color="#ddd" />
                </View>
                    <AppText fontSize={16} textAlign="center">{item.name}</AppText>   
              </View>
          </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },  
    iconContainer: { 
        alignItems: 'center',
        borderRadius: 55/2,
        height: 55,  
        marginRight: 10,
        justifyContent: 'center',
        width: 55, 
    },
    text: {
        fontSize: 13, 
        textAlign: 'center',
      },
})

export default CategoryPickerComponent
