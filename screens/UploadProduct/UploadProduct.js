import React, {useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Button, Image, KeyboardType } from 'react-native'
import { Container, Header, Content, Item, Input, ListItem,  Textarea, Radio, Right, Left } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { AuthContext } from '../../context/authentication/Context'






const UploadProduct = ({pickImage, closeModalHandler}) => {

  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ image, setImage ] = useState('')
  const [ price, setPrice ] = useState('')
  const [offer, setOffer ] = useState('')

  
  const [selectedImage, setSelectedImage] = useState(null);

  const { authState } = useContext(AuthContext);

  const token = authState.token;

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });

  }

  // this function converts the image into form data to be read by the serverside
  const formData = new FormData();
  formData.append("image", selectedImage);


  const handleSubmit = async() => {
    let data = {
      title: title,
      description: description,
      image: formData,

      price: price,
      offer: offer
    }
    await axios.post(`${APIROOTURL}/api/post/create/`,data, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      
    }) 
  }

  // console.log(formData.image);

const { container } = styles

 return(
  <View style={container}>
    <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sell your product today</Text>
      </View>
      
      <View style={styles.formContainer}>

          <TextInput style={styles.inputContainer}
             placeholder='Title'
            value={title}
            onChangeText={text => setTitle(text)} />
         
          <Textarea rowSpan={5} placeholder="Add a Description"
           style={{ borderRadius: 12, padding: 8,backgroundColor: '#EAF0F1', marginBottom: 10 }}
           value={description}
            onChangeText={text => setDescription(text)}
           />
      
          <TextInput style={styles.inputContainer} placeholder='price' 
          keyboardType="numbers-and-punctuation"
            value={price}
            onChangeText={text => setPrice(text)}
             />

          <TextInput style={styles.inputContainer} placeholder='(Optional) Any Offers ' 
          keyboardType="numbers-and-punctuation"
            value={offer}
            onChangeText={text => setOffer(text)}
           />

          <TouchableOpacity onPress={openImagePickerAsync} >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12, borderColor: '#7B8788', borderWidth: 1,borderStyle: 'dashed', padding: 8, borderRadius: 12 }}>
            <MaterialIcons name="add-a-photo" size={40} color="#2C3335" />  
            <Text style={{ paddingHorizontal: 15, fontSize: 15, color: '#2C3335', }}>Upload Photo</Text>
          </View>
        </TouchableOpacity>

        {
          selectedImage !== null ? 
          <View style={styles.imageContainer}>
              <Image
                source={{ uri: selectedImage.localUri }}
                style={styles.thumbnail}
              />
          </View> 
          :
          <View></View>
      }

          <ListItem selected={true}>

            <Left>
              <Text>Is it Available Now?</Text>
            </Left>

            <Right>
              <Radio
                color={"#B83227"}
                selectedColor={"#B83227"}
                enabled
                selected={true}
              />
            </Right>
          </ListItem>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Upload Post</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  //  paddingHorizontal: 15,
   backgroundColor: '#fff',
   borderRadius: 10,
  //  paddingBottom: 0
  },
  headerContainer: { 
    paddingVertical: 24, 
    backgroundColor: '#B83227', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 10,
    marginBottom: 24
},
  inputContainer: {
    marginVertical: 10,
    padding: 8,
    borderRadius: 12,
    borderColor: '#7B8788',
    backgroundColor: '#EAF0F1',
    marginBottom: 18
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#B83227',
    borderRadius: 8,
    marginVertical: 18,
  },
  thumbnail: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white'
  },
  imageContainer: {
    backgroundColor: 'black',
    borderRadius: 15,
    marginVertical: 8, 
    width: '100%',
    height: 300
  }
})
export default UploadProduct