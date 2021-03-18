import React, {useState } from 'react'
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native'
import { ListItem,  Radio, Right, Left } from 'native-base';
import { connect } from 'react-redux'
import axios from 'axios';
import * as Yup from 'yup';



import {AppTextInput, AppForm, AppCurtain,  AppImagePickerFour, PostProductHeader, SubmitButton } from '../../components/'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';
import { hotReloadPosts } from '../../redux/posts/postsRedux';



const validationSchema = Yup.object().shape({
  title: Yup.string().required().max(255).label("Title"),
  description: Yup.string().label("Description"),
  price: Yup.number().label("Price"),
  offer: Yup.string().label("Offer"),
  image: Yup.string().nullable().label("Image")
})





const ProductEdit = ({authToken, navigation, route,   }) => {

  const { item, refreshPost} = route.params;

  const [ load, setLoad ] = useState(false)

  const token = authToken

  const loadPost = () => {
    setTimeout(() => {
      refreshPost()
      navigation.goBack()
        setLoad(false)
    },1000)
  }

  const submitHandler = async(values) => {


    setLoad(true)
    const data = new FormData()

    if(values.image !== null) {
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
    }else{
      data.append("title", values.title);
      data.append("description", values.description);
      data.append("price", values.price);
      data.append("offer", values.offer);
      data.append("image", values.image);
    }


      axios.put(`${APIROOTURL}/api/post/${item.id}/update/`, data, {
        headers: {
            'Authorization': `Token ${token}`, 
            data: data
          }
        })
        .then(res => {
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
              initialValues={{ 
                title: item.title, 
                description: item.description, 
                catergory: "Gadgets and Electronics", 
                price: item.price, 
                offer: item.offer, 
                available: item.available, 
                image: item.image
               }}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
            >
              <AppTextInput 
                name="title"
                placeholder={item.title}
                icon="user-o" 
                multiline
               />

              <AppTextInput 
                name="description"
                placeholder={item.description} 
                icon="user-o"
                multiline 
              /> 

              <AppTextInput 
                placeholder={item.price} 
                name="price"
                icon="user-o"
                keyboardType="number-pad"
              />

              <AppTextInput 
                placeholder={item.offer}
                name="offer"
                icon="user-o"
                keyboardType="number-pad"
              />

         

          <AppImagePickerFour name="image" defaultImage={item.image} />

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
          
          <SubmitButton title="Post"  />
          
        </AppForm>
          
    </ScrollView>
    <AppCurtain loading={load} />
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

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reloadPosts: token => dispatch(hotReloadPosts(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);