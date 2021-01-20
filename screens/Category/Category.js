import React,{ useState, useContext, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, ScrollView, FlatList, RefreshControl } from 'react-native'
import axios from 'axios';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles'
import ProductCategoryCard from '../../components/productCategoryCard';
import { CompanyContext } from '../../context/profiles/CompanyContextProvider';
import MainProductCard from '../../components/MainProductCard';
import SecondaryHeader from '../../components/SecondaryHeader';
import { AuthContext } from '../../context/authentication/Context'
import { Container, Header, Content, SwipeRow,  View, Text, Icon, Button } from 'native-base';

const Category = ({ route, navigation }) => {

  const [ cat, setCat ] = useState([])

  const { products } = useContext(CompanyContext);

  const { authState } = useContext(AuthContext);

  const [ loading, setLoading ] = useState(true);

  const { title, color, slug, } = route.params;

  const token = authState.token;

  const fetchPosts = async(token_) => {
    try{
      const response = await axios.get(`${APIROOTURL}/api/posts/?search=${title}`,{
        headers : {
          'Authorization': `Token ${token}`
        }
      })
      setCat(response.data)
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }


  const refreshFetchPosts = async() => {
    try{
      const response = await axios.get(`${APIROOTURL}/api/posts/?search=${title}`,{
        headers : {
          'Authorization': `Token ${token}`
        }
      })
      setCat(response.data)
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const useeffectFetch = async() => {
      const token_ = authState.token
      fetchPosts(token_);
    }
    useeffectFetch();
  },[])

  // console.log(title)

const { container } = styles

  const refreshControl = <RefreshControl
    refreshing={loading}
    onRefresh={refreshFetchPosts}
  />

 return(
<>
  <SecondaryHeader />
    <View style={{backgroundColor: '#ddd', padding: 10, }}>
      <Text  style={GlobalStyles.greyTextLarge}>{title}</Text>
      </View>
    <FlatList
        ListHeaderComponent={
        <View style={container}>
            
        </View>
        }
        data={cat.results}
        refreshControl={refreshControl}
        renderItem={({ item }) => (
          <View style={{ flex: 1,}}>
              <MainProductCard item={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
    />
</>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 32
    // backgroundColor: 'white'
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
export default Category