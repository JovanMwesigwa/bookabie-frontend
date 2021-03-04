import React from 'react'
import { StyleSheet, Text, Platform } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'

const AppText = ({ children, ...otherStyles }) => {
    return (
        <Text style={[styles.text, {...otherStyles}]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: GlobalStyles.darkFontColor.color,
        fontSize: 16,
        // fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Sans'
    }
})

export default AppText
