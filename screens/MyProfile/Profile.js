import React, {  useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, Image, ImageBackground, TouchableOpacity, ActivityIndicator, StatusBar, FlatList, RefreshControl } from 'react-native'
import {  Entypo, AntDesign} from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Caption, Paragraph,  } from 'react-native-paper';
import {  Tab, Tabs } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




import {AppButton, ApploadingComponent, ErrorView, ProductCard, ProfileHeader, LoadMoreComponent, TopProduct, } from '../../components/';
import { GlobalStyles } from '../../styles/GlobalStyles'
import useFetchData from '../../hooks/useFetchData'
import { fetchUserProfile } from '../../redux/userProfile/userProfileRedux';




const userUrl = "api/userprofile/user/detail/"


const Profile = ({  navigation, authToken, userProfile, fetchUserProfile }) => {

  const token = authToken

  const postsData = useFetchData(token, `api/profileposts/${userProfile.profile.user}`)
  
  const topPosts = useFetchData(token, `api/topproducts/${userProfile.profile.id}/`)

  useEffect(() => {
    fetchUserProfile(token)
    topPosts.request()
  },[])

  
  const fastRefresh = () => {
    fetchUserProfile(token)
    topPosts.request()
  }

  const reload = () => {
    fetchUserProfile(token)
    topPosts.request()
  }


  if (userProfile.loading) return <ApploadingComponent />

  if (userProfile.error) return <ErrorView onPress={reload} error={userProfile.error} />



  const renderFooter = () => <LoadMoreComponent title="my" onPress={() => postsData.request()} />


const { container } = styles

const refreshControl = <RefreshControl
  refreshing={userProfile.loading}
  onRefresh={reload}
/>
 return(

  <>
      <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <ProfileHeader profileName={userProfile.profile.user} />
    <FlatList
  
      ListHeaderComponent={
        <>
          <View style={styles.container}>

         
          <ImageBackground style={styles.coverImageHeader} source={{uri: userProfile.profile.cover_photo}}>
            <View style={styles.child}>

            </View>
          </ImageBackground>

          <View style={styles.footer}>

            <View style={styles.accountContainer} >

              <Image source={{ uri: userProfile.profile.profile_pic }} style={styles.profilephoto} />
            
            <View style={styles.info}>
                <View style={styles.accountInfo}>
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={{...styles.mainText, fontSize: 15}}>{userProfile.profile.user}</Text>
                    <AntDesign name="star" size={10} color={GlobalStyles.darkFontColor.color} />
                  </View>
                  <Text style={styles.secondaryText}>{userProfile.profile.profile_type.name}</Text>
                </View>

                <TouchableOpacity style={styles.cartBtnContainer} onPress={() => {
                      navigation.navigate('Edit Profile', {Profile: userProfile.profile, RefreshFetchedUser: reload, token: token, fetchUserProfile: fastRefresh})
                    }}>
                  <Text style={{ color: '#1287A5', fontWeight: '600' }}>EDIT</Text>
                </TouchableOpacity>

            </View>

            </View>

            <View style={{ flex: 1, paddingHorizontal: 15}}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                    <Entypo name="calendar" size={18} color="#FF5A09" /> 
                </View>
                <View style={{ paddingHorizontal: 5}}>
                  <Paragraph style={{...styles.mainText, fontWeight: '600'}}>{userProfile.profile.working_days}</Paragraph>
                  <Caption  style={{...styles.secondaryText, fontSize: 13}}>{userProfile.profile.working_hours}</Caption> 
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                  <Entypo name="location-pin" size={18} color="#FF5A09" />
                </View>
                <View style={{   paddingHorizontal: 5 }}>
                  <Paragraph style={{...styles.mainText,fontWeight: '600'}}>{userProfile.profile.location}</Paragraph> 
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                  <Entypo name="globe" size={18} color="#FF5A09" />
                </View >
                  <Caption style={{...styles.mainText,fontWeight: '600', color: '#777',  paddingHorizontal: 5}}>{userProfile.profile.contact}</Caption> 
              </View>
              <View style={styles.section}>
                  <MaterialCommunityIcons name="account-group" size={18} color="#FF5A09" />
                  <Paragraph style={[styles.paragraph,styles.caption]}>{userProfile.profile.followers.length}</Paragraph>
                  <Caption style={{...styles.caption, paddingLeft: 2}}>followers</Caption>
              </View>
            </View>

            <View style={{ paddingTop: 8 }}>

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
                 textStyle={{color: '#777'}} 
                 activeTabStyle={{backgroundColor: 'white'}} 
                 activeTextStyle={{color: GlobalStyles.themeColor.color, fontWeight: '700'}}
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
                              self
                            />
                        </View>
                      ))
                    }

                    <View style={{ marginVertical: 5 }}>
                      <AppButton small text="Add More" onPress={() => navigation.navigate("AddTopProducts", {token: token, item: userProfile.profile, reload: reload })} />
                    </View>
                     
                    </View>
  
                  </Tab>

                  <Tab heading="About Us" 
                    tabStyle={{backgroundColor: 'white'}} 
                    textStyle={{color: '#777'}} 
                    activeTabStyle={{backgroundColor: 'white'}} 
                    activeTextStyle={{color: GlobalStyles.themeColor.color, fontWeight: '700'}}
                  >
                    
                      <View style={{ flex: 1, marginVertical: 8, paddingHorizontal: 20 }}>
                        <View style={{ flex: 1, }}>
                            <Paragraph muted style={{...styles.mainText,  letterSpacing: 0.5, lineHeight: 18, fontSize: 14.5, fontWeight: '600'}}>{userProfile.profile.description}</Paragraph>
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
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          refreshPost={fastRefresh}
          reloadPosts={() => postsData.request()}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
</>
 )
}

const styles = StyleSheet.create({
  accountContainer: { 
    height: 80,
    paddingHorizontal: 20,
    width: "100%"
   },
  accountInfo: {
    marginTop: 35
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
  imageBg: { 
    flex: 1, 
    position: 'relative',
    backgroundColor:'rgba(0,0,0,0.5)',
    opacity: 0.8,
    zIndex: 1,  
  },
  refreshBtn: {
    padding: 8, 
    backgroundColor: GlobalStyles.themeColor.color, 
    borderRadius: 15, 
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginHorizontal: 95
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
mapStyle: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
},
  footer: { 
    flex: 1, 
    backgroundColor: 'white', 
    elevation: 0,
    shadowOpacity: 0, 
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
info: { 
  flexDirection: 'row',   
  justifyContent: 'space-between',
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
    backgroundColor: GlobalStyles.themeColor.color,
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
    bottom: 45,
    left: 15,
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

});

const mapStateToProps = state => {
  return{
    authToken: state.auth.token,
    userProfile: state.userProfile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfile: token => dispatch(fetchUserProfile(token)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);