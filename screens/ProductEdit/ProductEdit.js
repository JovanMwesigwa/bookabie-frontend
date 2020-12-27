import React, {useState, useContext } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TextInput, ScrollView, TouchableOpacity, Button, Image, KeyboardType, StatusBar } from 'react-native'
import { ListItem,  Textarea, Radio, Right, Left } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import MainHeaderComponent from '../../components/MainHeaderComponent';
import PostProductHeader from '../../components/PostProductHeader';
import { CompanyContext } from '../../context/profiles/CompanyContextProvider';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';
import { AuthContext } from '../../context/authentication/Context'
import axios from 'axios';

const ProductEdit = ({pickImage, navigation, route }) => {

  const { item } = route.params;

  const [selectedImage, setSelectedImage] = useState(null);

  const [ load, setLoad ] = useState(false);

  const [ title, setTitle ] = useState(item.title);
  const [ description, setDescription ] = useState(item.description);
  const [ price, setPrice ] = useState(item.price);
  const [ offer, setOffer ] = useState(item.offer);

  const  { fetchFirstPostsData }  = useContext(CompanyContext);

  const { authState } = useContext(AuthContext);

  const token = authState.token;

  
  // console.log(item.id);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });

  }

  const goToFeed = () => {
    navigation.navigate('Find')
  }

  const loadPost = () => {
    setTimeout(() => {
        fetchFirstPostsData()
        goToFeed()
        setLoad(false)
    },1000)
  }

  const data = {
      title: title,
      description: description,
      price: price,
      offer: offer
  }

  const submitHandler = () => {
      setLoad(true)
      axios.put(`${APIROOTURL}/api/post/${item.id}/update/`, data, {
        headers: {
            'Authorization': `Token ${token}`, 
            data: data
          }
        })
        .then(res => {
            // console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })

        loadPost()
  }

// console.log(selectedImage);
const { container } = styles

 return(
  <View style={container}>
        <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <PostProductHeader submitHandler={submitHandler} goToFeed={goToFeed}/>
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>

      <View style={{ padding: 15, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text style={styles.headerText}>Sell your product Today</Text> */}
      </View>

          <TextInput style={styles.inputContainer} 
          placeholder='Add an Interesting Title' 
          placeholderTextColor="#777"
          value={title}
          onChangeText={text => setTitle(text)}
          />
         
          <Textarea rowSpan={5}  style={styles.inputContainer} 
          placeholder='Your Product Description ' 
          placeholderTextColor="grey" 
          value={description}
          onChangeText={text => setDescription(text)}
          />

          <TextInput style={styles.inputContainer} 
          placeholder='price' 
          keyboardType="numbers-and-punctuation"
          value={price}
          onChangeText={text => setPrice(text)}
           />

          <TextInput style={styles.inputContainer} 
          placeholder='Any Offer (Optional) ' 
          keyboardType="numbers-and-punctuation"
          value={offer}
          onChangeText={text => setOffer(text)}
          />

          <TouchableOpacity onPress={openImagePickerAsync} >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12, borderColor: '#ddd', borderWidth: 1,borderStyle: 'dashed', padding: 8, borderRadius: 12 }}>
            <MaterialIcons name="add-a-photo" size={18} color="#2C3335" />  
            <Text style={{ paddingHorizontal: 15, fontSize: 15, color: '#777', }}>Upload Photo</Text>
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
          null
      }

          <ListItem selected={true}>

            <Left>
              <Text style={{ color: '#777' }}>Is it Available Now?</Text>
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
          {load ? 
          <TouchableOpacity style={styles.buttonContainer} onPress={submitHandler}>
            <ActivityIndicator color="#B83227" size={18} />
            {/* <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', fontWeight: 'bold' }}></Text> */}
          </TouchableOpacity> :
          <TouchableOpacity style={styles.buttonContainer} onPress={submitHandler}>
            <Text style={{ fontSize: 18, textAlign: 'center', color: '#B83227', fontWeight: 'bold' }}>Edit Post</Text>
          </TouchableOpacity>
          }
    </ScrollView>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  //  paddingHorizontal: 15,
   backgroundColor: '#fff'
  },
  inputContainer: {
    marginVertical: 10,
    padding: 8,
    borderRadius: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#7B8788',
    marginBottom: 18,

  },
  buttonContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#B83227',
    borderWidth: 1,
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
    color: '#B83227'
  },
  imageContainer: {
    // backgroundColor: 'black',
    borderRadius: 15,
    marginVertical: 8, 
    width: 85,
    height: 85
  }
})
export default ProductEdit;