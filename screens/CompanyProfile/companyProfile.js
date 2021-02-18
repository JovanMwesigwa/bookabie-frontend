import React, {  useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { View,   RefreshControl, Image, ImageBackground, TouchableOpacity, ActivityIndicator, StatusBar, FlatList } from 'react-native'
import {   Entypo, AntDesign,  SimpleLineIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { Caption,  } from 'react-native-paper';
import {  Tab, Tabs} from 'native-base';
import { Surface, Text, Paragraph } from 'react-native-paper';



import OtherHeaderComponent from '../../components/OtherHeaderComponent';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { GlobalStyles } from '../../styles/GlobalStyles'
import ProductCard from '../../components/productCard';
import { StyleSheet } from 'react-native';
import useFetchData from '../../hooks/useFetchData'
import useAuthUser from '../../hooks/useAuthUser'



const image1 = require('../../assets/images/nikisPizza.jpg');
const image2 = require('../../assets/images/pizzaHut.jpg');



const CompanyProfile = ({ route, authToken }) => {

  const { ID, } = route.params;

  const [ followedBtn, setFollowedBtn ] = useState(false);

  const [ followID, setFollowID ] = useState(null);
  
  const token = authToken;
  
  const authUser = useAuthUser(token)

  const { data: profileData, loading, errors, request } = useFetchData(token, `api/profile/${ID}/detail/`)

  const postsData = useFetchData(token, `api/profileposts/${profileData.user}`)

  const followingData = useFetchData(token, `api/isfollowing/?search=${profileData.user}`)

  useEffect(() => {
      request()
     followingData.request()
  },[])

  const data = {
    user_from: `Profile for ${authUser.user}`,
    user_to: profileData.id
  };

  const followUser = () => {
    axios.post(`${APIROOTURL}/api/follow_user/`, data,{
      headers: {
        'Authorization': `Token ${token}`,
        data: data
      }
    })
    .then(res => {
      setFollowID(res.data.id)
    })
    .catch(err => {
      console.log(err);
    })
    fastRefresh()
    setFollowedBtn(true)
  }


  const unFollowUser = () => {
    axios.delete(`${APIROOTURL}/api/following/${followID}/delete/`,{
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
    .then(res => {

    })
    .catch(err => {
      console.log(err);
    })
    fastRefresh()
    setFollowedBtn(false);
  }

  const fastRefresh = () => {
    request()
    postsData.request()
    fetchUser()
  }


  if (errors) {
    return (
      <>
        <>
        <SecondaryHeader />
        <View style={{ flex: 1, margin: 25 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={noConnectionImage} style={{ width: 30, height: 30}} />
            <Text style={{ textAlign: 'center', color: '#292E2E', letterSpacing:1, paddingHorizontal: 5 }}>{errors}</Text> 
          </View> 
                
            <TouchableOpacity style={styles.refreshBtn}
                onPress={fastRefresh}
                >
                  <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15}}>Refresh</Text>
            </TouchableOpacity>
        </View>
      </>
      </>
    )
  }

  const renderFooter = () => {
    return(
      <Animatable.View style={{ flex: 1, justifyContent: 'center', elevation: 5, paddingHorizontal: 15, alignItems: 'center',  marginVertical: 15 }}
        animation='fadeInUp'
        delay={900}
        duration = {200}  
      >
        <TouchableOpacity style={styles.loadMoreBtn}
          onPress={() => postsData.request()}
        >
          <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15 }}>View all {profileData.user}'s posts</Text>
        </TouchableOpacity>
      </Animatable.View>
    )
  }

const { container } = styles
const refreshControl = <RefreshControl
        refreshing={loading}
        onRefresh={fastRefresh}
      />
 return(
    
  <>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <OtherHeaderComponent name={profileData.user} />
      {loading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <ActivityIndicator size='small' collapsable color={GlobalStyles.themeColor.color} />
        </View>
    :

    <FlatList
    
        ListHeaderComponent={
          <>
            <View style={container}>                 
                  <ImageBackground style={styles.coverImageHeader} source={{ uri: profileData.cover_photo }}>
                    <View style={styles.child}>
                    </View>
                  </ImageBackground>

                  <View style={styles.footer}>

                    <View style={{ flex: 1, marginBottom: 6, paddingHorizontal: 20 }} >

                      <Image source={{ uri: profileData.profile_pic }} style={styles.profilephoto} />
                    
                    <View style={{ flexDirection: 'row', marginTop: 15,  justifyContent: 'space-between' }}>
                        <View >
                          <View style={{ flexDirection: 'row'}}>
                            <Text style={{...styles.mainText, fontSize: 15}}>{profileData.user}</Text>
                            {
                              profileData.verified ? <AntDesign name="star" size={10} color="black" /> : null
                            }
                            
                          </View>
                          <Text style={styles.secondaryText}>{profileData.profile_type.name}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', position: 'absolute',bottom: 30, right: 1}}>
                            {
                              followedBtn ? 
                              
                            <TouchableOpacity style={styles.followingBtnContainer}
                              onPress={unFollowUser}
                             >
                              <SimpleLineIcons name="user-following" size={18} color="white"style={{ fontWeight: 'bold' }} />
                              <Text style={{ fontWeight: '600', fontSize: 14, color: 'white',paddingHorizontal: 8  }}>Following</Text>
                            </TouchableOpacity> :

                            <TouchableOpacity style={styles.followBtnContainer}
                              onPress={followUser}
                              >
                              <SimpleLineIcons name="user-follow" size={18} color={GlobalStyles.themeColor.color} style={{ fontWeight: 'bold' }} />
                                <Text style={{ fontWeight: '600', fontSize: 14, color: GlobalStyles.themeColor.color,paddingHorizontal: 8 }}>Follow</Text>
                            </TouchableOpacity>
                            }
                            
                            <TouchableOpacity style={styles.arrowDownContainer}>
                              <AntDesign name="caretdown" size={10} color={GlobalStyles.themeColor.color}style={{ fontWeight: 'bold', textAlign: 'center' }} />
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
                          <Text style={{...styles.mainText, fontWeight: '600'}}>{profileData.working_days}</Text> 
                          <Text  style={{...styles.secondaryText, fontSize: 13}}>{profileData.working_hours}</Text> 
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                          <Entypo name="location-pin" size={18} color="#FF5A09" />
                        </View>
                        <View style={{   paddingHorizontal: 5 }}>
                          <Text style={{...styles.mainText,fontWeight: '600'}}>{profileData.location}</Text> 
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                          <Entypo name="globe" size={18} color="#FF5A09" />
                        </View >
                          <Text style={{...styles.mainText,fontWeight: '600', color: '#777',  paddingHorizontal: 5}}>{profileData.contact}</Text> 
                      </View>
                      
                        <View style={styles.section}>
                          <MaterialCommunityIcons name="account-group" size={18} color="#FF5A09" />
                          <Paragraph style={[styles.paragraph,styles.caption]}>{followingData.data.count}</Paragraph>
                          <Caption style={{...styles.caption, paddingLeft: 2}}>following</Caption>
                          <Paragraph style={[styles.paragraph,styles.caption]}>{followingData.data.count}</Paragraph>
                          <Caption style={{...styles.caption, paddingLeft: 2}}>followers</Caption>
                        </View>
                    </View>


 

                <Tabs 
                    tabBarUnderlineStyle={{borderBottomWidth:4, borderBottomColor: GlobalStyles.themeColor.color}}
                    tabContainerStyle={{
                      elevation: 0,
                      shadowOpacity: 0,
                      borderBottomWidth: 1,
                      borderBottomColor: "#ddd"
                    }}
                  >

                <Tab heading="Top Products"
                 tabStyle={{backgroundColor: 'white'}} 
                 textStyle={{color: '#777',}} 
                 activeTabStyle={{backgroundColor: 'white'}} 
                 activeTextStyle={{color: GlobalStyles.themeColor.color,  fontWeight: '700'}}
                >
                    <Surface style={ styles.descriptionContainer }>
                        
                        <Image source={image1} style={{ flex: 1, width: null, height:null, borderRadius: 12, resizeMode: "cover" }} />
                        <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
                          <Text style={styles.mainText}>Banana Barito </Text>
                          <Text style={styles.secondaryText}>Lorem Ipsum si </Text>
                          <Text style={{fontSize: 14, color: '#218F76', fontWeight: "700" }}>$35.00</Text>

                          <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity style={styles.cartBtnContainer}>
                                <Text style={{ backgroundColor:'#75DA8B', paddingHorizontal: 10, fontSize: 9, fontWeight: 'bold', color: 'white', padding: 5, borderRadius: 12, textAlign: 'center' }}>Contact</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cartBtnContainer} >
                                <Text style={{  backgroundColor: GlobalStyles.themeColor.color, paddingHorizontal: 10,fontSize: 9, color: 'white', padding: 5, borderRadius: 12, textAlign: 'center', marginHorizontal: 12 }}>Message</Text>
                              </TouchableOpacity>
                          </View>
                          
                        </View>
                        
                    </Surface>

                    <Surface style={{ ...styles.descriptionContainer, marginVertical: 8 }}>
                        
                        <Image source={image2} style={{ flex: 1, width: null, height:null, borderRadius: 12, resizeMode: "cover" }} />
                        <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
                          <Text style={styles.mainText}>Super Pizza Granola </Text>
                          <Text style={styles.secondaryText}>Lorem Ipsum si </Text>
                          <Text style={{ fontSize: 14, color: '#218F76', fontWeight: "700" }}>$35.00</Text>
                          

                          <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.cartBtnContainer}>
                                <Text style={{ backgroundColor:'#75DA8B', paddingHorizontal: 10, fontSize: 9, fontWeight: 'bold', color: 'white', padding: 5, borderRadius: 12, textAlign: 'center' }}>Contact</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cartBtnContainer} >
                                <Text style={{  backgroundColor: GlobalStyles.themeColor.color, paddingHorizontal: 10,fontSize: 9, color: 'white', padding: 5, borderRadius: 12, textAlign: 'center', marginHorizontal: 12 }}>Message</Text>
                              </TouchableOpacity>
                          </View>

                        </View>


                    </Surface>

                  </Tab>

                  <Tab heading="About Us" 
                    tabStyle={{backgroundColor: 'white'}} 
                    textStyle={{color: '#777'}} 

                    activeTabStyle={{backgroundColor: 'white'}} 
                    activeTextStyle={{color: GlobalStyles.themeColor.color,  fontWeight: '700'}}
                  >
                      <View style={{ marginVertical: 8, paddingHorizontal: 20 }}>
                        <View >
                            <Text style={{...styles.mainText, fontSize: 14.5, letterSpacing: 0.5, lineHeight: 18,  fontWeight: 'normal'}}>{profileData.description}</Text>
                        </View>
                    </View>
                  </Tab>

                  <Tab heading="Location"
                    tabStyle={{backgroundColor: 'white'}} 
                    textStyle={{color: '#777'}} 
                    activeTabStyle={{backgroundColor: 'white'}} 
                    activeTextStyle={{color: GlobalStyles.themeColor.color, fontWeight: '700'}}
                  >
                    <View>
                       
                      </View>
                  </Tab>

                </Tabs>
                </View>      
              </View>
          </>
        }
      data={postsData.data.results}
      // onEndReached={fetchProducts}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      refreshControl={refreshControl}
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
  footer: { 
    flex: 1, 
    backgroundColor: 'white', 
    elevation: 1, 
    paddingBottom: 10, 
    paddingVertical: 20,
},
paragraph: {
  fontWeight: 'bold',
  marginRight: 3
},
followBtnContainer: {
  flex: 1,
  flexDirection: 'row', 
  borderWidth: 1,
  borderColor: GlobalStyles.themeColor.color,
  paddingHorizontal: 12,
  paddingVertical: 5, 
  borderRadius: 5
},
followingBtnContainer:{
  flex: 1,
  flexDirection: 'row',
  backgroundColor: GlobalStyles.themeColor.color, 
  paddingHorizontal: 12,
  paddingVertical: 5,
  borderRadius: 8
},
arrowDownContainer: {
  borderWidth: 1,
  borderColor: GlobalStyles.themeColor.color,
  marginLeft: 5,
  paddingHorizontal: 8,
  paddingVertical: 8,
  borderRadius: 5
},
caption: {
  fontSize: 14,
  lineHeight: 14, 
  paddingLeft: 8
},
section: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 4,
  paddingVertical: 8
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
loadMoreBtn: {
  flexDirection: 'row', 
  padding: 8, 
  backgroundColor: GlobalStyles.themeColor.color, 
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
    fontWeight: '500',
    lineHeight: 18, 
    letterSpacing: 0.3,
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
    backgroundColor: GlobalStyles.themeColor.color,
    borderRadius: 56 / 2,
  },
  mainText: {
    fontSize: 14, 
    color: '#2C3335', 
    fontWeight: '700',
    // lineHeight: 18, 
    // letterSpacing: 0.3, 
  },
  secondaryText: {
    color: '#777E8B',
    fontSize: 14
  },
  headerFont: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18, 
    letterSpacing: 0.3,
  },
  coverImageHeader: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    height: 150,
    backgroundColor: 'grey'
    
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
    bottom: 45,
    left: 20,
    width: 65,
    height: 65,
    backgroundColor: 'brown',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 35
  },
  headerTextContainer: {
    position: "absolute",
    bottom: 1,
  },
  headerText: {
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  descriptionContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    height: 100,
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd"
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
    marginVertical: 8,
    elevation: 1,
    width: '100%'
  },

})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps, null)(CompanyProfile);