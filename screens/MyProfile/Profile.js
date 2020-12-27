import React, { useContext, useReducer, useEffect, useState } from 'react'
import axios from 'axios';
import { View,   Dimensions, Image, ImageBackground, TouchableOpacity, ActivityIndicator, StatusBar, FlatList, RefreshControl } from 'react-native'
import {  Entypo, AntDesign} from '@expo/vector-icons';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';
import { AuthContext } from '../../context/authentication/Context'
import ProfileHeader from '../../components/ProfileHeader';
import ProductCard from '../../components/productCard';
import * as Animatable from 'react-native-animatable';
import { Caption, Paragraph, Headline } from 'react-native-paper';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapModalComponent from '../../components/MapComponent';
import SecondaryHeader from '../../components/SecondaryHeader';
import { Surface, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
// loading
// profile
// errors

const initialState = {
  loading: true,
  profile: {},
  error: "",
}

const reducer = (state, action) => {
  switch(action.type){
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        profile: action.payload,
        error: ""
      }
    case 'FETCH_FAILURE':
      return{
        loading: false,
        profile: {},
        error: "OOPs!, Something went wrong."
      }
    default:
      return state
  }
}

const noConnectionImage = require('../../assets/images/noint.png');

const mapImage = require('../../assets/images/m.jpg');

const Profile = ({  navigation }) => {

  const [ state, dispatch ] = useReducer(reducer, initialState); 

  const [ followers, setFollowers ] = useState([])

  const [ modalShown, setModalShown ] = useState(false);

  const [ userPosts, setUserPosts ] = useState([])

  const image1 = require('../../assets/images/nikisPizza.jpg');
  const image2 = require('../../assets/images/pizzaHut.jpg');

  const { authState } = useContext(AuthContext);

  const token = authState.token

  const showMap = () => {
    setModalShown(true);
  }

  const closeMap = () => {
    setModalShown(false)
  }

  
  const fetchUser = async(token_) => {
    try{
      const userResponse = await axios.get(`${APIROOTURL}/api/userprofile/user/detail/`,{
        headers: {
            'Authorization': `Token ${token_}`
          }
      })
      dispatch({type: 'FETCH_SUCCESS', payload: userResponse.data})
    }catch(error){
      dispatch({type: 'FETCH_FAILURE' })
    }
  }

  const fetchProducts = async() => {
    try{
      const productsResponse = await axios.get(`${APIROOTURL}/api/profileposts/${profile.user}`,{
        headers: {
            'Authorization': `Token ${token}`
          }
      }) 
      setUserPosts(productsResponse.data)  
    }catch(error){
      console.log(error);
    }
    
  }

  const refreshFetchedUser = async() => {
    try{
      const userResponse = await axios.get(`${APIROOTURL}/api/userprofile/user/detail/`,{
        headers: {
            'Authorization': `Token ${token}`
          }
      })
      dispatch({type: 'FETCH_SUCCESS', payload: userResponse.data})
    }catch(error){
      dispatch({type: 'FETCH_FAILURE' })
    }
  }

  const refreshFetchProducts = async() => {
    try{
      const productsResponse = await axios.get(`${APIROOTURL}/api/profileposts/${profile.user}`,{
        headers: {
            'Authorization': `Token ${token}`
          }
      }) 
      setUserPosts(productsResponse.data)  
    }catch(error){
      console.log(error);
    }
    
  }

  const getFollowers = async() => {
    try{
      const followersData = await axios.get(`${APIROOTURL}/api/followers/`,{
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      setFollowers(followersData.data.results);
      // console.log(followersData.data.results);
    }catch(error){
      console.log(error);
    }
  }

  const fastRefresh = () => {
    refreshFetchedUser()
    refreshFetchProducts()
  }


  useEffect(() => {
    const useffectFetch = async() => {
      const token_ = await authState.token
      fetchUser(token_);
    }
    useffectFetch();
    getFollowers();
  },[])


  if (state.error) {
    return (
      <>
        <SecondaryHeader />
        {/* <ProfileHeader profileName={profile.user} /> */}
        <View style={{ flex: 1, margin: 25 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={noConnectionImage} style={{ width: 30, height: 30}} />
            <Text style={{ textAlign: 'center', color: '#292E2E', letterSpacing:1, paddingHorizontal: 5 }}>{state.error}</Text> 
          </View> 
                
            <TouchableOpacity style={styles.refreshBtn}
                onPress={fastRefresh}
                >
                  <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15}}>Refresh</Text>
                  {/* <ActivityIndicator size={10} color='white' style={{ paddingHorizontal: 8 }} /> */}
            </TouchableOpacity>
        </View>
      </>
    )
  }


  const renderFooter = () => {
    return(
      <Animatable.View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15, alignItems: 'center',  marginVertical: 15 }}
        animation='fadeInUp'
        delay={900}
        duration = {200}  
      >
        <TouchableOpacity style={styles.loadMoreBtn}
          onPress={fetchProducts}
        >
          <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15 }}>View all my posts</Text>
          {/* <ActivityIndicator size={10} color='white' style={{ paddingHorizontal: 8 }} /> */}
        </TouchableOpacity>
      </Animatable.View>
    )
  }


  // fetchProducts()

