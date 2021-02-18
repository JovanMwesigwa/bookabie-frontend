import React from 'react'
import { StatusBar } from 'react-native'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import MainHeaderComponent from './MainHeaderComponent'


const noConnectionImage = require('../assets/images/noint.png'); 


const ErrorView = ({ error = "No connection",  onPress }) => {
    return (
        <>
        <StatusBar backgroundColor='#ddd' barStyle='light-content' />
        <View style={{ flex: 1, margin: 25 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={noConnectionImage} style={{ width: 30, height: 30}} />
          <Text style={GlobalStyles.primaryText}>{error}</Text> 
        </View> 
              
          <TouchableOpacity style={styles.refreshBtn}
              onPress={onPress}
              >
                <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15}}>Refresh</Text>
          </TouchableOpacity>
          
        </View>
      </>
    )
}

const styles = StyleSheet.create({
    refreshBtn: {
        padding: 8, 
        backgroundColor: GlobalStyles.themeColor.color, 
        borderRadius: 15, 
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginHorizontal: 95
      },
})

export default ErrorView
