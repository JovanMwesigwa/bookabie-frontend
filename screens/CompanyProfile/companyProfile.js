import React, {  useEffect, useState } from 'react'
import { View, StyleSheet, RefreshControl, Image, ImageBackground, TouchableOpacity, StatusBar, FlatList } from 'react-native'
import axios from 'axios';
import { connect } from 'react-redux'
import {   Entypo, AntDesign,  SimpleLineIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Caption,  } from 'react-native-paper';
import {  Tab, Tabs} from 'native-base';
import {  Text, Paragraph } from 'react-native-paper';



import {ApploadingComponent, AppButton, OtherHeaderComponent, ProductCard, TopProduct, ErrorView, LoadMoreComponent } from '../../components/';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { GlobalStyles } from '../../styles/GlobalStyles'
import useFetchData from '../../hooks/useFetchData'
import { fetchOtherUserProfile } from '../../redux/otherUserProfile/otherUserprofilerRedux';





const CompanyProfile = ({authToken, route, fetchUserProfile, userProfile }) => {

  const { ID, } = route.params;

  const [ follows, setFollows ] = useState(null);
  
  const token = authToken;

  const postsData = useFetchData(token, `api/profileposts/${userProfile.profile.user}`)

  const topPosts = useFetchData(token, `api/topproducts/${ID}/`)

  const followingData = useFetchData(token, `api/followers/${ID}/`)

  useEffect(() => {
    fetchUserProfile(token, ID)
     followingData.request()
     topPosts.request()
     fetchFollowData()
  },[])

  const fetchFollowData = async () => {
    await axios.get(`${APIROOTURL}/api/follows/${ID}/`,{
      headers: {
        'Authorization': `Token ${token}`,
      }
    }).then(res => {
      setFollows(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const fetchFollowUser = async () => {
    setFollows(true)
    await axios.get(`${APIROOTURL}/api/follow/${ID}/`,{
      headers: {
        'Authorization': `Token ${token}`,
      }
    }).then(res => {
      fastRefresh()
    })
    .catch(err => {
      console.log(err)
    })
  }

  const fetchUnFollowUser = async () => {
    setFollows(false)
    await axios.get(`${APIROOTURL}/api/unfollow/${ID}/`,{
      headers: {
        'Authorization': `Token ${token}`,
      }
    }).then(res => {
      fastRefresh()
    })
    .catch(err => {
      console.log(err)
    })
  }


  const fastRefresh = () => {
    fetchUserProfile(token, ID)
    followingData.request()
    topPosts.request()
    fetchFollowData()
  }


    if(userProfile.loading) return <ApploadingComponent />

    if(userProfile.errors) return <ErrorView onPress={fastRefresh} error={userProfile.errors} />

  const renderFooter = () => <LoadMoreComponent title="my" onPress={() => postsData.request()} />

const { container } = styles
const refreshControl = <RefreshControl
        refreshing={userProfile.loading}
        onRefresh={fastRefresh}
      />
 return(
    
  <>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <OtherHeaderComponent name={userProfile.profile.user} />
    
    <FlatList
    
        ListHeaderComponent={
          <>
            <View style={container}>                 
                  <ImageBackground style={styles.coverImageHeader} source={{ uri: userProfile.profile.cover_photo }}>
                    <View style={styles.child}>
                    </View>
                  </ImageBackground>

                  <View style={styles.footer}>

                    <View style={{ flex: 1, marginBottom: 6, paddingHorizontal: 20 }} >

                      <Image source={{ uri: userProfile.profile.profile_pic }} style={styles.profilephoto} />
                    
                    <View style={{ flexDirection: 'row', marginTop: 15,  justifyContent: 'space-between' }}>
                        <View >
                          <View style={{ flexDirection: 'row'}}>
                            <Text style={{...styles.mainText, fontSize: 15}}>{userProfile.profile.user}</Text>
                            {
                              userProfile.profile.verified ? <AntDesign name="star" size={10} color="black" /> : null
                            }
                            
                          </View>
                          <Text style={styles.secondaryText}>{userProfile.profile.profile_type.name}</Text>
                        </View>

                        <View style={styles.actionBtns}>
                            {
                              follows ? 
                              
                            <TouchableOpacity style={styles.followingBtnContainer}
                              onPress={fetchUnFollowUser}
                             >
                              <SimpleLineIcons name="user-following" size={18} color="white"style={{ fontWeight: 'bold' }} />
                              <Text style={{ fontWeight: '600', fontSize: 14, color: 'white',paddingHorizontal: 8  }}>Following</Text>
                            </TouchableOpacity> :

                            <TouchableOpacity style={styles.followBtnContainer}
                              onPress={fetchFollowUser}
                              >
                              <SimpleLineIcons name="user-follow" size={18} color={GlobalStyles.themeColor.color} style={{ fontWeight: 'bold' }} />
                                <Text style={{ fontWeight: '600', fontSize: 14, color: GlobalStyles.themeColor.color,paddingHorizontal: 8 }}>Follow</Text>
                            </TouchableOpacity>
                            }
                            
                            <TouchableOpacity style={styles.arrowDownContainer}>
                              <AntDesign name="caretright" size={18} color={GlobalStyles.themeColor.color} style={{ fontWeight: 'bold', textAlign: 'center'}} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    </View>

                    <View style={{ flex: 1, paddingHorizontal: 15 }}>
                      {
                        userProfile.profile.working_days !== null &&
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                                <Entypo name="calendar" size={18} color="#FF5A09" /> 
                            </View>
                            <View style={{ paddingHorizontal: 5}}>
                              <Text style={{...styles.mainText, fontWeight: '600'}}>{userProfile.profile.working_days}</Text> 
                              <Text  style={{...styles.secondaryText, fontSize: 13}}>{userProfile.profile.working_hours}</Text> 
                            </View>
                          </View>
                      }
                        
                          {
                            userProfile.profile.location !== null &&
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                              <Entypo name="location-pin" size={18} color="#FF5A09" />
                            </View>
                            
                            <View style={{   paddingHorizontal: 5 }}>
                              <Text style={{...styles.mainText,fontWeight: '600'}}>{userProfile.profile.location}</Text> 
                            </View>
                          </View> 
                          }

                          {
                            userProfile.profile.contact !== null &&
                          
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                              <Entypo name="globe" size={18} color="#FF5A09" />
                            </View >
                              <Text style={{...styles.mainText,fontWeight: '600', color: '#777',  paddingHorizontal: 5}}>{userProfile.profile.contact}</Text> 
                          </View> 
                          }
                      
                        <View style={styles.section}>
                          <MaterialCommunityIcons name="account-group" size={18} color="#FF5A09" />
                          <Paragraph style={[styles.paragraph,styles.caption]}>{followingData.data}</Paragraph>
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


                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    
                    {
                      topPosts.data.map(topPost => (
                        <View key={topPost.id} >
                            <TopProduct 
                              item={topPost}
                              image={topPost.image} 
                              onReload={() => topPosts.request()}
                              token={token}
                            />
                        </View>
                      ))
                    }
                            
                    <View style={{ marginVertical: 5 }}>
                      <AppButton small text="View all" onPress={() => console.log("")} />
                    </View>
                    
                  </View>

                  </Tab>

                  <Tab heading="About Us" 
                    tabStyle={{backgroundColor: 'white'}} 
                    textStyle={{color: '#777'}} 

                    activeTabStyle={{backgroundColor: 'white'}} 
                    activeTextStyle={{color: GlobalStyles.themeColor.color,  fontWeight: '700'}}
                  >
                      <View style={{ marginVertical: 8, paddingHorizontal: 20 }}>
                        <View >
                            <Text style={{...styles.mainText, fontSize: 14.5, letterSpacing: 0.5, lineHeight: 18,  fontWeight: 'normal'}}>{userProfile.profile.description}</Text>
                        </View>
                    </View>
                  </Tab>

                  <Tab heading="Gallery"
                    tabStyle={{backgroundColor: 'white'}} 
                    textStyle={{color: '#777'}} 
                    activeTabStyle={{backgroundColor: 'white'}} 
                    activeTextStyle={{color: GlobalStyles.themeColor.color, fontWeight: '700'}}
                  >

                    <View style={{ padding: 2, flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ backgroundColor: 'grey', width: 113, height: 100, margin: 2 }} />
                        <View style={{ backgroundColor: 'brown', width: 113, height: 100, margin: 2 }} />
                        <View style={{ backgroundColor: 'black', width: 113, height: 100, margin: 2 }} />
                        <View style={{ backgroundColor: 'black', width: 113, height: 100, margin: 2 }} />
                        <View style={{ backgroundColor: 'black', width: 113, height: 100, margin: 2 }} />
                        <View style={{ backgroundColor: 'black', width: 113, height: 100, margin: 2 }} />

                    </View>

                  </Tab>

                </Tabs>

                </View>      
              </View>
          </>
        }
      data={postsData.data.results}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      refreshControl={refreshControl}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          reloadPosts={() => postsData.request()}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
</>
 )
}

const styles = StyleSheet.create({
  actionBtns: { 
    flexDirection: 'row', 
    position: 'absolute',
    bottom: 30, 
    right: 1
  },
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
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  flexDirection: 'row', 
  borderWidth: 1,
  borderColor: GlobalStyles.themeColor.color,
  paddingHorizontal: 15,
  paddingVertical: 6, 
  borderRadius: 15
},
followingBtnContainer:{
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  flexDirection: 'row',
  backgroundColor: GlobalStyles.themeColor.color, 
  paddingHorizontal: 15,
  paddingVertical: 8,
  borderRadius: 15
},
footerStyles: { 
  alignItems: 'center',  
  elevation: 5, 
  flex: 1, 
  paddingHorizontal: 15, 
  marginVertical: 15,
  justifyContent: 'center', 
},
arrowDownContainer: {
  alignItems: 'center',
  backgroundColor: "#fff",
  borderWidth: 1,
  borderColor: GlobalStyles.themeColor.color, 
  justifyContent: 'center',
  width: 35,
  marginLeft: 5,
  borderRadius: 35/2,
  padding: 8
  
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
    authToken: state.auth.token,
    userProfile: state.otherUserProfile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfile: (token, ID) => dispatch(fetchOtherUserProfile(token, ID))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);