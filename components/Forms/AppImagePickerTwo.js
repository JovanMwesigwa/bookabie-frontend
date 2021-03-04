import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useFormikContext } from 'formik'
import * as ImagePicker from 'expo-image-picker'



const AppImagePickerTwo = ({name, placeHolder="Upload Photo", pic}) => {

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
            imageUri ? 
            <ImageBackground style={styles.coverImageHeader} source={{uri: imageUri }}>
                <View style={styles.child}>

                <TouchableOpacity onPress={pickImage} style={styles.imagePickerStyles}>
                    <MaterialIcons name="add-a-photo" size={18} color="#2C3335" />  
                </TouchableOpacity>

                </View>
            </ImageBackground> 
            :
            <ImageBackground style={styles.coverImageHeader} source={{uri: pic }}>
                <View style={styles.child}>
                <TouchableOpacity onPress={pickImage} style={styles.imagePickerStyles}>
                    <MaterialIcons name="add-a-photo" size={18} color="#2C3335" />  
                </TouchableOpacity>

                
                </View>
            </ImageBackground>
        }
            <View style={styles.inline}>
                {touched[name] && <Text style={{ color: "red" }}>{errors[name]}</Text>}
            </View>
    </>
    )
}

const styles = StyleSheet.create({
    imagePickerStyles: { 
        alignItems: 'center',
        justifyContent: 'center', 
        marginVertical: 12, 
        borderColor: '#ddd', 
        borderWidth: 1,
        borderStyle: 'dashed', 
        padding: 8, 
        borderRadius: 12,
        width: 65,
        height: 65
    },
    imageTextStyles: { paddingHorizontal: 15, fontSize: 15, color: '#777', },
    inline: {
        position: 'absolute',
        bottom: 0,
        left: 8
    },
    child: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center'
      },
    coverImageHeader: {
        marginBottom: 18,
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
        height: 150,
        
      },

})

export default AppImagePickerTwo
