import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'


const logo  = require('../../assets/Logos/bbieL.png')
import { GlobalStyles } from '../../styles/GlobalStyles'


const SplashLoadingScreen = () => {
    return (
        <View style={styles.isLoadingStyles}
        >
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          <Image source={logo} style={styles.logoStyles} />
          <Text style={{color: GlobalStyles.themeColor.color}}>Bookabie</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    isLoadingStyles: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 1
    },
    logoStyles: { 
        width: 55, 
        height: 55, 
        resizeMode: 'contain',
        borderRadius: 10 
    },
})

export default SplashLoadingScreen
