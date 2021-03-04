import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useFormikContext } from 'formik'
import * as ImagePicker from 'expo-image-picker'



const AppImagePickerFour = ({name, placeHolder="Upload Photo", defaultImage=null}) => {

    const [ imageUri, setImageUri ] = useState(null);

    const { errors, touched,  setFieldValue, values } = useFormikContext()

    useEffect(() => {
        getPermissions()
      },[])

    const getPermissions = async() => {
        const { status } = await   ImagePicker.requestCameraPermissionsAsync()
        if(!status === 'granted') return alert("Sorry, you need permission to work with this..")
      }

      const pickImage = async() => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
          })
      
          if(!result.cancelled) setFieldValue(name, result)
          setImageUri(result.uri)
          
        } catch (error) {
          console.log("Error reading the image")
        }
      }
      
      const handleRemoveImage = () => {
        setImageUri(null)
        setFieldValue(name, null)
      }

    return (
        <>
             { 
                imageUri &&
                <TouchableWithoutFeedback onPress={handleRemoveImage}>
                    <Image source={{ uri: imageUri }} style={{ width: 65, height: 65 }} />
                </TouchableWithoutFeedback>
            }
            
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.imagePickerStyles}>
                    <MaterialIcons name="add-a-photo" size={18} color="#2C3335" />  
                    <Text style={styles.imageTextStyles}>{placeHolder}</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.inline}>
                {touched[name] && <Text style={{ color: "red" }}>{errors[name]}</Text>}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    imagePickerStyles: { flexDirection: 'row', alignItems: 'center', marginVertical: 12, borderColor: '#ddd', borderWidth: 1,borderStyle: 'dashed', padding: 8, borderRadius: 12 },
    imageTextStyles: { paddingHorizontal: 15, fontSize: 15, color: '#777', },
    inline: {
        position: 'absolute',
        bottom: 0,
        left: 8
    }

})

export default AppImagePickerFour
