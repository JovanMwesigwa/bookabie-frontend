import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {  AntDesign, Feather, Entypo, FontAwesome5, FontAwesome } from '@expo/vector-icons';
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
import ShareDialogBox from './ShareDialogBox/ShareDialogBox';
import AsyncStorage from '@react-native-community/async-storage';






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

  const [ IDsMap, setIDsMap ] = useState({});

  const [ likedID, setLikedID ] = useState(null)

  const [ isLiked, setIsLiked ] = useState(false);

  const [ addedToCart, setAddedToCart ] = useState(false);

  const addToCart = () => {
    setAddedToCart(true);
    saveCartBtnState();
  }

  const removeFromCart = () => {
    setAddedToCart(false);
    removeCartBtnState();
  }

  const saveCartBtnState = async() => {
    try {
      await AsyncStorage.set("CartBtnState", addToCart)
    } catch (error) {
      console.log(error);
    }
  }

  const removeCartBtnState = async() => {
    try {
      await AsyncStorage.removeItem("CartBtnState")
    } catch (error) {
      console.log(error);
    }
  }

  const loadCartBtnState = async() => {
    try {
      let btnState = await AsyncStorage.getItem("CartBtnState");
      if (btnState !== null){
        setAddedToCart(btnState);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
    fetchCheckIsLikedPost();
    fetchFirstPostsData();
  }

  const bgColor = isLiked ? 'pink' : '#ddd';
  const heartIcon = pressLike ?  <Entypo name="heart" size={20} color="#B83227" style={{ textAlign: 'center' }} /> 
                  :  <Entypo name="heart-outlined" size={20} color="#616C6F" style={{ textAlign: 'center' }} />                
  
 
  const likePost = async() => {
    try {
      const responseID = await axios.post(`${APIROOTURL}/api/like_post/`, data, {
        headers: {
          'Authorization': `Token ${token}`, 
          data: data
        }
      })
      setCreatedLikeID(responseID.data.id);
      setPressedLike(!pressLike)
      fetchCheckIsLikedPost()
    } catch (error) {
      console.log(error)
    }
    
  }

  

  const UnLikePost = () => {
    axios.delete(`${APIROOTURL}/api/unlike_post/${createdLikeID}/delete/`,{
      headers: {
        'Authorization': `Token ${token}`, 
      }
    })
    .then(res => {
    })
    .catch(err => {
        console.log(err);
    })
    setPressedLike(!pressLike)
    fetchCheckIsLikedPost()
  }

  const fetchCheckIsLikedPost = async() => {
    try {
      const responseData = await axios.get(`${APIROOTURL}/api/check_likes/${item.id}`,  {
        headers: {
          'Authorization': `Token ${token}`, 
        },
      })
      setIsLiked(responseData.data.Response);
    } catch (error) {
      console.log(error);
    }
  };


  const addToCartData = {
      product: item.id,
  }

  const addProductToCart = () => {
    axios.post(`${APIROOTURL}/api/add_to_cart/`, addToCartData, {
      headers: {
        'Authorization': `Token ${token}`,
        data: addToCartData,
      }
    })
    .then(res => {

    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchCheckIsLikedPost();
    loadCartBtnState();
  },[])

  const name = userInfo.user;

  const addToCartHandler = () => {
    addProductToCart();
    addToCart();
  }
  
const { container } = styles


 return(

  <View style={container}>
    <ShareDialogBox  hideShareDialog={hideShareDialog} shareBoxvisible={shareBoxvisible} setShowShowShareDialog={setShowShowShareDialog}/>
    <View style={styles.description}>
      <View style={styles.actionContainer}>
        {
          addedToCart ? 
          <TouchableOpacity style={{...styles.bookmarkIcon, backgroundColor: "#B83227"}} onPress={removeFromCart}>
            <Feather name="check" size={20} color="white" />
          </TouchableOpacity> :
          <TouchableOpacity style={{...styles.bookmarkIcon}} onPress={addToCartHandler}>
            <Feather name="plus" size={20} color="white" />
          </TouchableOpacity>
        }
          
          <TouchableOpacity style={styles.threeDots} onPress={() => setShowShowShareDialog()}>
            <Entypo name="dots-three-vertical" size={15} color="black"  />
          </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',  paddingHorizontal: 20 }}>
        <Image source={{ uri: item.author.profile_pic }} style={GlobalStyles.smallRoundedPictContainer} />
          <View style={{ paddingHorizontal: 12 }}>
            { name != item.author.user.username ? 
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress = {() => navigation.navigate("CompanyProfile", {ID: item.author.id})}>
                <Text style={GlobalStyles.darkHeaderText}>{item.author.user.username}</Text>
                {
                  item.author.verified ? <AntDesign name="star" size={10} color={GlobalStyles.darkFontColor.color} /> : null
                }
              </TouchableOpacity> :
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress = {() => navigation.navigate("Profile" )}>
                <Text style={GlobalStyles.darkHeaderText}>{item.author.user.username}</Text>
                {
                  item.author.verified ? <AntDesign name="star" size={10} color={GlobalStyles.darkFontColor.color} /> : null
                }
              </TouchableOpacity>
                
              }
              
              <View style={styles.ratingsContainer}>
              
                  <Text style={GlobalStyles.greyTextSmall}>/ Posted about { moment(item.created).startOf('hour').fromNow()}</Text>
                  
              </View>
          </View>
      </View>

      <View style={styles.details}>

        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20}}>

          <TouchableOpacity onPress={() => navigation.navigate('Product Details', 
              { post: item, ID: item.id })}>

            <Text numberOfLines={3} style={GlobalStyles.darkTitleText}>{item.title}</Text>
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
          image={item.image}
          comments={item.comments}
          likes={item.likes} 
        />

        {item.image ? 
        <TouchableWithoutFeedback onPress={() => setFullImageModal(true)}>
          <Image source={{uri: item.image }} style={{ width: "100%", height: 180}} />
        </TouchableWithoutFeedback> 
        :
          null
        }
          <View style={styles.commentsContainer}>
          <Text style={{...GlobalStyles.greyTextSmall, fontWeight: 'bold'}}>ON SALE  • </Text>
          { item.likes == 1 ?
            <Text style={styles.likesContainer}>{item.likes} like  •</Text> :
            <Text style={styles.likesContainer}>{item.likes} likes  • </Text> 
            
          }

          {
            item.comments == 1 ? 
            <Text style={GlobalStyles.greyTextSmall}>{item.comments} comment</Text> :
            <Text style={GlobalStyles.greyTextSmall}>{item.comments} comments</Text>
          }

          </View>
      </View>
      <View style={styles.reactionContainer}>
        {
          isLiked ? 
           
          <TouchableRipple 
            style={{ flex: 1, paddingHorizontal: 8, 
            paddingVertical: 3,  backgroundColor: bgColor, 
            borderRadius: 9 }} 
            rippleColor="rgba(0, 0, 0, .32)"
            onPress={UnLikePost}>
            <FontAwesome name='heart' size={18} color="#B83227" style={{ textAlign: 'center' }} />
          </TouchableRipple>
            :
          <TouchableOpacity style={{ flex: 1, paddingHorizontal: 8, 
            paddingVertical: 3, color: '#ddd', backgroundColor: '#ddd', 
            borderRadius: 9 }}
            onPress={likePost}>
              <FontAwesome name="heart-o" size={18} color={pressLike ? GlobalStyles.themeColor.color : '#616C6F'} style={{ textAlign: 'center' }} />
          </TouchableOpacity>

        }
        
        
        <TouchableOpacity style={styles.comment} onPress={() => {
          navigation.navigate('AddComment', {item: item, refreshPost: fastRefresh  })
        }}>
          <FontAwesome5 name="comment" size={18} color="#616C6F" style={{ textAlign: 'center' }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowShowShareDialog()} style={{flex: 1,  paddingHorizontal: 8, paddingVertical: 3, color: '#ddd', backgroundColor: '#ddd', borderRadius: 9 }}>
          <Feather name="share-2" size={18} color="#616C6F" style={{ textAlign: 'center' }} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}


const styles = StyleSheet.create({

  container: {
   paddingVertical: 15,
  borderTopWidth: 0.5,
  borderTopColor: '#ddd',
   backgroundColor: "white",
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
  alignItems: 'center',
  justifyContent: 'center'
},
threeDots: {
  paddingHorizontal: 4,

},  
  bookmarkIcon: {
    backgroundColor: '#1287A5',
    padding: 3,
    borderRadius: 5,
  },
  commentsContainer: {
    flex: 1,
    flexDirection: 'row',
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
  },
  details: {
    flex: 3,
    paddingVertical: 10,
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
  cartAlertMsg: {
    position: "absolute",
    bottom: 2,
    left: 0,
    padding: 18,
    width: "100%",
    height: 64,
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