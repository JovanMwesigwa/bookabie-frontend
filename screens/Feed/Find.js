import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { GlobalStyles } from '../../styles/GlobalStyles'
import { CompanyContext } from '../../context/profiles/CompanyContextProvider';
import { MaterialCommunityIcons,MaterialIcons, Feather, Ionicons} from '@expo/vector-icons';
import { View, Text, StyleSheet, ScrollView,Image,  FlatList, ActivityIndicator, StatusBar, RefreshControl } from 'react-native'
import TopProductCat from '../../components/topProductCat'
import ProductCard from '../../components/productCard'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainHeaderComponent from '../../components/MainHeaderComponent'
import * as Animatable from 'react-native-animatable';
import { AccountContext } from '../../context/accounts/AccountContextProvider';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { AuthContext } from '../../context/authentication/Context'




const Find = ({ navigation }) => {


  const [refreshing, setRefreshing] = useState(false);


  const noConnectionImage = require('../../assets/images/noint.png');

  const logo  = require('../../assets/Logos/bbieL.png')

  const [ openModal, setOpenModal ] = useState(false);

  const { authContext, authState } = useContext(AuthContext);

  const token = authState.token;

  const [ isLoading, setIsLoading ] = useState(true);

  const  { loading, products, errors, fetchFirstPostsData, userInfo, fetchPostsData, handleLoadMore, newProducts }  = useContext(CompanyContext);

  const { accounts }  = useContext(AccountContext);
  

  const products_ = products.results

  const getSearch = async(enteredText) => {
    await axios.get(`${APIROOTURL}/api/posts/?search=${enteredText}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        
        // console.log(products_);
      })
      .catch(err => {
        console.log(err);
      })
    
  }

  
  const closeModalHandler = () => {
    setOpenModal(false)
  }

  const navigateBack = () => {
    navigation.goBack()
  }

  const signOut = authContext.signOut


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    },3000)
  },[])

  
  if (isLoading ) {
    return (
      <View style={styles.isLoadingStyles}
      >
        <StatusBar barStyle="light-content" backgroundColor="#fff" />
        {/* <Image source={logo} style={styles.logoStyles} /> */}
        <Text style={{ color: '#B83227' }}>Bookabie</Text>
        {/* <ActivityIndicator size='small' collapsable color='#B83227' /> */}
      </View>
    )
  }

  if (errors) {
    return (
      <>
        <StatusBar backgroundColor='#ddd' barStyle='light-content' />
        <MainHeaderComponent getSearch={getSearch} />
        <View style={{ flex: 1, margin: 25 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {/* <Image source={noConnectionImage} style={{ width: 30, height: 30}} /> */}
          <Text style={GlobalStyles.primaryText}>{errors}</Text> 
        </View> 
              
          <TouchableOpacity style={styles.refreshBtn}
              onPress={fetchFirstPostsData}
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
      <>
      {errors ? null : 
        <Animatable.View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15, alignItems: 'center',  marginVertical: 15 }}
          animation='fadeInUp'
          delay={900}
          duration = {200}  
        >
          <TouchableOpacity style={styles.loadMoreBtn}
            onPress={handleLoadMore}
          >
            <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15}}>Load more posts</Text>
            {/* <ActivityIndicator size={10} color='white' style={{ paddingHorizontal: 8 }} /> */}
          </TouchableOpacity>
        </Animatable.View>
      }
      </>
    )
  }
  // console.log('NEW products', newProducts);

  const { container } = styles
  const refreshControl = <RefreshControl
        refreshing={loading}
        onRefresh={fetchFirstPostsData}
      />

 return(
   <>
      <StatusBar backgroundColor='#ddd' barStyle='dark-content' />
      <MainHeaderComponent getSearch={getSearch} />

      {loading || isLoading ? 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ActivityIndicator size='small' collapsable color='#B83227' />
      </View>  :
        <FlatList 
            ListHeaderComponent ={
              <>
                
                <View style={container}>
                  {/* <CartComponent /> */}
                                   
                  <View style={styles.inputContainer}>

                  <View style={styles.feedContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center'}}
                            onPress={() => fetchPostsData(token)}
                        >
                          <MaterialIcons name="insert-chart" size={18} color="#777" />
                          <Text style={{ fontSize: 15, fontWeight: '700', color: '#777',paddingLeft: 4, }}>Recent</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                          <MaterialIcons name="location-on" size={18} color="#777" />
                          <Text style={{ fontSize: 15, fontWeight: '700', color: '#777', paddingLeft: 4 }}>Global</Text>
                        </View>
                      <TouchableOpacity onPress={signOut} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="md-exit" size={20} color="#777" />
                        <Text style={{ fontSize: 15, fontWeight: '700', color: '#777', paddingLeft: 5 }}>Logout</Text>
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
                    
                    {accounts.map(acc => (
                      <View key={acc.id}>
                        <TopProductCat topBrand={acc} />
                      </View>
                    ))}
                    
                  </ScrollView>
                </View>
               
              </>
            }
            data={products_}
            // onEndReached={() => handleLoadMore()}
            refreshControl={refreshControl}
            ListFooterComponent={renderFooter}
            // onEndReachedThreshold={200}
            renderItem={({ item }) => (
              <ProductCard item={item} />
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
  //  backgroundColor: 'black'
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
  backgroundColor: '#B83227', 
  borderRadius: 15, 
  justifyContent: 'center',
  alignItems: 'center' 
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
  feedContainerTwo: {
    paddingTop: 5,
    paddingHorizontal: 15,
    // backgroundColor: "#EDEBEB",
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  UploadBtn: {
    padding: 15,
    backgroundColor: '#B83227', 
    borderRadius: 24, 
    // paddingHorizontal: 18,
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
bookmark: {
  position: "absolute",
  color: "#fff",
  top: 5,
  right: 5,
  padding: 13,
  backgroundColor: "#B83227",
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
})
export default Find