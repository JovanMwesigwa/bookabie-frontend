import React, {useState, useContext } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TextInput, ScrollView, TouchableOpacity, Button, Image, KeyboardType, StatusBar } from 'react-native'
import { Container, Header, Content, Item, Input, ListItem,  Textarea, Radio, Right, Left } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import MainHeaderComponent from '../../components/MainHeaderComponent';
import PostProductHeader from '../../components/PostProductHeader';
import { GlobalStyles } from '../../styles/GlobalStyles'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';
import { CompanyContext } from '../../context/profiles/CompanyContextProvider';
import { AuthContext } from '../../context/authentication/Context'
import axios from 'axios';
import { connect } from 'react-redux'




// const pic = require('../../assets/images/blender')

const PostProduct = ({pickImage, navigation, authToken }) => {

  const [selectedImage, setSelectedImage] = useState(null);

  const [ photo, setPhoto ] = useState(null);

  const [ load, setLoad ] = useState(false);

  const [ title, setTitle ] = useState(null);
  const [ description, setDescription ] = useState(null);
  const [ price, setPrice ] = useState(null);
  const [ offer, setOffer ] = useState(null);

  const { authState } = useContext(AuthContext);

  const  { fetchFirstPostsData }  = useContext(CompanyContext);

  const token = authToken


  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const options = {
      noData: true,
    };
    let pickerResult = await ImagePicker.launchImageLibraryAsync(options, response => {
      console.log("Image response", response);
    });

    

    if (pickerResult.cancelled === true) {
      return;
    }
    // setSelectedImage({ localUri: pickerResult.uri });
    setSelectedImage(pickerResult.uri);


  }

  console.log("*******Image is ********************",selectedImage);

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
    // image: selectedImage.localUri ? selectedImage.localUri : null,
    image: selectedImage,
    // image: selectedImage.localUri,
    catergory: 'Gadgets and Electronics',
    price: price,
    offer: offer,
    available: true
}

  // console.log(selectedImage);

  // let body = new FormData();
  // body.append('photo', {uri: pickerResult.uri ,filename :'imageName.png',type: 'image/png'});
  // body.append('Content-Type', 'image/png');

  const submitHandler = async() => {

    setLoad(true)
    
    await axios.post(`${APIROOTURL}/api/post/create/`, data, {
        headers: {
          // "Content-Type": "multipart/form-data",
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

// console.log(selectedImage.localUri);
const { container } = styles

 return(
  <View style={container}>
        <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <PostProductHeader submitHandler={submitHandler} goToFeed={goToFeed}/>
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>

      <View style={{ padding: 15, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text style={styles.headerText}>Sell your product Today</Text> */}
      </View>

          <Input style={styles.inputContainer} 
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

          <Input style={styles.inputContainer} 
              placeholder='price' 
              keyboardType="numbers-and-punctuation"
              value={price}
              onChangeText={text => setPrice(text)}
           />

          <Input style={styles.inputContainer} 
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
                source={{ uri: selectedImage }}
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
            <ActivityIndicator color="white" size={18} />
            {/* <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', fontWeight: 'bold' }}></Text> */}
          </TouchableOpacity> :
          <TouchableOpacity style={styles.buttonContainer} onPress={submitHandler}>
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Post</Text>
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
    backgroundColor: GlobalStyles.themeColor.color,
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
    color: GlobalStyles.themeColor.color
  },
  imageContainer: {
    // backgroundColor: 'black',
    borderRadius: 15,
    marginVertical: 8, 
    width: 85,
    height: 85
  }
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps, null)(PostProduct);

// //create object with uri, type, image name
// var photo = {
//   uri: IMAGE_PATH,
//   type: 'image/jpeg',
//   name: 'photo.jpg',
// };

// //use formdata
// var formData = new FormData(); 
// //append created photo{} to formdata
// formData.append('image', photo);
// //use axios to POST
// axios({
//   method: 'POST',
//   url: api_url +  'customer/upload-avatar',
//   data: formData,
//   headers: {
//       'Authorization': "Bearer  "  +  YOUR_BEARER_TOKEN,
//       'Accept': 'application/json',
//       'Content-Type': 'multipart/form-data;'    
//   }}) .then(function (response) { console.log(response)})
//   .catch(function (error) { console.log(error.response)
// });