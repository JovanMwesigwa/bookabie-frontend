import React, {  useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { View, RefreshControl, Image, ImageBackground, TouchableOpacity, ActivityIndicator, StatusBar, FlatList } from 'react-native'
import {   Entypo, AntDesign,  SimpleLineIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { Caption,  } from 'react-native-paper';
import {  Tab, Tabs} from 'native-base';
import {  Text, Paragraph } from 'react-native-paper';



import OtherHeaderComponent from '../../components/OtherHeaderComponent';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { GlobalStyles } from '../../styles/GlobalStyles'
import ProductCard from '../../components/productCard';
import { StyleSheet } from 'react-native';
import useFetchData from '../../hooks/useFetchData'
import TopProduct from '../../components/TopProduct';
import AppButton from '../../components/AppButton';





const CompanyProfile = ({ route, authToken }) => {

  const { ID, } = route.params;

  const [ follows, setFollows ] = useState(null);
  
  const token = authToken;

  const { data: profileData, loading, errors, request } = useFetchData(token, `api/profile/${ID}/detail/`)

  const postsData = useFetchData(token, `api/profileposts/${profileData.user}`)

  const topPosts = useFetchData(token, `api/topproducts/${ID}/`)

  const followingData = useFetchData(token, `api/followers/${ID}/`)

  useEffect(() => {
      request()
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
    request()
    followingData.request()
    topPosts.request()
    fetchFollowData()
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
                        profileData.working_days !== null &&
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                                <Entypo name="calendar" size={18} color="#FF5A09" /> 
                            </View>
                            <View style={{ paddingHorizontal: 5}}>
                              <Text style={{...styles.mainText, fontWeight: '600'}}>{profileData.working_days}</Text> 
                              <Text  style={{...styles.secondaryText, fontSize: 13}}>{profileData.working_hours}</Text> 
                            </View>
                          </View>
                      }
                        
                          {
                            profileData.location !== null &&
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                              <Entypo name="location-pin" size={18} color="#FF5A09" />
                            </View>
                            
                            <View style={{   paddingHorizontal: 5 }}>
                              <Text style={{...styles.mainText,fontWeight: '600'}}>{profileData.location}</Text> 
                            </View>
                          </View> 
                          }

                          {
                            profileData.contact !== null &&
                          
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                              <Entypo name="globe" size={18} color="#FF5A09" />
                            </View >
                              <Text style={{...styles.mainText,fontWeight: '600', color: '#777',  paddingHorizontal: 5}}>{profileData.contact}</Text> 
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
                            <Text style={{...styles.mainText, fontSize: 14.5, letterSpacing: 0.5, lineHeight: 18,  fontWeight: 'normal'}}>{profileData.description}</Text>
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
  

}
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
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps, null)(CompanyProfile);