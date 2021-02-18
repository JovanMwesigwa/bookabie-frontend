import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import {  FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles';



const ActionButtons = ({name, backgroundColor, comment, color,  onPressHandler}) => {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor, }]} onPress={onPressHandler}>
              <FontAwesome name={name} size={18} color={color} style={{ textAlign: 'center' }} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: { 
        flex: 1, 
        paddingHorizontal: 8, 
        paddingVertical: 3,  
        borderRadius: 9 
    },
})

export default ActionButtons
