import React, {useState, useEffect, useContext, useReducer } from 'react'
import { View,  StyleSheet, Image, TouchableOpacity, RefreshControl, ActivityIndicator, FlatList, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import {  Paragraph, Button, Dialog, Portal, Text } from 'react-native-paper';
import axios from 'axios'



import {AppHeaderText, ApploadingComponent, AppText, CommentComponent, ErrorView, OtherHeaderComponent, FullImageModal } from '../../components/';
import { GlobalStyles } from '../../styles/GlobalStyles'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { CompanyContext } from '../../context/profiles/CompanyContextProvider'
import { fetchPosts } from '../../redux/posts/postsRedux';




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

const ProductDetails = ({ route, navigation, authToken, reloadPosts, reloadAllPosts }) => {

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
    
    const { ID, post, addToCartFunc, removeFromCartFunc, addedToCart } = route.params

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

    const refetchPosts = () => {
      reloadPosts(token)
      fastRefresh()
    }

    useEffect(() => {
      fetchPostDetail()
      fetchUserMe()
      fetchCheckIsLikedPost()
    },[])

    const goHome = () => {
      navigation.goBack()
    }


    const deleteBtnHandler = async() => {
      
      await axios.delete(`${APIROOTURL}/api/post/${ID}/delete/`,{
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(res => {
        
      })
      .catch(err => {
        console.log(err);
      })
      setVisible(false)
      goHome() 
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



    const fastRefresh = () => {
      fetchPostDetail()
      refreshFetchUserMe()
    }

    const numOfComments = () => {
      const commentsCount = state.post.comments.length
      return commentsCount
    }

    const numOfLikes = () => {
      const likesCount = state.post.likes.length
      return likesCount
    }


  if(state.loading) return <ApploadingComponent /> 

  if(state.error) return <ErrorView onPress={reloadPosts} error={state.error} />

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
            comments={numOfComments}
            image={state.post.image}
            likes={numOfLikes} />


          { state.post.image &&
            <TouchableWithoutFeedback style={styles.imageContainer} onPress={() => setFullImageModalOpen(true)} > 
              <View style={styles.imageStyles}>
                  <Image source={{ uri: state.post.image }} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
              </View>
            </TouchableWithoutFeedback> 
          }


         
          
          <View style={styles.descriptionContainer}>
                
              <View style={styles.infoContainer}>

                  <View style={{flex: 1 }}>
                      <View  style={styles.accountContainer}>

                        <View style={styles.profileContainer}>
                            <Image source={{ uri: state.post.author.profile_pic }} style={GlobalStyles.largeRoundedPictContainer} />
                            <View style={{ alignItems: 'center' }}>
                              <View style={{ flexDirection: 'row' }}> 
                                <Text style={{...GlobalStyles.darkHeaderText, fontSize: 15}}>{state.post.author.user.username}</Text>
                                {
                                  state.post.author.verified ?  <AntDesign name="star" size={10} color={GlobalStyles.darkFontColor.color} /> : null
                                }
                              
                              </View>
                              <Text style={{...GlobalStyles.greyTextSmall, fontSize: 13}}>{state.post.author.profile_type.name}</Text>
                            </View>
                        </View>

                        {
                            state.post.author.user.username == userInfo.username &&
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start'}}>
                              <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('Edit Post', {ID: ID, item: post, refreshPost: fastRefresh, })}>
                                <AppText color={GlobalStyles.blue.color}>Edit</AppText>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.deleteBtn} onPress={showDialog}>
                                <AppText color={GlobalStyles.blue.color}>Delete</AppText>
                              </TouchableOpacity>
                            </View>
                          }   
                      </View>

                      <View>
                          <AppHeaderText>{state.post.title}</AppHeaderText>
                          { state.post.price && <AppText color='red' fontWeight='700'>${state.post.price}</AppText> }
                          {state.post.offer && <AppText color='gold' fontWeight='700'>{state.post.offer} Offer</AppText>}
                      </View>
                    
                    <View  style={styles.likeInfo}>
                        { state.post.likes.length == 0 ? null :
                          <Text style={{ alignItems: 'center', paddingRight: 5,...GlobalStyles.greyTextSmall, color: GlobalStyles.darkFontColor.color, fontWeight: '700' }}>You and {state.post.likes.length - 1} others liked this product</Text> 
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
                          addedToCart ? 
                          <TouchableOpacity style={styles.bookmarkStyles} onPress={removeFromCartFunc}>
                            <Feather name="check" size={18} style={{...styles.bookmark, elevation: 5, backgroundColor: '#1287A5',}} />
                          </TouchableOpacity> :
                          <TouchableOpacity style={styles.bookmarkStyles} onPress={addToCartFunc}>
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

              <View style={{ paddingHorizontal: 15, marginVertical: 8}}>
                    <AppText fontWeight="700">Description</AppText>
                    <AppText fontSize={15}>{state.post.description}</AppText>
              </View>

          </View>

          </View>

          
    
          <View style={{ flexDirection: 'row', alignItems: 'center',paddingVertical: 8, paddingHorizontal: 15 }}>
            {!numOfComments ? <Text style={styles.text}>(0) COMMENTS</Text> : <Text style={styles.text}>({state.post.comments.length}) COMMENTS</Text>}
            <FontAwesome5 name="rocket" size={14} color="#777" style={{ textAlign: 'center', paddingHorizontal: 4 }} />
          </View>
        </>
      }
      data={state.post.comments}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={styles.commentsContainer}>
          <CommentComponent item={item} />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
    
    <TouchableWithoutFeedback 
        onPress={() => {
          navigation.navigate('AddComment', { item: state.post, refreshPost: fastRefresh,  })
            }}>
        <View style={styles.UploadBtn}>
              <FontAwesome5 name="comment" size={18} color="white" />
        </View>
    </TouchableWithoutFeedback>
    </> }
  </>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white',
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
  likeInfo: { paddingHorizontal: 15,  flexDirection: 'row', alignItems: 'center', paddingTop: 5 },
  UploadBtn: {
    alignItems: 'center',
    backgroundColor: GlobalStyles.themeColor.color, 
    borderRadius: 50/2, 
    bottom: 20,
    elevation: 5,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    right: 20,
    width: 50,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  commentsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 8
  },
  infoContainer: { flexDirection: "row", paddingTop: 12 },
  accountName: {
    fontSize: 15,
    color: '#2C3335',
    fontWeight: "700",
  },
  imageStyles: { 
    backgroundColor: "black", 
    width: "100%", 
    height: 300 
  },
  descriptionContainer: {
      flex: 1,
      marginHorizontal: 10
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
  justifyContent: 'space-between', 
  width: "100%",
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

const mapDispatchToProps = dispatch => {
  return {
    reloadAllPosts: token => dispatch(fetchPosts(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)