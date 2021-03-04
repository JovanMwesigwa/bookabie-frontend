import React, {useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView,  Image, StatusBar } from 'react-native'
import { ListItem,  Radio, Right, Left } from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux'
import * as Yup from 'yup'



import AppImagePicker from '../../components/Forms/AppImagePicker'
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
  offer: Yup.string().label("Offer"),
  image: Yup.string().label("Image")
})


const PostProduct = ({reloadPosts, navigation, authToken }) => {

  const [ load, setLoad ] = useState(false)

  const token = authToken

  const loadPost = () => {
    setTimeout(() => {
      reloadPosts(token)
      navigation.goBack()
        setLoad(false)
    },1000)
  }


  

  const submitHandler = async(values) => {

    setLoad(true)

    const data = new FormData()

    var photo = {
        uri: values.image.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };

    data.append("title", values.title);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("offer", values.offer);
    data.append("image", photo);
    
    await axios.post(`${APIROOTURL}/api/post/create/`, data, {
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

const { container } = styles

 return(
  <View style={container}>
        <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
        <PostProductHeader submitHandler={submitHandler} onPress={() => navigation.goBack()} />
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
 
      <View style={{ padding: 15, justifyContent: 'center', alignItems: 'center' }}>
      </View>
            <AppForm  
              initialValues={{ title: "", description: "", catergory: "Gadgets and Electronics", price: "", offer: "", available: true, image: "" }}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
            >
              <AppTextInput 
                name="title"
                placeholder='Add an Interesting Title'
                icon="user-o" 
                multiline
               />

              <AppTextInput 
                name="description"
                placeholder='Your Product Description ' 
                icon="user-o"
                multiline 
              /> 

              <AppTextInput 
                placeholder='price' 
                name="price"
                icon="user-o"
                keyboardType="number-pad"
              />

              <AppTextInput 
                placeholder='Any Offer (Optional) '
                name="offer"
                icon="user-o"
                keyboardType="number-pad"
              />

         

          <AppImagePicker name="image" />

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
