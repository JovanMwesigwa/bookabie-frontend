import React, {  useEffect, useState } from 'react'
import { View, StyleSheet,   Dimensions, Image, ImageBackground, TouchableOpacity, ActivityIndicator, StatusBar, FlatList, RefreshControl } from 'react-native'
import {  Entypo, AntDesign} from '@expo/vector-icons';
import { Surface, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';



import ProfileHeader from '../../components/ProfileHeader';
import { GlobalStyles } from '../../styles/GlobalStyles'
import ProductCard from '../../components/productCard';
import { Caption, Paragraph,  } from 'react-native-paper';
import {  Tab, Tabs } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapModalComponent from '../../components/MapComponent';
import SecondaryHeader from '../../components/SecondaryHeader';
import useFetchData from '../../hooks/useFetchData'




const userUrl = "api/userprofile/user/detail/"
const followersUrl = "api/followers/"
const noConnectionImage = require('../../assets/images/noint.png');
const mapImage = require('../../assets/images/m.jpg');
const image1 = require('../../assets/images/nikisPizza.jpg');
const image2 = require('../../assets/images/pizzaHut.jpg');




const Profile = ({  navigation, authToken }) => {

  const [ modalShown, setModalShown ] = useState(false);

  const token = authToken

  const { data, loading, errors, request } = useFetchData(token, userUrl);

  const followersData = useFetchData(token, followersUrl)

  const postsData = useFetchData(token, `api/profileposts/${data.user}`)


  const showMap = () => {
    setModalShown(true);
  }

  const closeMap = () => {
    setModalShown(false)
  }

  
  const fastRefresh = () => {
    request()
    followersData.request()
  }


  useEffect(() => {
    request()
    followersData.request()
  },[])



  if (errors) {
    return (
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
          onPress={() => postsData.request()}
        >
          <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15 }}>View all my posts</Text>
        </TouchableOpacity>
      </Animatable.View>
    )
  }


  // fetchProducts()

const { container } = styles

const refreshControl = <RefreshControl
  refreshing={loading}
  onRefresh={() => request()}
/>
 return(

  <>
      <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <ProfileHeader profileName={data.user} />
      {loading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <ActivityIndicator size='small' collapsable color={GlobalStyles.themeColor.color} />
        </View>
    :
    <FlatList
    
    
    ListHeaderComponent={
        <>
          <View style={styles.container}>

         
          <ImageBackground style={styles.coverImageHeader} source={{uri: data.cover_photo}}>
            <View style={styles.child}>

            </View>
          </ImageBackground>

          <View style={styles.footer}>

            <View style={{ flex: 1, marginBottom: 3, paddingHorizontal: 20 }} >

              <Image source={{ uri: data.profile_pic }} style={styles.profilephoto} />
            
            <View style={{ flexDirection: 'row', marginTop: 15,  justifyContent: 'space-between' }}>
                <View >
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={{...styles.mainText, fontSize: 15}}>{data.user}</Text>
                    <AntDesign name="star" size={10} color={GlobalStyles.darkFontColor.color} />
                  </View>
                  <Text style={styles.secondaryText}>{data.profile_type.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', position: 'absolute',bottom: 30, right: 1}}>
                    <TouchableOpacity style={styles.cartBtnContainer} onPress={() => {
                      navigation.navigate('Edit Profile', {Profile: data, RefreshFetchedUser: request})
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
                  <Paragraph style={{...styles.mainText, fontWeight: '600'}}>{data.working_days}</Paragraph>
                  <Caption  style={{...styles.secondaryText, fontSize: 13}}>{data.working_hours}</Caption> 
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                  <Entypo name="location-pin" size={18} color="#FF5A09" />
                </View>
                <View style={{   paddingHorizontal: 5 }}>
                  <Paragraph style={{...styles.mainText,fontWeight: '600'}}>{data.location}</Paragraph> 
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
                  <Entypo name="globe" size={18} color="#FF5A09" />
                </View >
                  <Caption style={{...styles.mainText,fontWeight: '600', color: '#777',  paddingHorizontal: 5}}>{data.contact}</Caption> 
              </View>
              <View style={styles.section}>
                  <MaterialCommunityIcons name="account-group" size={18} color="#FF5A09" />
                  <Paragraph style={[styles.paragraph,styles.caption]}>{followersData.data.count}</Paragraph>
                  <Caption style={{...styles.caption, paddingLeft: 2}}>followers</Caption>
                  <Paragraph style={[styles.paragraph,styles.caption]}>{data.following.length}</Paragraph>
                  <Caption style={{...styles.caption, paddingLeft: 2}}>following</Caption>
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
                    <Surface style={ styles.descriptionContainer }>
                      <Image source={image1} style={{ flex: 1, width: null, height:null, borderRadius: 12, resizeMode: "cover" }} />
                        <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
                            <Text style={styles.mainText}>Banana Barito </Text>
                            <Text style={styles.secondaryText}>Lorem Ipsum si </Text>
                            <Text style={{ color: '#218F76', fontWeight: "700" }}>$35.00</Text>
                        </View>  
                    </Surface>

                    <Surface style={{ ...styles.descriptionContainer, marginVertical: 8 }}>                       
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
                    activeTextStyle={{color: GlobalStyles.themeColor.color, fontWeight: '700'}}
                  >
                    
                      <View style={{ flex: 1, marginVertical: 8, paddingHorizontal: 20 }}>
                        <View style={{ flex: 1, }}>
                            <Paragraph muted style={{...styles.mainText,  letterSpacing: 0.5, lineHeight: 18, fontSize: 14.5, fontWeight: '600'}}>{data.description}</Paragraph>
                        </View>
                    </View>
                  </Tab>

                  <Tab heading="Location"
                    tabStyle={{backgroundColor: 'white'}} 
                    textStyle={{color: '#777'}} 
                    activeTabStyle={{backgroundColor: 'white'}} 
                    activeTextStyle={{color: GlobalStyles.themeColor.color, fontWeight: '700'}}
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
      data={postsData.data.results}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          refreshPost={request}
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
    // paddingBottom: 10, 
    // paddingVertical: 20,
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
    left: 20,
    width: 65,
    height: 65,
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
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps, null)(Profile);