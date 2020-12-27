import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, } from 'react-native'
import { MaterialCommunityIcons, AntDesign, Feather, Entypo, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Text, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles'
import axios from 'axios'
import moment from 'moment';
import FullImageModal from './Modals/FullImageModal';
import { AuthContext } from '../context/authentication/Context'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { UserInfoContext } from '../context/userInfoContext/UserInfoContextProvider'
import { CompanyContext } from '../context/profiles/CompanyContextProvider';
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import ShareDialogBox from './ShareDialogBox/ShareDialogBox';


const ProductCard = ({ item   }) => {

  const [ openModal, setOpenModal ] = useState(false);
  
  const [shareBoxvisible, setShareBoxVisible] = useState(false);
  
  const [visible, setVisible] = useState(false);

  const  { fetchFirstPostsData }  = useContext(CompanyContext);

  const [ fullImageModal, setFullImageModal ] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [ count, setCount  ] = useState(1);

  const [ pressLike, setPressedLike ] = useState(false);

  const [ createdLikeID, setCreatedLikeID ] = useState(null);

  const { userInfo } = useContext(UserInfoContext);

  const { authState } = useContext(AuthContext);

  const token = authState.token

  const navigation = useNavigation()
  

  const data = {
    liked_post: [item.id,],
    liker: `Profile for ${userInfo.user}`
  }

  const modalhandler = () => {
    setOpenModal(true)
  }

  const setShowShowShareDialog  = () => {
    setShareBoxVisible(true);
  }

  const hideShareDialog = () => {
    setShareBoxVisible(false);
  }

  const fastRefresh = () => {
    fetchFirstPostsData()
  }

  const bgColor = pressLike ? 'pink' : '#ddd';
  const heartIcon = pressLike ?  <Entypo name="heart" size={20} color="#B83227" style={{ textAlign: 'center' }} /> 
                  :  <Entypo name="heart-outlined" size={20} color="#616C6F" style={{ textAlign: 'center' }} /> 
 
  

  const likePost = () => {
    axios.post(`${APIROOTURL}/api/like_post/`, data, {
      headers: {
        'Authorization': `Token ${token}`, 
        data: data
      }
    })
    .then(res => {
        setCreatedLikeID(res.data.id);
    })
    .catch(err => {
        console.log(err);
    })
    fastRefresh()
    setPressedLike(!pressLike)
    
  }

  const UnLikePost = () => {
    axios.delete(`${APIROOTURL}/api/unlike_post/${createdLikeID}/delete/`,{
      headers: {
        'Authorization': `Token ${token}`, 
      }
    })
    .then(res => {
        // console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    })
    setPressedLike(!pressLike)
    fastRefresh()
  }
  

  const name = userInfo.user;
  // console.log(item.id);
const { container } = styles


 return(

  <View style={container}>
    <ShareDialogBox  hideShareDialog={hideShareDialog} shareBoxvisible={shareBoxvisible} setShowShowShareDialog={setShowShowShareDialog}/>
    <View style={styles.description}>
      <View style={styles.actionContainer}>
        <View style={styles.bookmarkIcon}>
            <Feather name="plus" size={18} color="white" />
          </View>
          <TouchableOpacity style={styles.threeDots} onPress={() => setShowShowShareDialog()}>
            <Entypo name="dots-three-vertical" size={18} color="black"  />
          </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',  paddingHorizontal: 20 }}>
        <Image source={{ uri: item.author.profile_pic }} style={{...GlobalStyles.roundedPictContainer, width: 37,height: 37}} />
          <View style={{ paddingHorizontal: 12 }}>
            { name != item.author.user.username ? 
              <TouchableOpacity onPress = {() => navigation.navigate("CompanyProfile", {ID: item.author.id})}>
                <Text style={styles.accountName}>{item.author.user.username}</Text>
              </TouchableOpacity> :
              <TouchableOpacity onPress = {() => navigation.navigate("Profile" )}>
                <Text style={styles.accountName}>{item.author.user.username}</Text>
              </TouchableOpacity>

              }
              <View style={styles.ratingsContainer}>
              
                  <Text style={styles.time}>/ Posted about { moment(item.created).startOf('hour').fromNow()}</Text>
                  
              </View>
          </View>
      </View>

      <View style={styles.details}>

        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20}}>

          <TouchableOpacity onPress={() => navigation.navigate('Product Details', 
              { post: item, ID: item.id,})}>

            <Text numberOfLines={3} style={styles.text}>{item.title}</Text>
          </TouchableOpacity>

          <View style={{ paddingHorizontal: 5 }}>
            {/* <AntDesign name="heart" color="black" size={15} /> */}
          </View>
          
        </View>

        <View style={{ flexDirection: "row",alignItems: "center", paddingHorizontal: 20, paddingBottom: 12 }}>
              {item.price && <Text style={styles.priceText}>$ {item.price}</Text>}
            {item.offer && <Text style={{ fontSize: 13,color: '#2C3335', fontWeight: "bold", color: "gold",  }}>  <Text style={{ color: '#777' }}>•</Text>  {item.offer}%  <Text style={{color: '#777', fontSize: 11}}>Off</Text></Text>}
        </View>

        <FullImageModal showModal={fullImageModal} 
      closeModal={setFullImageModal}
      image={item.image} />

        {item.image ? 
        <TouchableWithoutFeedback onPress={() => setFullImageModal(true)}>
          <Image source={{uri: item.image }} style={{ width: "100%", height: 180}} />
        </TouchableWithoutFeedback> 
        :
          null
        }
          <View style={styles.commentsContainer}>
          <Text style={{...styles.time, fontWeight: 'bold'}}>ON SALE  • </Text>
          { item.likes.length == 1 ?
            <Text style={styles.likesContainer}>{item.likes.length} like  •</Text> :
            <Text style={styles.likesContainer}>{item.likes.length} likes  • </Text> 
            
          }

          {
            item.comments.length == 1 ? 
            <Text style={styles.time}>{item.comments.length} comment</Text> :
            <Text style={styles.time}>{item.comments.length} comments</Text>
          }
            {/* <Entypo name="500px-with-circle" size={2.5} color="black" /> */}
            {/* <Entypo name="500px-with-circle" size={2.5} color="black" /> */}
            {/* <Text style={{...styles.time, paddingHorizontal: 5}}>0 Likes</Text> */}
            {/* <Text style={styles.dotContainer}>-</Text> */}

          </View>
      </View>
      <View style={styles.reactionContainer}>
        {
          pressLike ? 
           
          <TouchableRipple 
            style={{ flex: 1, paddingHorizontal: 8, 
            paddingVertical: 3,  backgroundColor: bgColor, 
            borderRadius: 9 }} 
            rippleColor="rgba(0, 0, 0, .32)"
            onPress={UnLikePost}>
            <FontAwesome5 name="heart" size={18} color="#616C6F" style={{ textAlign: 'center' }} />
          </TouchableRipple>
            :
          <TouchableOpacity style={{ flex: 1, paddingHorizontal: 8, 
            paddingVertical: 3, color: '#ddd', backgroundColor: '#ddd', 
            borderRadius: 9 }}
            onPress={likePost}>
              {/* {heartIcon} */}
              <FontAwesome name={pressLike ? 'heart' : 'heart-o'} size={18} color={pressLike ? "#616C6F" : '#616C6F'} style={{ textAlign: 'center' }} />
          {/* <AntDesign name="heart" size={18} color="#616C6F" style={{ textAlign: 'center' }}  /> */}
          </TouchableOpacity>

        }
        
        
        <TouchableOpacity style={styles.comment} onPress={() => {
          navigation.navigate('AddComment', {item: item, refreshPost: fastRefresh  })
          // navigation.navigate('AddComment', { item: state.post, refreshPost: fastRefresh })
        }}>
          <FontAwesome5 name="comment" size={18} color="#616C6F" style={{ textAlign: 'center' }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowShowShareDialog()} style={{flex: 1,  paddingHorizontal: 8, paddingVertical: 3, color: '#ddd', backgroundColor: '#ddd', borderRadius: 9 }}>
          <Feather name="share-2" size={18} color="#616C6F" style={{ textAlign: 'center' }} />
          {/* <Chip icon="information"></Chip> */}
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}


const styles = StyleSheet.create({

  container: {
   paddingVertical: 15,
  //  marginBottom: 2,
  //  marginTop: 8,
  borderTopWidth: 0.5,
  borderTopColor: '#ddd',
  // borderBottomWidth: 0.5,
  // borderBottomColor: '#ddd',
   backgroundColor: "white",
  //  borderRadius: 14,
   elevation: 1
  },
  comment: {flex: 1,
    marginHorizontal: 8,  
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    color: '#ddd', 
    backgroundColor: '#ddd', 
    borderRadius: 9 
  },
  reactionContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 22, 
    justifyContent: 'space-between',
},
actionContainer: {
  position: 'absolute',
  right: 10,
  flexDirection: 'row',
  alignItems: 'center'
},
threeDots: {
  paddingHorizontal: 3
},  
  bookmarkIcon: {
    backgroundColor: '#1287A5',
    padding: 3,
    borderRadius: 5
  },
  commentsContainer: {
    flex: 1,
    flexDirection: 'row',
    // borderTopWidth: 0.5,
    // borderTopColor: '#ddd',
    paddingHorizontal: 22, 
  },
  topBtnContainer: {
    padding: 5, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    elevation: 5
  },
  buttonContainer: {
    padding: 18,
    backgroundColor: '#B83227',
    borderRadius: 8,
    marginVertical: 18,
  },
  ratingsContainer: {
    flexDirection: "row",
  },
  modalText: {
    fontSize: 19,
    fontWeight: '600',
    // paddingBottom: 8
  },
  quantityBtn: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 18,
    borderColor: '#B83227',
  },
  priceText: {
    fontSize: 13,
    color: "red",
    fontWeight: 'bold'
  },
  description: {
    flex: 1,
    // flexDirection: "row",
    // paddingTop: 5,
  },
  details: {
    flex: 3,
    paddingVertical: 10,
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#ddd'
  },
  text: {
    fontSize: 18,
    color: '#2C3335',
    fontWeight: '700',
    letterSpacing: 0.5
  },
  accountName: {
    fontSize: 14,
    color: '#2C3335',
    fontWeight: "700",
  },
  time: {
    fontSize: 12,
    color: "#777",
    paddingHorizontal: 3,
    letterSpacing: 0.5
  },
  likesContainer: {
    fontSize: 12,
    color: "#777",
    letterSpacing: 0.5
  },
  detailsContainer: {
    flexDirection: "row"
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 12,
    left: 8,
    right: 8
  },
  bookmark: {
    position: "absolute",
    color: "#fff",
    top: -56 / 2,
    right: 5,
    padding: 13,
    backgroundColor: "#B83227",
    borderRadius: 56 / 2,
    zIndex: 10
  }
})
export default ProductCard;