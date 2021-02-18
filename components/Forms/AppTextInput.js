import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { useFormikContext } from 'formik'
import GlobalStyles from '../../styles/GlobalStyles'

const AppTextInput = ({ name, placeholder, placeholderColor="#777" ,isInline, ...otherProps}) => {
    const {handleChange, setFieldTouched, touched, errors } = useFormikContext()
    if(!errors) return null
    return (
        <>
            <TextInput style={styles.inputContainer} 
                  name={name}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderColor}
                  {...otherProps}
                  onBlur={() => setFieldTouched(name)}
                  onChangeText={handleChange(name)}
              />
              <View style={isInline && styles.inline}>
                {touched[name] && <Text style={{ color: "red" }}>{errors[name]}</Text>}
              </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
        fontSize: 16,
        padding: 8,
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
      }
})

export default AppTextInput
