import React,{ useState,  useEffect } from 'react'
import { StyleSheet,  FlatList, RefreshControl } from 'react-native'
import axios from 'axios';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { GlobalStyles } from '../../styles/GlobalStyles'
import MainProductCard from '../../components/MainProductCard';
import SecondaryHeader from '../../components/SecondaryHeader';
import { View, Text,} from 'native-base';
import { connect } from 'react-redux'



const Category = ({ route, navigation, authToken }) => {

  const [ cat, setCat ] = useState([])

  const [ loading, setLoading ] = useState(true);

  const { title, } = route.params;

  const token = authToken;

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