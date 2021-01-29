import React, { useState, useContext, useEffect, useReducer } from 'react'
import { View, Text, StyleSheet, ScrollView,Image,  FlatList, ActivityIndicator, StatusBar, RefreshControl } from 'react-native'
import axios from 'axios';
import { connect } from 'react-redux'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { CompanyContext } from '../../context/profiles/CompanyContextProvider';
import { MaterialCommunityIcons,MaterialIcons, Ionicons} from '@expo/vector-icons';
import TopProductCat from '../../components/topProductCat'
import ProductCard from '../../components/productCard'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainHeaderComponent from '../../components/MainHeaderComponent'
import * as Animatable from 'react-native-animatable';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { signOut } from '../../redux/auth/authRedux'
import { fetchLoadMorePosts, fetchPosts, hotReloadPosts } from '../../redux/posts/postsRedux';


const initialState = {
  postsLoading: true,
  postsData: [],
  error: null
}

const reducer = (state, action) => {
  switch(action.type){
    case "FETCH_POSTS_REQUEST":
      return{
        ...state,
        postsLoading: true,
        postsData: [],
        error: null
      }
    case "FETCH_POSTS_SUCCESS":
      return{
        ...state,
        postsLoading: false,
        postsData: action.payload,
        error: null
      }
    case "FETCH_POSTS_FAILURE":
      return{
        ...state,
        postsLoading: [],
        error: "OOPs, Something went wrong"
      }
    default:
      return state

  }
}

