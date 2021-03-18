import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'

const ApploadingComponent = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='small' collapsable color='#B83227' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', },
})

export default ApploadingComponent
