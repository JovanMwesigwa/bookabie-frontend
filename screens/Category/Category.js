import React,{ useState,  useEffect } from 'react'
import { StyleSheet,  FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import axios from 'axios';




import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { GlobalStyles } from '../../styles/GlobalStyles'
import MainProductCard from '../../components/MainProductCard';
import { View, Text,} from 'native-base';
import MainHeaderComponent from '../../components/MainHeaderComponent';


const Category = ({ authToken, navigation }) => {

  const [ cat, setCat ] = useState([])

  const [ loading, setLoading ] = useState(true);

  const [ cartIDs, setCartIDs ] = useState({});

  const route = useRoute()

  const { title, } = route.params;

  const token = authToken;

  const fetchCartItemIDs = () => {
    axios.get(`${APIROOTURL}/api/my_cart/`,{
      headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(res => {
          const cartDataIDs = res.data.results
          cartDataIDs.forEach(item => {
            setCartIDs(item.id);
          }); 
      })
      .catch(err => {
          console.log(err);
      })
  }

  const fetchPosts = () => {
    axios.get(`${APIROOTURL}/api/posts/?search=${title}`,{
        headers : {
          'Authorization': `Token ${token}`
        }
      })
      .then(response => {
        setCat(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  

  useEffect(() => {
    fetchPosts();
  },[])


const { container } = styles

  const refreshControl = <RefreshControl
    refreshing={loading}
    onRefresh={fetchPosts}
  />

 return(
<>
  {/* <OtherHeaderComponent /> */}
  <MainHeaderComponent />
    <View style={styles.greyHeader}>
        <TouchableOpacity style={styles.arrowBack} onPress={() => navigation.goBack()} >
          <AntDesign name="arrowleft" size={24} color="#777" />
        </TouchableOpacity>
        <Text  style={GlobalStyles.greyTextLarge}>{title}</Text>
      </View>
    <FlatList
        ListHeaderComponent={
        <View style={container}>
            
        </View>
        }
          data={cat.results}
          showsVerticalScrollIndicator={false}
          refreshControl={refreshControl}
          renderItem={({ item }) => (
          <View style={{ flex: 1,}}>
              <MainProductCard item={item} token={token} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
    />
</>
  )
}


const styles = StyleSheet.create({
  arrowBack: {
    marginRight: 8,
  },
  container: {
    flex: 1,
  },
  greyHeader: {
    alignItems: 'center',
    backgroundColor: '#ddd', 
    flexDirection: 'row',
    padding: 10, 
    
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',   
    paddingHorizontal: 15, 
    elevation: 2, 
    height: 55, 
    borderBottomWidth: 5, 
    borderBottomColor: '#B83227',
  },
  
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    paddingLeft: 32
  }
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}

export default connect(mapStateToProps, null)(Category)