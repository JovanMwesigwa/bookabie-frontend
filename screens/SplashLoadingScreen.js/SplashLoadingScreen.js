import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import LottieView from 'lottie-react-native';



const logo  = require('../../assets/Logos/logo.png')
import { GlobalStyles } from '../../styles/GlobalStyles'


const SplashLoadingScreen = () => {
    return (
        <View style={styles.isLoadingStyles}
        >
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
            <View style={styles.logoStyles}>
                <Image source={logo} style={styles.image} />
            </View>
          {/* <Text style={{color: GlobalStyles.themeColor.color}}>Bookabie</Text> */}
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
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
      },
      logoStyles: { 
        borderRadius: 10,
        height: 70, 
        overflow: 'hidden',
        width: 70, 
        marginBottom: 5
    },
})

export default SplashLoadingScreen
