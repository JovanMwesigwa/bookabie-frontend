import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'

import AppText from '../../../components/AppText'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import AppButton from '../../../components/AppButton'

const UploadProfilePicture = ({ navigation }) => {

    const [ image, setImage ] = useState("")
    return (
        <View style={styles.container}>
            <View >
                <AppText {...styles.headerText}>Welcome to bookabie,...</AppText>
                <AppText >Take sometime off and setup your profile </AppText>
            </View>
            <TouchableOpacity style={styles.picContainer}>
                {/* <Image  /> */}
            </TouchableOpacity>
           <AppButton text="Skip" onPress={() => navigation.navigate("AddDescription")} />
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
    picContainer: {
        borderRadius: 12,
        width: 100,
        height: 100,
        marginVertical: 22,
        backgroundColor: "grey"
    },
    
})

export default UploadProfilePicture
