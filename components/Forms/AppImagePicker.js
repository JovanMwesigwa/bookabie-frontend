import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useFormikContext } from 'formik'
import * as ImagePicker from 'expo-image-picker'



const AppImagePicker = ({name, placeHolder="Upload Photo"}) => {

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
          <View style={styles.container}>
             { 
                imageUri &&
                <TouchableWithoutFeedback onPress={handleRemoveImage}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                </TouchableWithoutFeedback>
            }
            
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.imagePickerStyles}>
                    <MaterialIcons name="add-a-photo" size={30} color="#2C3335" />  
                    {/* <Text style={styles.imageTextStyles}>{placeHolder}</Text> */}
                </View>
            </TouchableOpacity>
          </View>

            <View style={styles.inline}>
                {touched[name] && <Text style={{ color: "red" }}>{errors[name]}</Text>}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
    imagePickerStyles: { 
      alignItems: 'center', 
      flexDirection: 'row', 
      marginVertical: 12, 
      borderColor: '#ddd', 
      borderWidth: 1,
      borderStyle: 'dashed', 
      padding: 12, 
      borderRadius: 12,
      height: 90,
      justifyContent: 'center',
      width: 90
    },
    image: { 
      borderRadius: 8,
      height: 90,
      marginRight: 15,
      width: 90, 
     },
    imageTextStyles: { paddingHorizontal: 15, fontSize: 15, color: '#777', },
    inline: {
        position: 'absolute',
        bottom: 0,
        left: 8
    }

})

export default AppImagePicker
