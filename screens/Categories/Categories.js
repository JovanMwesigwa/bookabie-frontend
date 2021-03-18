import React, {  useEffect }  from 'react'
import { View, Text, StyleSheet,StatusBar, FlatList } from 'react-native'
import { connect } from 'react-redux'



import {ErrorView, FillerIcon, MainHeaderComponent} from '../../components/';
import { GlobalStyles } from '../../styles/GlobalStyles';
import useFetchData from '../../hooks/useFetchData'
import SplashLoadingScreen from '../SplashLoadingScreen.js/SplashLoadingScreen';




const url = "api/categories/?page=1"

const Categories = ({ authToken }) => {

  const token = authToken;
  
  const { data, request, loading, errors } = useFetchData(token, url)

  useEffect(() => {
    request()
  },[])

  const fetchMoreCategories = useFetchData(token, `api/categories/?page=2`)

  const handleLoadMore = () => {
    fetchMoreCategories.request()
  }
  
  const allCatergories = () => {
    const all = data.results
    return all
  }

  if (loading) return <SplashLoadingScreen />

  if (errors) return <ErrorView onPress={handleLoadMore} error={errors} />



const { container } = styles
 return(
  <View style={container}>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <MainHeaderComponent />
      <View style={{ backgroundColor: '#ddd', padding: 10, elevation: 1 }}>
        <Text style={GlobalStyles.greyTextLarge}>CATEGORIES</Text>
      </View>
        <View style={styles.flatListContainer}>
            {   
              <FlatList 
                data={allCatergories()}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <View style={styles.categoryListContainer}>
                        <FillerIcon item={item} />
                    </View>
                    ) 
                }
              /> 
            }
        </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white',
  },
  
  categoryListContainer: {
    flex: 1,
    borderRadius: 15,
    alignItems: 'center',
    padding: 3,
    marginTop: 15,
    margin: 8,

  },
  flatListContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '700',
  }
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps, null)(Categories)