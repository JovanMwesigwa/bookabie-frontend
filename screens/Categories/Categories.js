import React, {  useReducer, useEffect }  from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import axios from 'axios'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { AntDesign } from '@expo/vector-icons';
import SecondaryHeader from '../../components/SecondaryHeader';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { connect } from 'react-redux'




const initialState = {
  loading: true,
  categories: [],
  error: ""
}

const reducer = (state, action) => {
  switch(action.type){
    case 'FETCH_CAT_SUCCESS':
      return{
        ...state,
        loading: false,
        categories: action.payload,
        error: ""
      }
    case 'FETCH_CAT_FAILURE':
      return{
        ...state,
        loading: false,
        error: "OOPs, looks like we couldn't load your data."
      }
    default:
      return state
  }
}

const Categories = ({ navigation, authToken }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const token = authToken;

  const fetchCategories = () => {
    axios.get(`${APIROOTURL}/api/categories/`,{
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(response => {
      dispatch({type: "FETCH_CAT_SUCCESS", payload: response.data.results})
    })
    .catch(error => {
      dispatch({type: "FETCH_CAT_FAILURE"})
    }) 
  }

  useEffect(() => {
    fetchCategories()
  },[])

const { container } = styles
 return(
  <View style={container}>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <SecondaryHeader />
    <ScrollView> 
      <View style={{ flex: 1, backgroundColor: '#ddd', padding: 10, elevation: 1 }}>
        <Text style={GlobalStyles.greyTextLarge}>CATEGORIES</Text>
      </View>
        {
          state.categories.map(( category ) => (
            <TouchableOpacity key={category.id} onPress={() => (
              navigation.navigate("Category", {title:category.name, color: category.color , slug: category.slug})
            )}>
              <View style={{...styles.categoryListContainer, borderBottomColor: category.color}}>
                <View style={{ width: 35, height: 35, backgroundColor: category.color, borderRadius: 35 }}>
                  
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ paddingHorizontal: 18}}>
                    <Text style={{...GlobalStyles.darkHeaderText, fontSize: 16}}>{category.name}</Text>
                  </View>
                  <View>
                  <AntDesign name="star" size={20} color="#ddd" />

                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white'
  },
  categoryListContainer: {
    flex: 2,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white'
  },
  categoryText: {
    // color: 'white',
    fontSize: 16,
    fontWeight: '700',
    // textAlign: 'center'
  }
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps, null)(Categories)