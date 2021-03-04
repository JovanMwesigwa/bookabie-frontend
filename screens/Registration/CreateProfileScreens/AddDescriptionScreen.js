import React from 'react'
import { StyleSheet,  View } from 'react-native'


import AppText from '../../../components/AppText'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import AppButton from '../../../components/AppButton'
import AppTextInput from '../../../components/Forms/AppTextInput'



const AddDescriptionScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View >
                <AppText {...styles.headerText}>Describe your company </AppText>
            </View>
            <View style={styles.form}>
               <AppText color={GlobalStyles.blue.color}>Description</AppText>
               <AppText color={GlobalStyles.blue.color}>Location</AppText>
            </View>
            <AppButton text="Skip" onPress={() => navigation.navigate("AddContact")} />
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

export default AddDescriptionScreen
