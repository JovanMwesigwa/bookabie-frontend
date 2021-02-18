import React from 'react'
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useFormikContext } from 'formik'

import { GlobalStyles } from '../../styles/GlobalStyles'


const SubmitButton = ({ title, loading, icon }) => {
    const { handleSubmit } = useFormikContext()
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
            {
                loading ? <ActivityIndicator color="white" size={18} /> : 
                <Text style={styles.text}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10,
        backgroundColor: GlobalStyles.themeColor.color,
        borderRadius: 8,
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
