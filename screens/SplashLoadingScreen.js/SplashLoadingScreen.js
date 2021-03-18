import React from 'react'
import { StyleSheet, View, StatusBar, Image } from 'react-native'



const logo  = require('../../assets/Logos/logo.png')


const SplashLoadingScreen = () => {
    return (
        <View style={styles.isLoadingStyles}
        >
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
            <View style={styles.logoStyles}>
                <Image source={logo} style={styles.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    isLoadingStyles: { 
        alignItems: 'center', 
        backgroundColor: '#fff',
        bottom: 0,
        flex: 1, 
        justifyContent: 'center', 
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
      },
      logoStyles: { 
        borderRadius: 75/2,
        height: 75, 
        marginBottom: 5,
        overflow: 'hidden',
        width: 75, 
    },
})

export default SplashLoadingScreen
