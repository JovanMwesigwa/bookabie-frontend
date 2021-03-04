import React from 'react'
import { StyleSheet, View } from 'react-native'
import  Constants from 'expo-constants'


const Screen = ({children}) => {
    return (
        <View styles={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E6EDED",
        // paddingTop:  Constants.statusBarHeight
    }
})

export default Screen
