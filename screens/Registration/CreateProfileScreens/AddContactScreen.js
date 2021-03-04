import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import AppText from '../../../components/AppText'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import AppButton from '../../../components/AppButton'
import AppTextInput from '../../../components/Forms/AppTextInput'



const AddContactScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View >
                <AppText {...styles.headerText}>Add Contact</AppText>
            </View>
            <View style={styles.form}>
               <AppText color={GlobalStyles.blue.color}>Contact</AppText>
               <AppText color={GlobalStyles.blue.color}>Location</AppText>
            </View>
            <AppButton text="Skip" onPress={() => navigation.navigate("Login")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    headerText: {
        color: GlobalStyles.themeColor.color,
        fontSize: 20,
    },
    form: {
        marginVertical: 45
    }
})

export default AddContactScreen
