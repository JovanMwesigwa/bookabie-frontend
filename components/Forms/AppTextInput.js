import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { useFormikContext } from 'formik'
import AppText from '../AppText'
import { GlobalStyles } from '../../styles/GlobalStyles'


const AppTextInput = ({ name, placeholder, value=null, placeholderColor="#777" ,isInline, title, icon, ...otherProps}) => {
    const {handleChange, setFieldTouched, touched, errors } = useFormikContext()
    if(!errors) return null
    return (
        <>
            <View>
                {
                    title &&
                    <AppText fontSize={16} color={GlobalStyles.blue.color}>{title}</AppText>
                }
                <TextInput style={styles.inputContainer} 
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderColor}
                    {...otherProps}
                    onBlur={() => setFieldTouched(name)}
                    onChangeText={handleChange(name)}
                />
                {
                    icon &&
                    <FontAwesome name={icon} color="#05375a" size={18} style={styles.iconStyles} />
                }
            </View>
            {
                !errors ? 
                <View style={isInline && styles.inline}>
                    {touched[name] && <Text style={{ color: "red" }}>{errors[name]}</Text>}
                </View> : 
                null
            }
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
        fontSize: 16,
        padding: 10,
        paddingLeft: 30,
        borderRadius: 12,
        borderWidth: 0.3,
        borderColor: '#7B8788',
        marginBottom: 18,
        flex: 1
      },
      inline: {
          position: 'absolute',
          bottom: 0,
          left: 8
      },
      iconStyles: {
        position: 'absolute',
        alignSelf: 'flex-start',
        left: 10,
        bottom: 33
    }
})

export default AppTextInput
