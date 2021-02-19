import React, {useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native'
import { ListItem,  Radio, Right, Left } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import axios from 'axios';
import { connect } from 'react-redux'
import * as Yup from 'yup'




import PostProductHeader from '../../components/PostProductHeader';
import { GlobalStyles } from '../../styles/GlobalStyles'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';
import { hotReloadPosts } from '../../redux/posts/postsRedux';
import AppTextInput from '../../components/Forms/AppTextInput';
import AppForm from '../../components/Forms/AppForm'
import SubmitButton from '../../components/Forms/SubmitButton';


const validationSchema = Yup.object().shape({
  title: Yup.string().required().max(255).label("Title"),
  description: Yup.string().label("Description"),
  price: Yup.number().label("Price"),
  offer: Yup.string().label("Offer")
})


const PostProduct = ({reloadPosts, navigation, authToken }) => {

  const [ load, setLoad ] = useState(false)

  const [ image, setImage ] = useState(null);

  const getPermissions = async() => {
    const { status } = await   ImagePicker.requestCameraPermissionsAsync()
    if(!status === 'granted') return alert("Sorry, you need permission to work with this..")
  }


  const token = authToken

  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if(!result.cancelled) setImage(result)
  }


  useEffect(() => {
    getPermissions()
  },[])

  const loadPost = () => {
    setTimeout(() => {
      reloadPosts(token)
      navigation.goBack()
        setLoad(false)
    },1000)
  }

  // //create object with uri, type, image name
var photo = {
  uri: image.uri,
  type: 'image/jpeg',
  name: 'photo.jpg',
};

  //use formdata
  var formData = new FormData(); 
  //append created photo{} to formdata
  formData.append('image', photo);
  //use axios to POST

  const submitHandler = async(data) => {

    setLoad(true)
    
    await axios.post(`${APIROOTURL}/api/post/create/`, data, {
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data;', 
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

const { container } = styles

 return(
  <View style={container}>
        <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
        <PostProductHeader submitHandler={submitHandler} onPress={() => navigation.goBack()} />
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>

      <View style={{ padding: 15, justifyContent: 'center', alignItems: 'center' }}>
      </View>
            <AppForm  
              initialValues={{ title: "", description: "", catergory: "Gadgets and Electronics", price: "", offer: "", available: true, image: formData }}
              validationSchema={validationSchema}
              onSubmit={(values) => console.log(values)}
            >
              <AppTextInput 
                name="title"
                placeholder='Add an Interesting Title' 
                multiline
               />

              <AppTextInput 
                name="description"
                placeholder='Your Product Description ' 
                multiline 
              />

              <AppTextInput 
                placeholder='price' 
                name="price"
                keyboardType="number-pad"
              />

              <AppTextInput 
                placeholder='Any Offer (Optional) '
                name="offer"
                keyboardType="number-pad"
              />

          <View>
            
          </View>

          <TouchableOpacity onPress={pickImage}>
          <View style={styles.imagePickerStyles}>
            <MaterialIcons name="add-a-photo" size={18} color="#2C3335" />  
            <Text style={styles.imageTextStyles}>Upload Photo</Text>
          </View>
          </TouchableOpacity>


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
          
          <SubmitButton title="Post" loading={load} />
          
        </AppForm>
          
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
  imagePickerStyles: { flexDirection: 'row', alignItems: 'center', marginVertical: 12, borderColor: '#ddd', borderWidth: 1,borderStyle: 'dashed', padding: 8, borderRadius: 12 },
  imageTextStyles: { paddingHorizontal: 15, fontSize: 15, color: '#777', },
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

const mapDispatchToProps = dispatch => {
  return {
    reloadPosts: token => dispatch(hotReloadPosts(token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostProduct);

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