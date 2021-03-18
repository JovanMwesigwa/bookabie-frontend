import React, { useState, useContext} from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, TouchableWithoutFeedback, TouchableHighlight   } from 'react-native'
import {  AntDesign, Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import moment from 'moment';
import { connect } from 'react-redux'




import ActionButtons from './ActionButtons';
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import { fetchaddItemToCart, fetchCartItemRemoveNoRefresh } from '../redux/cart/CartRedux';
import { GlobalStyles } from '../styles/GlobalStyles'
import { UserInfoContext } from '../context/userInfoContext/UserInfoContextProvider'
import FullImageModal from './Modals/FullImageModal';
import ShareDialogBox from './ShareDialogBox/ShareDialogBox';
import useActionButton from '../hooks/useButtonAction'
import useCheck from '../hooks/useCheck'






const ProductCard = ({authToken, authUserID, addToCartFunc, removeCartItemFunc, item,  reloadPosts}) => {
  
  const [shareBoxvisible, setShareBoxVisible] = useState(false);

  const navigation = useNavigation()
  
  const [ fullImageModal, setFullImageModal ] = useState(false);
  
  const { userInfo } = useContext(UserInfoContext);

  // console.log("ID===========>",authUserID)
  
  const token = authToken

  // This action button hook is called when a user likes a button
  // passing in the token, reloadPosts fucntions from redux and the url
  const { 
    request: likePost, 
    pressedBtn: pressLike, 
    setPressedBtn: setPressedLike 
  } = useActionButton(token, reloadPosts, `api/like/${item.id}`)
  

  // This action button hook is called on re-render and returns true if a post is liked and vice versa
  // passing in the token and the url
  const { 
    approved: likes, 
    setApproved: setLikes 
  } = useCheck(token, `api/likes/${item.id}`)


  // This action button hook is called when a user adds an item to the cart..
  // passing in the token and the url
  const { 
    approved: addedToCart, 
    setApproved: setAddedToCart 
  } = useCheck(token, `api/check_in_cart/${item.id}`)


  const setShowShowShareDialog  = () => {
    setShareBoxVisible(true);
  }

  const hideShareDialog = () => {
    setShareBoxVisible(false);
  }
    
  const UnLikePost = async() => {
    setPressedLike(false)
    setLikes(false)
    await axios.get(`${APIROOTURL}/api/unlike/${item.id}/`, {
      headers: {
        'Authorization': `Token ${token}`, 
      }
    }).then(res => {
    }).catch(err => {
      console.log(err)
    })
    reloadPosts()
    
  }

  const name = userInfo.user;

  const addToCart = () => {
    setAddedToCart(true);
  }

  const addToCartHandler = () => {
    addToCart();
    addToCartFunc(token, item.id);
  }

  const removeFromCart = () => {
    setAddedToCart(false);
    removeCartItemFunc(token, item.id)
  }

  
const { container } = styles


 return(

  <View style={container} >

    <TouchableWithoutFeedback onPress={() => navigation.navigate('Product Details', { post: item, ID: item.id, addToCartFunc: addToCartHandler, removeFromCartFunc: removeFromCart, addedToCart: addedToCart })}>
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
                  <View style={{ flexDirection: 'row'}}>
                    <MaterialIcons name="location-on" size={15} color={GlobalStyles.greenColor.color} />
                    <Text style={{ color: GlobalStyles.greenColor.color, fontSize: 12 }}>{item.category.name}</Text>
                  </View>
                      <Text style={[GlobalStyles.greyTextSmall, {fontSize: 12}]}>/ Posted about { moment(item.created).startOf('hour').fromNow()}</Text>
                </View>
            </View>
          </View>
        <View style={styles.actionContainer}>
          {
            item.price &&
            <>
              {
                addedToCart ? 
                <TouchableOpacity style={[styles.bookmarkIcon, {backgroundColor: "#B83227", flexDirection: 'row'}]} onPress={removeFromCart}>
                  <Text style={[GlobalStyles.greyTextSmall, {fontSize: 12, color: "white", fontWeight: 'bold', alignItems: 'center'}]}>ADDED TO CART</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.bookmarkIcon} onPress={addToCartHandler}>
                  <Feather name="plus" size={20} color="white" />
                </TouchableOpacity>
              }
            </>
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

        <FullImageModal 
          showModal={fullImageModal} 
          closeModal={setFullImageModal}
          image={item.image}
          comments={item.comments}
          likes={item.likes} 
        />

        {item.image && 
        <TouchableWithoutFeedback onPress={() => setFullImageModal(true)}>
          <BlurView intensity={100}>
            <Image source={{uri: item.image }} style={{ width: "100%", height: 180}} />
          </BlurView>
        </TouchableWithoutFeedback> 
        }
          <View style={styles.commentsContainer}>
          <Text style={{...GlobalStyles.greyTextSmall, fontWeight: 'bold'}}>ON SALE  • </Text>
          { item.favourites == 1 ?
            <Text style={styles.likesContainer}>{item.favourites} like  •</Text> :
            <Text style={styles.likesContainer}>{item.favourites} likes  • </Text> 
            
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
              likes || pressLike ? <ActionButtons name="heart" backgroundColor="pink" color={GlobalStyles.themeColor.color} 
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

  actionContainer: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookmarkIcon: {
    backgroundColor: '#1287A5',
    padding: 5,
    borderRadius: 5,
    margin: 5
  },
  buttonContainer: {
    padding: 18,
    backgroundColor: '#B83227',
    borderRadius: 8,
    marginVertical: 18,
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
  },
  cardContainer: {
    paddingLeft: 20, 
    paddingRight: 12, 
    paddingTop: 20
  },
  cartAlertMsg: {
    position: "absolute",
    bottom: 2,
    left: 0,
    padding: 18,
    width: "100%",
    height: 64,
  },
  commentsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20, 
    paddingVertical: 5
  },
  comment: {
    flex: 1,
    marginHorizontal: 8,   
    color: '#ddd', 
    backgroundColor: '#ddd', 
    borderRadius: 9 
  },
  container: {
  borderTopWidth: 0.5,
  borderTopColor: '#ddd',
   backgroundColor: "white",
   elevation: 1
  },
  description: {
    flex: 1,
    paddingBottom: 22
  },
  detailsContainer: {
    flexDirection: "row"
  },
  details: {
    flex: 3,
  },
  iconContainer: {
    flex: 1,
  },
  likesContainer: {
    fontSize: 12,
    color: "#777",
    letterSpacing: 0.5
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
  ratingsContainer: {
    alignItems: "flex-start"
  },
  reactionContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    justifyContent: 'space-between',
  },
  threeDots: {
    paddingHorizontal: 4,
  },  
  topBtnContainer: {
    padding: 5, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    elevation: 5
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 12,
    left: 8,
    right: 8
  },
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