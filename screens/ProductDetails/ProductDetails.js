import React, {useState, useEffect, useContext, useReducer } from 'react'
import axios from 'axios'
import { MaterialIcons, AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { CompanyContext } from '../../context/profiles/CompanyContextProvider'
import { View, Text, StyleSheet, Image, TouchableOpacity, RefreshControl, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import FullImageModal from '../../components/Modals/FullImageModal';
import OtherHeaderComponent from '../../components/OtherHeaderComponent';
import { AuthContext } from '../../context/authentication/Context'
import CommentComponent from '../../components/CommentComponent';
import { Headline, Paragraph, Subheading, Button, Dialog, Portal, Chip, Caption } from 'react-native-paper';
import LikedBy from '../../components/LikedBy';
import * as Animatable from 'react-native-animatable';



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

const ProductDetails = ({ route, navigation}) => {

    const [ state, dispatch ] = useReducer(reducer, initialState);

    const [ count, setCount  ] = useState(1);

    const [visible, setVisible] = useState(false);
    
    const [ userInfo, setUserInfo ] = useState({});
 
    const [ fullImageModalOpen, setFullImageModalOpen ] = useState(false)

    const { fetchFirstPostsData } = useContext(CompanyContext)

    const { authState } = useContext(AuthContext);

    const hideDialog = () => setVisible(false);

    const showDialog = () => setVisible(true);

    const token = authState.token;

    const { ID, post } = route.params
    
    const fetchPostDetail = async(token_) => {
      try{
        const response = await axios.get(`${APIROOTURL}/api/post/${ID}/detail/`,{
          headers: {
            'Authorization': `Token ${token_}`
          }
        })
        dispatch({type: 'FETCH_SUCCESS', payload: response.data })
      }catch(error){
        dispatch({type: 'FETCH_FAILED' })
      }
    }

    const fetchUserMe = async(token_) => {
      try{
        const userResponse = await axios.get(`${APIROOTURL}/api/auth/users/me/`, {
          headers: {
            'Authorization': `Token ${token_}`
          }
        })
        setUserInfo(userResponse.data);
      }catch(error){
        console.log(err);
      }
    }

    const editBtnHandler = () => {
      navigation.navigate('Edit Post', {ID: ID, item: post })
      // console.log('the log id id', ID);
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
      // alert('The Post has been deleted');
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

    useEffect(() => {
      const effectFetch = async() => {
        const token_ = await authState.token
        fetchPostDetail(token_) 
        fetchUserMe(token_)
      }
      effectFetch();
    },[])

    const fastRefresh = () => {
      refreshFetchPostDetail()
      refreshFetchUserMe()
    }

     // console.log('From post', state.post.author.user.username);
    // console.log(state.post.title);

    // console.log('real comments is ', state.post.comments);

    // const comments = state.post.comments
    // console.log("Comments",comments.length);
    // const commentNumber = comments.length

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
            image={state.post.image} />

          { state.post.image ?

          <TouchableOpacity style={styles.imageContainer}
            onPress={() => setFullImageModalOpen(true)} >

              <Image source={{ uri: state.post.image }} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
              
          </TouchableOpacity> :
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
                      
                      {/* Descriptions here */}
                  <View>

                      <View  style={styles.accountContainer}>
                          <Image source={{ uri: state.post.author.profile_pic }} style={GlobalStyles.roundedPictContainer} />
                          <View style={{  paddingLeft: 10 }}>
                            <Text style={{...styles.accountName, fontSize: 15,}}>{state.post.author.user.username}</Text>
                            <Caption style={{ fontSize: 14 }}>{state.post.author.profile_type.name}</Caption>
                            {/* <Text ></Text> */}
                          </View>
                      </View>

                      <View>
                        <Headline style={styles.modalText}>{state.post.title}</Headline>
                        {/* <Text ></Text> */}
                        <Text style={{ color: 'red', fontWeight: '700', letterSpacing: 0.5 }}>${state.post.price}</Text>
                        {state.post.offer && <Text style={{letterSpacing: 0.5, fontSize: 13, color: 'gold', fontWeight: '700' }}>{state.post.offer}% Offer</Text>}
                      </View>

                  </View>
                      <TouchableOpacity onPress={() => navigation.navigate('Chat', {ID: state.post.author.id })}
                        style={styles.bookmarkStyles}
                      >
                          <Feather name="mail" size={18} style={{...styles.msgBookmark, elevation: 5,}} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.phoneStyles}>
                        <Feather name="phone" size={18} style={{...styles.bookmark, elevation: 5}} />
                      </TouchableOpacity>
                      
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

            <View  style={{ flex: 1, paddingHorizontal: 15, paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
              { state.post.likes.length == 0 ? null :
                <Text style={{ paddingRight: 5 }}>Liked By</Text> 
              }
              {state.post.likes.map(like => (
              <View key={like.id}>
                <LikedBy item={like} />
              </View>
              ))}
            </View>

              <View style={styles.separator}>
              
              </View>
              <View style={{ paddingHorizontal: 15, }}>
                    <Subheading style={styles.headerFont}>Description</Subheading>
                    {/* <Text ></Text> */}
              </View>

              <View style={{ flex: 1, marginBottom: 8, paddingHorizontal: 15 }}>
                  
                  <View style={{ flex: 1, }}>
                    <Paragraph style={{ letterSpacing: 0.5 }}>{state.post.description}</Paragraph>
                    {/* <Text muted style={{...styles.mainText, fontSize: 14 }}></Text> */}
                </View>
              </View>
          </View>
            
          </View>
    
          <View style={{ flexDirection: 'row', alignItems: 'center',paddingVertical: 8, paddingHorizontal: 15 }}>
            {!state.post.comments.length ? <Text style={styles.text}>(0) COMMENTS</Text> : <Text style={styles.text}>({state.post.comments.length}) COMMENTS</Text>}
            <FontAwesome5 name="rocket" size={14} color="#777" style={{ textAlign: 'center', paddingHorizontal: 4 }} />
            {/* <Text style={styles.text}>({state.post.comments.length})BEST COMMENTS</Text>  */}
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
          navigation.navigate('AddComment', { item: state.post, refreshPost: fastRefresh })
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
    backgroundColor: '#B83227', 
    borderRadius: 24, 
    // paddingHorizontal: 18,
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
  // marginLeft: 320, 
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
  marginVertical: 10,
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
    // flex: 1,
    padding: 10,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
    borderRadius: 5,
    elevation: 2,
    // borderLeftWidth: 5,
    // borderLeftColor: '#B83227' 
  },
  topBtnContainer: {
    padding: 5, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    elevation: 5
  },
  modalText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3
    // paddingBottom: 8
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    color: '#777',
    // paddingBottom: 8,
    // paddingHorizontal: 4
    
},
bookmarkStyles: {
  position: "absolute",
  top: 5,
  right: 75,
},
phoneStyles: {
  position: "absolute",
  top: 0,
  right: 8,
},
  msgBookmark:{
    
    color: "#fff",
    
    padding: 13,
    backgroundColor: "#75DA8B",
    borderRadius: 56 / 2,
  },
  bookmark: {
    position: "absolute",
    color: "#fff",
    top: 5,
    right: 8,
    padding: 13,
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
export default ProductDetails