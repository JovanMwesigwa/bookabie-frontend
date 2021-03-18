import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';


import { GlobalStyles } from '../styles/GlobalStyles';



const LoadMoreComponent = ({ onPress, title }) => {
    return (
        <Animatable.View style={styles.footerStyles}
                animation='fadeInUp'
                delay={900}
                duration = {200}  
            >
        <TouchableOpacity style={styles.loadMoreBtn}
          onPress={onPress}
        >
          <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15 }}>View all {title} posts</Text>
        </TouchableOpacity>
      </Animatable.View>
    )
}

const styles = StyleSheet.create({

    footerStyles: { 
        alignItems: 'center',  
        elevation: 5, 
        flex: 1, 
        paddingHorizontal: 15, 
        marginVertical: 15,
        justifyContent: 'center', 
    },
    loadMoreBtn: {
        flexDirection: 'row', 
        padding: 8, 
        backgroundColor: GlobalStyles.themeColor.color, 
        borderRadius: 15, 
        justifyContent: 'center',
        alignItems: 'center' 
      },
})

export default LoadMoreComponent
