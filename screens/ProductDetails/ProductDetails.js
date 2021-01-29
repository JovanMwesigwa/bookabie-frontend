import React, {useState, useEffect, useContext, useReducer } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { CompanyContext } from '../../context/profiles/CompanyContextProvider'
import { View,  StyleSheet, Image, TouchableOpacity, RefreshControl, ActivityIndicator, FlatList } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import FullImageModal from '../../components/Modals/FullImageModal';
import OtherHeaderComponent from '../../components/OtherHeaderComponent';
import CommentComponent from '../../components/CommentComponent';
import {  Paragraph, Subheading, Button, Dialog, Portal, Text } from 'react-native-paper';
import LikedBy from '../../components/LikedBy';
import * as Animatable from 'react-native-animatable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchaddItemToCart, } from '../../redux/cart/CartRedux';




const initialState = {
  loading: true,
  post: {},
  error: ''
}

const reducer = (state, action) => {
  switch(action.type){
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        post: action.payload,
        error: ''
      }
    case 'FETCH_FAILED':
      return {
        loading: false,
        post: {},
        error: 'OOPs! Something went wrong.'
      }
    default:
      return state 
  }
}

const ProductDetails = ({ route, navigation, authToken,reloadPosts }) => {

    const [ state, dispatch ] = useReducer(reducer, initialState);

    const [ addedItemToCart, setAddedItemToCart ] = useState(false);

    const [visible, setVisible] = useState(false);
    
    const [ userInfo, setUserInfo ] = useState({});
 
    const [ fullImageModalOpen, setFullImageModalOpen ] = useState(false)

    const [ isLiked, setIsLiked ] = useState(false);

    const { fetchFirstPostsData } = useContext(CompanyContext)


    const hideDialog = () => setVisible(false);

    const showDialog = () => setVisible(true);

    const token = authToken;

    const { ID, post, addToCartFunc, removeFromCartFunc } = route.params
    
    const fetchPostDetail = async() => {
      try{
        const response = await axios.get(`${APIROOTURL}/api/post/${ID}/detail/`,{
          headers: {
            'Authorization': `Token ${token}`
          }
        })
        dispatch({type: 'FETCH_SUCCESS', payload: response.data })
      }catch(error){
        dispatch({type: 'FETCH_FAILED' })
      }
    }

    const fetchUserMe = async() => {
      try{
        const userResponse = await axios.get(`${APIROOTURL}/api/auth/users/me/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        })
        setUserInfo(userResponse.data);
      }catch(error){
        console.log(err);
      }
    }

    const editBtnHandler = () => {
      navigation.navigate('Edit Post', {ID: ID, item: post })
    }

    const deleteBtnHandler = async() => {
      await axios.delete(`${APIROOTURL}/api/post/${ID}/delete/`,{
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      navigation.navigate('Find')
      fetchFirstPostsData();
    }

    const refreshFetchPostDetail = async() => {
      try{
        const response = await axios.get(`${APIROOTURL}/api/post/${ID}/detail/`,{
          headers: {
            'Authorization': `Token ${token}`
          }
        })
        dispatch({type: 'FETCH_SUCCESS', payload: response.data })
      }catch(error){
        dispatch({type: 'FETCH_FAILED' })
      }
    }

    const refreshFetchUserMe = async() => {
      try{
        const userResponse = await axios.get(`${APIROOTURL}/api/auth/users/me/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        })
        setUserInfo(userResponse.data);
      }catch(error){
        console.log(err);
      }
    }

      
  const fetchCheckIsLikedPost = async() => {
    try {
      const responseData = await axios.get(`${APIROOTURL}/api/check_likes/${ID}`,  {
        headers: {
          'Authorization': `Token ${token}`, 
        },
      })
      setIsLiked(responseData.data.Response);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    setAddedItemToCart(true)
    addToCartFunc()
  }

  const removeFromCart = () => {
    setAddedItemToCart(false)
    removeFromCartFunc()
  }

    useEffect(() => {
      fetchPostDetail() 
      fetchUserMe()
    },[])

    useEffect(() => {
      fetchCheckIsLikedPost()
    },[])

    const fastRefresh = () => {
      refreshFetchPostDetail()
      refreshFetchUserMe()
    }


  if (state.error) {
    return (
      <>
        <OtherHeaderComponent />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

          </View>
            <Animatable.View style={styles.errorStyles}
                animation='fadeInUp'
                delay={1000}
                duration = {500}> 
                  <Text style={{ textAlign: 'center', color: 'white', letterSpacing:1 }}>{state.error}</Text> 
              </Animatable.View>
          <View style={{ flex: 1 }}>
          
          </View> 
        </View>
      </>
    )
  } 

const { container } = styles
  const refreshControl = <RefreshControl
    refreshing={state.loading}
    onRefresh={fastRefresh}
  />
 return(
   

  <>

      {state.loading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator size='small' collapsable color='#B83227' />
        </View>
      :
    <>
    <OtherHeaderComponent />
    <FlatList
      ListHeaderComponent ={
      <>
        <View style={container}>
          <FullImageModal   
            showModal={fullImageModalOpen} 
            closeModal={setFullImageModalOpen}
            comments={state.post.comments.length}
            image={state.post.image}
            likes={ state.post.likes.length} />

          { state.post.image ?

          <TouchableWithoutFeedback style={styles.imageContainer}
            onPress={() => setFullImageModalOpen(true)} >

              <Image source={{ uri: state.post.image }} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
              
          </TouchableWithoutFeedback> :
          null
          }
          {state.post.author.user.username == userInfo.username ? 
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={styles.editBtn} onPress={editBtnHandler}>
              <Text style={{ fontSize: 12,   color: '#1287A5', textAlign: 'center' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={showDialog}>
                <Text style={{ fontSize: 12,  color: '#1287A5', textAlign: 'center' }}>Delete</Text>
            </TouchableOpacity>
          </View>
          :
          null
          }   
          
          <View style={styles.descriptionContainer}>
                
              <View style={{ flexDirection: "row", paddingTop: 12, paddingHorizontal: 15 }}>
                  <View>

                      <View  style={styles.accountContainer}>
                          <Image source={{ uri: state.post.author.profile_pic }} style={GlobalStyles.largeRoundedPictContainer} />
                          <View style={{  paddingLeft: 10 }}>
                            <View style={{ flexDirection: 'row' }}> 
                              <Text style={{...GlobalStyles.darkHeaderText, fontSize: 15}}>{state.post.author.user.username}</Text>
                              {
                                state.post.author.verified ?  <AntDesign name="star" size={10} color={GlobalStyles.darkFontColor.color} /> : null
                              }
                             
                            </View>
                            <Text style={{...GlobalStyles.greyTextSmall, fontSize: 13}}>{state.post.author.profile_type.name}</Text>
                          </View>
                      </View>

                      <View>
                        <Text style={{...GlobalStyles.darkTitleText, fontSize: 20}}>{state.post.title}</Text>
                        {
                        state.post.price ? 
                        <Text style={{ fontSize: 15, paddingTop: 8, color: 'red', fontWeight: '700', letterSpacing: 0.5 }}>${state.post.price}</Text>
                          : null
                        }
                        {state.post.offer && <Text style={{fontSize: 15,letterSpacing: 0.5,  color: 'gold', fontWeight: '700' }}>{state.post.offer} Offer</Text>}
                      </View>
                      <View  style={{ paddingHorizontal: 15,  flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
              
                  {state.post.likes.map(like => (
                    <View key={like.id}>
                      <LikedBy item={like} />
                    </View>
                    ))}
                    { state.post.likes.length == 0 ? null :
                      <Text style={{ alignItems: 'center', paddingRight: 5,...GlobalStyles.greyTextSmall, color: GlobalStyles.darkFontColor.color, fontWeight: '700' }}> and {state.post.likes.length - 1} others liked this product</Text> 
                    }
                  </View>
                  </View>
                  {
                    state.post.author.user.username !== userInfo.username ? 
                      <View style={styles.interactionContainer}> 
                        <TouchableOpacity onPress={() => navigation.navigate('Chat', {ID: state.post.author.id })}
                          style={styles.bookmarkStyles}
                        >
                            <Feather name="mail" size={18} style={{...styles.msgBookmark, elevation: 5,}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bookmarkStyles}>
                          <Feather name="phone" size={18} style={{...styles.bookmark, elevation: 5}} />
                        </TouchableOpacity>
                        {
                          addedItemToCart ? 
                          <TouchableOpacity style={styles.bookmarkStyles} onPress={removeFromCart}>
                            <Feather name="check" size={18} style={{...styles.bookmark, elevation: 5, backgroundColor: '#1287A5',}} />
                          </TouchableOpacity> :
                          <TouchableOpacity style={styles.bookmarkStyles} onPress={addToCart}>
                            <Feather name="plus" size={18} style={{...styles.bookmark, elevation: 5, backgroundColor: '#1287A5',}} />
                          </TouchableOpacity>
                        }
                        
                         
                      </View> : null 
                  }
              </View>

                <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                      <Dialog.Content>
                        <Paragraph>This Post Will Be Deleted!</Paragraph>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={hideDialog} >Cancel</Button>
                        <Button onPress={deleteBtnHandler} >Done</Button>
                      </Dialog.Actions>
                  </Dialog>
                </Portal>

              <View style={{ paddingHorizontal: 15, paddingTop: 5}}>
                    <Subheading style={styles.headerFont}>Description</Subheading>
              </View>

              <View style={{ flex: 1, marginBottom: 8, paddingHorizontal: 15 }}>
                  
                  <View style={{ flex: 1, }}>
                    <Paragraph style={{ fontSize: 16,}}>{state.post.description}</Paragraph>
                </View>
              </View>
          </View>

          
            
          </View>

          
    
          <View style={{ flexDirection: 'row', alignItems: 'center',paddingVertical: 8, paddingHorizontal: 15 }}>
            {!state.post.comments.length ? <Text style={styles.text}>(0) COMMENTS</Text> : <Text style={styles.text}>({state.post.comments.length}) COMMENTS</Text>}
            <FontAwesome5 name="rocket" size={14} color="#777" style={{ textAlign: 'center', paddingHorizontal: 4 }} />
          </View>
        </>
      }
      data={state.post.comments}
      refreshControl={refreshControl}
      renderItem={({item}) => (
        <View style={styles.commentsContainer}>
          <CommentComponent item={item} />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
    
    <View style={styles.UploadBtn}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('AddComment', { item: state.post, reloadPosts: reloadPosts,  })
        }}>
          <FontAwesome5 name="comment" size={18} color="white" style={{ textAlign: 'center' }} />
        </TouchableOpacity>
    </View>
    </> }
  </>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white'
  },
  headerFont: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  imageContainer: {
    flex: 2,
    backgroundColor: 'black',
    width: '100%',
    height: 300
  },
  UploadBtn: {
    padding: 15,
    backgroundColor: GlobalStyles.themeColor.color, 
    borderRadius: 24, 
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5
  },
  commentsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 8
  },
  accountName: {
    fontSize: 15,
    color: '#2C3335',
    fontWeight: "700",
  },
  descriptionContainer: {
      flex: 1,
  },
  secDesContainer: { 
    flex: 1,
    paddingHorizontal: 15, 
    paddingTop: 12,

},
editBtn: {
  marginVertical: 8, 
  borderRadius: 8, 
  width: 30,  

  backgroundColor: 'white',
},
deleteBtn: {
  marginVertical: 8,  
  paddingHorizontal: 10
},
separator: {
  marginVertical: 5,
  borderBottomWidth: 0.5,
  borderBottomColor: "#ddd"
},
accountContainer: { 
  flexDirection: 'row', 
  alignItems: 'center', 
  paddingVertical: 8 ,
},
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 12,
    left: 8,
    right: 8
  },
  errorStyles: { 
    padding: 10,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
    borderRadius: 5,
    elevation: 2,
  },
  topBtnContainer: {
    padding: 5, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    elevation: 5
  },
  modalText: {
    fontSize: 21,
    fontWeight: '700',
    letterSpacing: 0.8
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    color: '#777',
},
bookmarkStyles: {
  flex: 1,
  alignItems: 'center',
},
interactionContainer: {
  flexDirection: 'row',
  width: 150,
  height: 65,
  position: "absolute",
  top: 12,
  right: 0,
},
phoneStyles: {
  flex: 1,
},
cartStyles: {
  flex: 1,
},
  msgBookmark:{
    color: "#fff",
    padding: 10,
    backgroundColor: "#75DA8B",
    borderRadius: 56 / 2,
  },
  bookmark: {
    position: "absolute",
    color: "#fff",
    padding: 10,
    backgroundColor: "#B83227",
    borderRadius: 56 / 2,
  },
  buttonContainer: {
    padding: 12,
    backgroundColor: '#B83227',
    borderRadius: 8,
    marginVertical: 10,
  },
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}

export default connect(mapStateToProps, null)(ProductDetails)