const profile = state.profile;
const { container } = styles

const refreshControl = <RefreshControl
  refreshing={state.loading}
  onRefresh={fastRefresh}
/>
 return(

  <>
      <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <ProfileHeader profileName={profile.user} />
      {state.loading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <ActivityIndicator size='small' collapsable color='#B83227' />
        </View>
    :
    <FlatList
    
    
    ListHeaderComponent={
        <>
          <View style={styles.container}>

         
          <ImageBackground style={styles.coverImageHeader} source={{uri: profile.cover_photo}}>
            <View style={styles.child}>

            </View>
          </ImageBackground>

          <View style={styles.footer}>

            <View style={{ flex: 1, marginBottom: 3, paddingHorizontal: 20 }} >

              <Image source={{ uri: profile.profile_pic }} style={styles.profilephoto} />
            
            <View style={{ flexDirection: 'row', marginTop: 15,  justifyContent: 'space-between' }}>
                <View >
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={{...styles.mainText, fontSize: 15}}>{profile.user}</Text>
                    <AntDesign name="star" size={10} color="black" />
                  </View>
                  <Text style={styles.secondaryText}>{profile.profile_type.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', position: 'absolute',bottom: 30, right: 1}}>
                    <TouchableOpacity style={styles.cartBtnContainer} onPress={() => {
                      navigation.navigate('Edit Profile', {Profile: state.profile, RefreshFetchedUser: refreshFetchedUser})
                    }}>
                      <Text style={{ color: '#1287A5', fontWeight: '600' }}>EDIT</Text>
                    </TouchableOpacity>
                </View>

            </View>

            </View>

            <View style={{ flex: 1, paddingHorizontal: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                    <Entypo name="calendar" size={18} color="#FF5A09" /> 
                </View>
                <View style={{ paddingHorizontal: 5}}>
                  <Paragraph style={{...styles.mainText, fontWeight: '600'}}>{profile.working_days}</Paragraph>
                  <Caption  style={{...styles.secondaryText, fontSize: 13}}>{profile.working_hours}</Caption> 
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                  <Entypo name="location-pin" size={18} color="#FF5A09" />
                </View>
                <View style={{   paddingHorizontal: 5 }}>
                  <Paragraph style={{...styles.mainText,fontWeight: '600'}}>{profile.location}</Paragraph> 
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                  <Entypo name="globe" size={18} color="#FF5A09" />
                </View >
                  <Caption style={{...styles.mainText,fontWeight: '600', color: '#777',  paddingHorizontal: 5}}>{profile.contact}</Caption> 
              </View>

              {/* <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                <MaterialCommunityIcons name="account-circle" size={18} color="#FF5A09" />
                </View >
                  <Caption style={{...styles.mainText,fontWeight: '600', color: '#777',  paddingHorizontal: 5}}>{profile.following.length} following</Caption> 
              </View> */}
              <View style={styles.section}>
                  <MaterialCommunityIcons name="account-group" size={18} color="#FF5A09" />
                  <Paragraph style={[styles.paragraph,styles.caption]}>{followers.length}</Paragraph>
                  <Caption style={{...styles.caption, paddingLeft: 2}}>followers</Caption>
                  <Paragraph style={[styles.paragraph,styles.caption]}>{profile.following.length}</Paragraph>
                  <Caption style={{...styles.caption, paddingLeft: 2}}>following</Caption>
              </View>
            </View>

            <View style={{ paddingTop: 8 }}>

            </View>
            
          
            {/* <Container> */}
              <Tabs 
                tabBarUnderlineStyle={{borderBottomWidth:4, borderBottomColor: '#B83227'}}
              >

                <Tab heading="Top Products"
                 tabStyle={{backgroundColor: 'white'}} 
                 textStyle={{color: '#777'}} 
                 activeTabStyle={{backgroundColor: 'white'}} 
                 activeTextStyle={{color: '#B83227', fontWeight: '700'}}
                >
                    <Surface style={ styles.descriptionContainer }>
                      <Image source={image1} style={{ flex: 1, width: null, height:null, borderRadius: 12, resizeMode: "cover" }} />
                        <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
                            <Text style={styles.mainText}>Banana Barito </Text>
                            <Text style={styles.secondaryText}>Lorem Ipsum si </Text>
                            <Text style={{ color: '#218F76', fontWeight: "700" }}>$35.00</Text>
                        </View>  
                    </Surface>

                    <Surface style={{ ...styles.descriptionContainer, marginTop: 8, marginBottom: 8 }}>                       
                      <Image source={image2} style={{ flex: 1, width: null, height:null, borderRadius: 12, resizeMode: "cover" }} />
                        <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
                          <Text style={styles.mainText}>Super Pizza Granola </Text>
                          <Text style={styles.secondaryText}>Lorem Ipsum si </Text>
                          <Text style={{ color: '#218F76', fontWeight: "700" }}>$35.00</Text>
                        </View>
                    </Surface>

                  </Tab>

                  <Tab heading="About Us" 
                    tabStyle={{backgroundColor: 'white'}} 
                    textStyle={{color: '#777'}} 
                    activeTabStyle={{backgroundColor: 'white'}} 
                    activeTextStyle={{color: '#B83227', fontWeight: '700'}}
                  >
                    
                      <View style={{ flex: 1, marginVertical: 8, paddingHorizontal: 20 }}>
                        <View style={{ flex: 1, }}>
                            <Paragraph muted style={{...styles.mainText,  letterSpacing: 0.5, lineHeight: 18, fontSize: 14.5, fontWeight: '600'}}>{profile.description}</Paragraph>
                        </View>
                    </View>
                  </Tab>

                  <Tab heading="Location"
                    tabStyle={{backgroundColor: 'white'}} 
                    textStyle={{color: '#777'}} 
                    activeTabStyle={{backgroundColor: 'white'}} 
                    activeTextStyle={{color: '#B83227', fontWeight: '700'}}
                  >
                  <ImageBackground source={mapImage} style={styles.imageBg}>
                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15, alignItems: 'center',  marginVertical: 15, }}>
                      <TouchableOpacity style={styles.loadMoreBtn}
                      onPress={showMap}
                      >
                        <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15 }}>View map</Text>
                          
                      </TouchableOpacity>
                      <MapModalComponent visible={modalShown} close={closeMap} />
                    </View>
                  </ImageBackground>
                  
                  </Tab>

                </Tabs>
      
          </View>
      </View>
   </>
    }
      data={userPosts.results}
      // onEndReached={fetchProducts}
      refreshControl={refreshControl}
      ListFooterComponent={renderFooter}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
}
</>
 )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  cardText: {
    padding: 24
  },
  description: {
    flex: 1
  },
  imageBg: { 
    flex: 1, 
    position: 'relative',
    backgroundColor:'rgba(0,0,0,0.5)',
    opacity: 0.8,
    zIndex: 1,  
  },
  refreshBtn: {
    padding: 8, 
    backgroundColor: '#B83227', 
    borderRadius: 15, 
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginHorizontal: 95
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
mapStyle: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
},
  footer: { 
    flex: 1, 
    // width: '100%', 
    backgroundColor: 'white', 
    elevation: 1, 
    paddingBottom: 10, 
    paddingVertical: 20,
},
section: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 4,
  paddingVertical: 8
},
paragraph: {
  fontWeight: 'bold',
  marginRight: 3
},
drawerSection: {
  marginTop: 15
},
caption: {
  fontSize: 14,
  lineHeight: 14, 
  paddingLeft: 8
},
loadMoreBtn: {
  flexDirection: 'row', 
  padding: 8, 
  backgroundColor: '#B83227', 
  borderRadius: 15, 
  justifyContent: 'center',
  alignItems: 'center' 
},
  topText: {
    paddingRight: 12,
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 8,
    fontSize: 15, 
    color: '#2C3335', 
    fontWeight: '500'
  },
  msgBookmark:{
    color: "#fff",
    padding: 8,
    backgroundColor: "#75DA8B",
    borderRadius: 56 / 2,
  },
  bookmark: {
    color: "#fff",
    padding: 8,
    backgroundColor: "#B83227",
    borderRadius: 56 / 2,
  },
  mainText: {
    fontSize: 14, 
    color: '#2C3335', 
    fontWeight: '700'
  },
  secondaryText: {
    color: '#777E8B'
  },
  headerFont: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  coverImageHeader: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    height: 150,
    
  },
  cartBtnContainer: {
    padding: 5,
    paddingLeft: 0,
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: 'space-between',
    margin: 10
  },
  profilephoto: {
    position: 'absolute',
    // top: 79,
    // marginBottom: 12,
    bottom: 45,
    left: 20,
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 35
  },
  headerTextContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: 'center',
    position: "absolute",
    bottom: 1,
    // paddingTop:24
    // left: 12
  },
  headerText: {
    paddingHorizontal: 15,
    flexDirection: "row",
    // paddingBottom: 18
  },
  descriptionContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    height: 100,
    // flex: 1,
    // margin: 4,
    // marginLeft: 0,
    // marginTop: 8,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,

  },
  locationContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
    marginRight: 0,
    padding: 12,
    margin: 4,
    borderRadius: 10,
    elevation: 1
  },
  myProductsContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: 'white',
    // borderRadius: 14,
    // marginTop: 8,
    // marginBottom: 10,
    marginVertical: 8,
    elevation: 1,
    width: '100%'
  },

})
export default Profile;