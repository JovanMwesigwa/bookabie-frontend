import React from 'react'
import { StyleSheet,TouchableOpacity } from 'react-native'

import AppText from './AppText'

const AppButton = ({text, onPress, small }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <AppText {...styles.skipText} fontSize={small ? 13: null}>{text}</AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    skipText: {
        color: "#1287A5",
        fontWeight: "bold"
    }
})

export default AppButton
