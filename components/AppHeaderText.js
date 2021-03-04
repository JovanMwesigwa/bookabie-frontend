import React from 'react'
import { StyleSheet} from 'react-native'


import { GlobalStyles } from '../styles/GlobalStyles'
import AppText from './AppText'

const AppHeaderText = ({ children }) => {
    return (
        <AppText {...styles.text} >
            {children}
        </AppText>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: '700',
        color: GlobalStyles.darkFontColor.color
    }
})

export default AppHeaderText
