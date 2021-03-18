import React from 'react'
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import { useFormikContext } from 'formik'

// isonbpo.pobox 9399 kampala
import { GlobalStyles } from '../../styles/GlobalStyles'


const SubmitButton = ({ title, loading, icon }) => {
    const { handleSubmit } = useFormikContext()
    return (
        <>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10,
        backgroundColor: GlobalStyles.themeColor.color,
        borderRadius: 20,
        marginVertical: 18,
      },
    text: { 
        fontSize: 18, 
        textAlign: 'center', 
        color: 'white', 
        fontWeight: 'bold' 
    }
})

export default SubmitButton
