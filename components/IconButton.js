import React from 'react'
import { StyleSheet,  TouchableOpacity, ActivityIndicator } from 'react-native'
import { useFormikContext } from 'formik'
import { AntDesign, FontAwesome } from '@expo/vector-icons';



import { GlobalStyles } from '../styles/GlobalStyles'


const IconButton = ({ loading, icon }) => {
    const { handleSubmit } = useFormikContext()
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
            {
                loading ? <ActivityIndicator color="white" size={18} /> : 
                <FontAwesome name={icon} size={18}  style={styles.textStyle} /> 
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: GlobalStyles.themeColor.color,
        borderRadius: 8,
        marginVertical: 18,
        borderLeftWidth: 0.4,
        borderLeftColor: "#777",
        borderRadius: 50,
        margin: 5,
        width: 50,
        height: 50
      },
      textStyle: {
        textAlign: 'center',
        color: "#ddd",
        fontWeight: "700"
      },
})

export default IconButton
