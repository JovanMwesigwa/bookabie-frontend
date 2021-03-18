import React,{ useEffect } from 'react'
import { StyleSheet, View, Text,  FlatList, RefreshControl} from 'react-native'
import { connect } from 'react-redux'
import { useRoute } from '@react-navigation/native'




import {ApploadingComponent, ErrorView, MainHeaderComponent, MainProductCard } from '../../components/';
import { GlobalStyles } from '../../styles/GlobalStyles'
import useFetchData from '../../hooks/useFetchData';




const Category = ({ authToken}) => {

  const route = useRoute()

  const { title, } = route.params;

  const token = authToken;

  const { loading, request, data: cat, errors } = useFetchData(token, `api/posts/?search=${title}`)


  useEffect(() => {
    request()
  },[])

if(loading) return <ApploadingComponent />

if (errors) return <ErrorView onPress={request} error={errors} />


const { container } = styles

  const refreshControl = <RefreshControl
    refreshing={loading}
    onRefresh={request}
  />

 return(
<>
   <MainHeaderComponent />
    <View style={styles.greyHeader}>
        <Text  style={GlobalStyles.greyTextLarge}>{title}</Text>
      </View>
    <FlatList
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