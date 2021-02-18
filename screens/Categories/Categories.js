import React, {  useEffect }  from 'react'
import { View, Text, StyleSheet,StatusBar, FlatList } from 'react-native'



import { connect } from 'react-redux'
import FillerIcon from '../../components/FillerIcon';
import { GlobalStyles } from '../../styles/GlobalStyles';
import MainHeaderComponent from '../../components/MainHeaderComponent';
import useFetchData from '../../hooks/useFetchData'



const url = "api/categories/"

const Categories = ({ authToken }) => {

  const token = authToken;

  const { data, request } = useFetchData(token, url)


  useEffect(() => {
    request()
  },[])

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
                data={data.results}
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
    height: 120,
    borderRadius: 15,
    alignItems: 'center',
    padding: 8,
    marginTop: 15,
    margin: 8,

  },
  flatListContainer: {
    width: "100%",
    height: "100%",
    
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