const Find = ({ navigation, signOut, authToken, posts,fetchHotReload, postsLoading,postsErrors, fetchPostsFunc, fetchMorePostsFunc }) => {

  const [ state, dispatch] = useReducer(reducer, initialState);

  const [ topProfiles, setTopProfiles ] = useState([]);

  const [ nextUrl, setNextUrl ] = useState(null);

  const noConnectionImage = require('../../assets/images/noint.png');

  const logo  = require('../../assets/Logos/bbieL.png')

  const token = authToken;

  const [ morePostsLoading, setMorePostsLoading ] = useState(false);

  const  { loading,  errors, fetchFirstPostsData,  fetchPostsData }  = useContext(CompanyContext);

  const [ morePosts, setMorePosts ] = useState([]);

  const fetchTopProducts = () => {
    axios.get(`${APIROOTURL}/api/promoted_profiles/`,{
      headers: {
          'Authorization': `Token ${token}`
      }
  })
  .then(response => {
    setTopProfiles(response.data.results)
  })
  .catch(err => {
    console.log(err);
  })
  }

  const fetchProducts = () => {
    axios.get(`${APIROOTURL}/api/posts/?page=1`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(resData => {
      const url = resData.data.next
      setNextUrl(url)
    })
    .catch(error => {
      dispatch({type: "FETCH_POSTS_FAILURE" })
    })
  }


  const getSearch = async(enteredText) => {
    await axios.get(`${APIROOTURL}/api/posts/?search=${enteredText}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        
      })
      .catch(err => {
        console.log(err);
      })
    
  }


  const loadMorePostsData  = () => {
    setMorePostsLoading(true);
    axios.get(`${nextUrl}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        setMorePosts(res.data.results);
      })
      .catch(err => {
      console.log(err);
      })
  }


 
  const getMorePosts = () => {
    // This fuction is called by the loadmore button and makes an API call to the backend using the next page results.
    // fetchMorePostsFunc(token, page);
    loadMorePostsData()
    setMorePostsLoading(false);
  }

  const refreshPosts = () => {
    fetchHotReload(token);
  }

  const getProducts = () => {
    // This function is called by the flatlist {data} and it appends loadmore post on the current post lists in the feed.  
    const allProducts = [...posts, ...morePosts]
    return allProducts;
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchHotReload(token)
  //   }, 5000);
  // },[posts])
  
  // setTimeout(() => {
  //   fetchHotReload(token)
  // },60000)

  const reloadPosts = () => {
    fetchHotReload(token)
  }
 
  useEffect(() => {
      fetchTopProducts()
      fetchPostsFunc(token);
      fetchProducts()
  },[])

  if (postsLoading ) {
    return (
      <View style={styles.isLoadingStyles}
      >
        <StatusBar barStyle="light-content" backgroundColor="#fff" />
        <Image source={logo} style={styles.logoStyles} />
        <Text style={{color: GlobalStyles.themeColor.color}}>Bookabie</Text>
      </View>
    )
  }

  if (postsErrors) {
    return (
      <>
        <StatusBar backgroundColor='#ddd' barStyle='light-content' />
        <MainHeaderComponent getSearch={getSearch} />
        <View style={{ flex: 1, margin: 25 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={noConnectionImage} style={{ width: 30, height: 30}} />
          <Text style={GlobalStyles.primaryText}>{errors}</Text> 
        </View> 
              
          <TouchableOpacity style={styles.refreshBtn}
              onPress={fetchFirstPostsData}
              >
                <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15}}>Refresh</Text>
          </TouchableOpacity>
          
        </View>
      </>
    )
  }


  const renderFooter = () => {
    return(
      <>
      {postsErrors ? null : 
        <Animatable.View style={{ flex: 1, justifyContent: 'center', elevation: 5, paddingHorizontal: 15, alignItems: 'center',  marginVertical: 15 }}
          animation='fadeInUp'
          delay={900}
          duration = {200}  
        >
          <TouchableOpacity style={styles.loadMoreBtn}
            onPress={getMorePosts}
          >
              <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15}}>
                {
                  morePostsLoading ? <ActivityIndicator size='small' collapsable color='#fff' /> : "Load more posts"
                }
              </Text>
          </TouchableOpacity>
        </Animatable.View>
      }
      </>
    )
  }

  const { container } = styles
  const refreshControl = <RefreshControl 
        refreshing={loading}
        onRefresh={refreshPosts}
      />

 return(
   <>
      <StatusBar backgroundColor='#ddd' barStyle='dark-content' />
      <MainHeaderComponent   />

      { postsLoading ? 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ActivityIndicator size='small' collapsable color={GlobalStyles.themeColor.color} />
      </View>  :
        <FlatList 
            ListHeaderComponent ={
              <>
                
                <View style={container}>
                                   
                  <View style={styles.inputContainer}>

                  <View style={styles.feedContainer}>
                    <View style={GlobalStyles.rowSpaceBtn}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center'}}
                            onPress={() => fetchPostsData(token)}
                        >
                          <MaterialIcons name="insert-chart" size={18} color="#777" />
                          <Text style={GlobalStyles.customGreyText}>Recent</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                          <MaterialIcons name="location-on" size={18} color="#777" />
                          <Text style={GlobalStyles.customGreyText}>Global</Text>
                        </View>
                      <TouchableOpacity onPress={signOut} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="md-exit" size={20} color="#777" />
                        <Text style={GlobalStyles.customGreyText}>Logout</Text>
                      </TouchableOpacity>
                      </View>
                    </View>

                  </View>
                    
                  </View>
                  <View style={styles.feedContainerTwo}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, }}>
                    <MaterialCommunityIcons name="trending-up" size={20} color="green" />
                      <Text style={{...GlobalStyles.headerText, fontSize: 14 }}>TOP TRENDS</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate('Company List')
                    }}>
                      <Text style={{...GlobalStyles.headerText, fontSize: 12, fontWeight: '600', color: '#05325a'}}>View all</Text>
                    </TouchableOpacity>

                  </View>

                  <ScrollView style={styles.topProduct}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    
                    {topProfiles.map(acc => (
                      <View key={acc.id}>
                        <TopProductCat topBrand={acc} />
                      </View>
                    ))}
                    
                  </ScrollView>
                </View>
               
              </>
            }
            data={getProducts()}
            onEndReached={getMorePosts}
            refreshControl={refreshControl}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={5.0}
            renderItem={({ item }) => (
              <ProductCard item={item} reloadPosts={reloadPosts} />
            )}
              keyExtractor={(item) => item.id.toString()}
          />
          
      }
      <View style={styles.UploadBtn}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Post Product')
        }}>
            <MaterialCommunityIcons name="feather" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
  </>
  )

}
const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  greetText: {
    
  },
  isLoadingStyles: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 999
    },
  logoStyles: { 
    width: 55, 
    height: 55, 
    resizeMode: 'contain',
    borderRadius: 10 
},
  feedContainer: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  modal: {
    // marginVertical: 25
    // borderRadius: 24
    
  },
  loadMoreBtn: {
  flexDirection: 'row', 
  padding: 8, 
  backgroundColor: GlobalStyles.themeColor.color, 
  borderRadius: 15, 
  justifyContent: 'center',
  alignItems: 'center' ,
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
  feedContainerTwo: {
    paddingTop: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  UploadBtn: {
    padding: 15,
    backgroundColor: GlobalStyles.themeColor.color, 
    borderRadius: 24, 
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5
  },
  topBtnContainer: {
    padding: 5, 
    backgroundColor: '#fff', 
    borderRadius: 8,
    width: 36,
    marginHorizontal: 5,
    marginVertical: 12 
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
bookmark: {
  position: "absolute",
  color: "#fff",
  top: 5,
  right: 5,
  padding: 13,
  backgroundColor: GlobalStyles.themeColor.color,
  borderRadius: 56 / 2,
},
  inputContainer: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  headerTextContainer: {
    // paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingBottom: 24
  },
  headerText: {
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 0.1
  },
  input: {
      flex: 2,
      borderWidth: 1,
      borderColor: "#ddd",
      // borderRadius: 24,
      padding: 2,
      // paddingHorizontal: 29,
      // width: '100%',
      marginHorizontal: 15,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  filterContainer: { 
    padding: 12, 
    backgroundColor: 'white', 
    height: 45, 
    borderRadius: 10, 
    width: 50,
    elevation: 5,
    marginHorizontal: 32 
},
  topProduct: {
      flexDirection: "row",
      paddingHorizontal: 15,
      backgroundColor: "white",
  },
    courselContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      backgroundColor: 'white',
      paddingTop: 25, 
  },
  logoStyles: { 
    width: 55, 
    height: 55, 
    resizeMode: 'contain',
    borderRadius: 10 
},
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token,
    posts: state.posts.postsItems,
    postsLoading: state.posts.loading,
    postsErrors: state.posts.errors
  }
}

const mapDispatchToProps = dispatch => {
  return{
    signOut: () => dispatch(signOut()),
    fetchPostsFunc: (token) => dispatch(fetchPosts(token)),
    fetchMorePostsFunc: (token, nextUrl) => dispatch(fetchLoadMorePosts(token, nextUrl)),
    fetchHotReload: (token) => dispatch(hotReloadPosts(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Find)