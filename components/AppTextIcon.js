import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';



import { GlobalStyles } from '../styles/GlobalStyles';



const AppTextIcon = ({icon, onPressFunc, title}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPressFunc}>
            <MaterialIcons name={icon} size={18} color="#777" />
            <Text style={GlobalStyles.customGreyText}>{title}</Text>
       </TouchableOpacity>
    )
}

export default AppTextIcon

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center'},
})
