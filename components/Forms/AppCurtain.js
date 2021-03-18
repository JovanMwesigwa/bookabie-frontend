import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'

const AppCurtain = ({ loading }) => {
    if(!loading) return null
    return (
        <View style={styles.curtain} >
            <ActivityIndicator 
            color={GlobalStyles.themeColor.color} 
            size={35}
            style={styles.loader}
            />
      </View>
    )
}

const styles = StyleSheet.create({
    curtain: { 
        alignItems: 'center',
        backgroundColor: '#fff', 
        height: 600, 
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        width: '100%', 
        opacity: 0.5,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        left: '50%',
        right: '50%'
    }
})

export default AppCurtain
