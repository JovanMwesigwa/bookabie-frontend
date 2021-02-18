import React, { useState, useContext} from 'react'
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight   } from 'react-native'
import {  AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles'
import axios from 'axios'
import moment from 'moment';
import FullImageModal from './Modals/FullImageModal';
import { UserInfoContext } from '../context/userInfoContext/UserInfoContextProvider'
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import ShareDialogBox from './ShareDialogBox/ShareDialogBox';
import { fetchaddItemToCart, fetchCartItemRemoveNoRefresh } from '../redux/cart/CartRedux';
import { connect } from 'react-redux'
import ActionButtons from './ActionButtons';
import { MaterialIcons } from '@expo/vector-icons';




const ProductCard = ({authToken, authUserID, addToCartFunc, removeCartItemFunc, item, reloadPosts}) => {
  
  const [shareBoxvisible, setShareBoxVisible] = useState(false);

  const navigation = useNavigation()
  
  const [ fullImageModal, setFullImageModal ] = useState(false);

  const [ pressLike, setPressedLike ] = useState(false);

  const [ createdLikeID, setCreatedLikeID ] = useState(null);

  const [ addedToCart, setAddedToCart ] = useState(false);

  const { userInfo } = useContext(UserInfoContext);

  const token = authToken


  const data = {
    liked_post: [item.id,],
    liker: `Profile for ${userInfo.user}`
  }

  const setShowShowShareDialog  = () => {
    setShareBoxVisible(true);
  }

  const hideShareDialog = () => {
    setShareBoxVisible(false);
  }

  const likePost = async() => {
    setPressedLike(true)
    try {
      const responseID = await axios.post(`${APIROOTURL}/api/like_post/`, data, {
        headers: {
          'Authorization': `Token ${token}`, 
          data: data
        }
      })
      setCreatedLikeID(responseID.data.id);
      reloadPosts()
    } catch (error) {
      console.log(error)
    }
    
  }

  const UnLikePost = () => {
    setPressedLike(false)
    axios.delete(`${APIROOTURL}/api/unlike_post/${createdLikeID}/delete/`,{
      headers: {
        'Authorization': `Token ${token}`, 
      }
    })
    .then(res => {
      reloadPosts()
    })
    .catch(err => {
        console.log(err);
    })
  }


  const addToCartData = {
      product: item.id,
  }

  const name = userInfo.user;

  const addToCart = () => {
    setAddedToCart(true);
  }

  const addToCartHandler = () => {
    addToCart();
    addToCartFunc(token, addToCartData);
  }

  const removeFromCart = () => {
    setAddedToCart(false);
    removeCartItemFunc(token, addToCartData)
  }


  
const { container } = styles


 return(

  <View style={container} >

    <TouchableWithoutFeedback onPress={() => navigation.navigate('Product Details', { post: item, ID: item.id, addToCartFunc: addToCartHandler, removeFromCartFunc: removeFromCart })}>
    <View style={styles.cardContainer}>
      <View>
        <View style={{ flex: 1, flexDirection: 'row'}}>

          {
            authUserID !== item.author.id ?
              <TouchableOpacity onPress = {() => navigation.navigate("CompanyProfile", {ID: item.author.id})}>
              <Image source={{ uri: item.author.profile_pic }} style={GlobalStyles.smallRoundedPictContainer} />
            </TouchableOpacity> :
            <TouchableOpacity onPress = {() => navigation.navigate("Profile", {ID: item.author.id})}>
              <Image source={{ uri: item.author.profile_pic }} style={GlobalStyles.smallRoundedPictContainer} />
            </TouchableOpacity>
          }
          
            <View style={{ paddingHorizontal: 12 }}>
              { name != item.author.user.username ? 
                <View style={{ flexDirection: 'row' }} >
                  <Text style={{...GlobalStyles.darkHeaderText, fontSize: 16}}>{item.author.user.username}</Text>
                  {
                    item.author.verified && <AntDesign name="star" size={10} color={GlobalStyles.darkFontColor.color} /> 
                  }
                </View> :
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress = {() => navigation.navigate("Profile" )}>
                  <Text style={GlobalStyles.darkHeaderText}>{item.author.user.username}</Text>
                  {
                    item.author.verified && <AntDesign name="star" size={10} color={GlobalStyles.darkFontColor.color} /> 
                  }
                </TouchableOpacity>
                  
                }
                
                <View style={styles.ratingsContainer}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="location-on" size={15} color={GlobalStyles.greenColor.color} />
                    <Text style={{ color: GlobalStyles.greenColor.color, fontSize: 12 }}>Nankulabye</Text>
                  </View>
                      <Text style={[GlobalStyles.greyTextSmall, {fontSize: 12}]}>/ Posted about { moment(item.created).startOf('hour').fromNow()}</Text>
                </View>
            </View>
          </View>
        <View style={styles.actionContainer}>
            {
              addedToCart ? 
              <TouchableOpacity style={[styles.bookmarkIcon, {backgroundColor: "#B83227"}]} onPress={removeFromCart}>
                <Feather name="check" size={20} color="white" />
              </TouchableOpacity> :
              <TouchableOpacity style={styles.bookmarkIcon} onPress={addToCartHandler}>
                <Feather name="plus" size={20} color="white" />
              </TouchableOpacity>
            }
              <TouchableOpacity style={styles.threeDots} onPress={() => setShowShowShareDialog()}>
                <Entypo name="dots-three-vertical" size={16} color="black"  />
              </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center",  paddingTop: 10}}>

            <View >
              <Text numberOfLines={3} style={GlobalStyles.darkTitleText}>{item.title}</Text>
            </View>
          </View>

            <View style={{ flexDirection: "row",alignItems: "center", paddingBottom: 12 }}>
              {item.price && <Text style={styles.priceText}>$ {item.price}</Text>}
              {item.offer && <Text style={{ fontSize: 13,color: '#2C3335', fontWeight: "bold", color: "gold",  }}>  <Text style={{ color: '#777' }}>•</Text>  {item.offer}%  <Text style={{color: '#777', fontSize: 11}}>Off</Text></Text>}
            </View>
        </View>
      </View>
    </TouchableWithoutFeedback>


    <ShareDialogBox  hideShareDialog={hideShareDialog} shareBoxvisible={shareBoxvisible} setShowShowShareDialog={setShowShowShareDialog}/>
    <View style={styles.description}>
      

        <View style={styles.details}>

        <FullImageModal showModal={fullImageModal} 
          closeModal={setFullImageModal}
          image={item.image}
          comments={item.comments}
          likes={item.likes} 
        />

        {item.image && 
        <TouchableWithoutFeedback onPress={() => setFullImageModal(true)}>
          <Image source={{uri: item.image }} style={{ width: "100%", height: 180}} />
        </TouchableWithoutFeedback> 
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
          <TouchableHighlight style={styles.iconContainer}>
            {
              pressLike ? <ActionButtons name="heart" backgroundColor="pink" color={GlobalStyles.themeColor.color} 
              onPressHandler={UnLikePost}
                />
                :
                <ActionButtons name="heart-o" backgroundColor='#ddd' onPressHandler={likePost} color='#616C6F' 
                  /> 
            }
          </TouchableHighlight>

        <TouchableHighlight style={[styles.iconContainer, { marginHorizontal: 8 }]} >
            <ActionButtons name="comment-o" backgroundColor='#ddd' onPressHandler={() => navigation.navigate('AddComment', {item: item, refreshPost: reloadPosts  })} color='#616C6F' 
          />
        </TouchableHighlight>

        <TouchableHighlight onPress={() => setShowShowShareDialog()} style={styles.iconContainer}>
            <ActionButtons name="share" comment backgroundColor='#ddd' color='#616C6F' />
        </TouchableHighlight>
      </View>

    </View>
  </View>
  )
}


const styles = StyleSheet.create({

  container: {
  borderTopWidth: 0.5,
  borderTopColor: '#ddd',
   backgroundColor: "white",
   elevation: 1
  },
  cardContainer: {paddingLeft: 20, paddingRight: 12, paddingTop: 20},
  comment: {
    flex: 1,
    marginHorizontal: 8,   
    color: '#ddd', 
    backgroundColor: '#ddd', 
    borderRadius: 9 
  },
  reactionContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    justifyContent: 'space-between',
},
actionContainer: {
  position: 'absolute',
  right: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
},
threeDots: {
  paddingHorizontal: 4,
},  
iconContainer: {
  flex: 1,
},
  bookmarkIcon: {
    backgroundColor: '#1287A5',
    padding: 5,
    borderRadius: 5,
    margin: 5
  },
  commentsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20, 
    paddingVertical: 5
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
    alignItems: "flex-start"
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
    paddingBottom: 22
  },
  details: {
    flex: 3,
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

const mapStateToProps = state => {
  return{
    authToken: state.auth.token,
    cartData: state.cart.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addToCartFunc: (token, id) => dispatch(fetchaddItemToCart(token, id)),
    removeCartItemFunc: (token, id) => dispatch(fetchCartItemRemoveNoRefresh(token, id)),
    cartItemDetailsFunc: (token, id) => dispatch(fetchCartItemDetails(token, id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);