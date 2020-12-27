import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const PopularProducts = () => {
    return (
        <View style={styles.container}>
            <Text>All Popular Products</Text>
        </View>
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default PopularProducts

