import React,{ useContext, useReducer, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, StatusBar, RefreshControl } from 'react-native'
import axios from 'axios';
import CompanyCard from '../../components/CompanyCard';
import SecondaryHeader from '../../components/SecondaryHeader';
import * as Animatable from 'react-native-animatable';
import { UserInfoContext } from '../../context/userInfoContext/UserInfoContextProvider'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { connect } from 'react-redux'





const initialState = {
  loading: true,
  profiles: [],
  errors: "",
}

const reducer = (state, action) => {
  switch(action.type){
    case "FETCH_SUCCESS":
      return {
        loading: false,
        profiles: action.payload,
        errors: "",
      }
    case "FETCH_FAILED":
      return{
        loading: false,
        profiles: [],
        errors: "OOPs!, looks like something went wrong."
      }

    default:
      return state;


  }
}

const CompanyList = ({ authToken }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const { userInfo } = useContext(UserInfoContext);

    const token = authToken;

    const fetchProfiles = () => {
      axios.get(`${APIROOTURL}/api/profiles/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        })
        .then(res => {
          dispatch({type: "FETCH_SUCCESS", payload: res.data.results})
        })
        .catch(err => {
          dispatch({type: "FETCH_FAILURE"})
        })
    }

useEffect(() => {
  fetchProfiles();
},[])


const name = userInfo.user;

const refreshControl = <RefreshControl
    refreshing={state.loading}
    onRefresh={fetchProfiles}
/>
 return(
    <View style={{ flex: 1 }}>
       <StatusBar backgroundColor='white' barStyle='dark-content' />
        <SecondaryHeader />
        <View style={{ backgroundColor: '#ddd', padding: 5, paddingBottom: 10, paddingHorizontal: 20, elevation: 1}}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#777' }}>ALL COMPANIES</Text>
        </View>
        {state.loading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <ActivityIndicator size='small' collapsable color='#B83227' />
        </View>
        :
        <FlatList
            data={state.profiles}
            refreshControl={refreshControl}
            renderItem={({ item }) => (
                <CompanyCard item={item} companyName={name} />
            )}
            keyExtractor={(item) => item.id.toString()}
        />
        }
        {state.errors ? 
          <Animatable.View style={styles.errorStyles}
            animation='fadeInUp'
            delay={10000}
            duration = {2000}> 
            <Text style={{ textAlign: 'center', color: 'white', letterSpacing:1 }}>{state.errors}</Text> 
          </Animatable.View>
          
          : null
         }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  errorStyles: { 
    padding: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '80%',
    left: '5%',
    backgroundColor: 'black', 
    borderRadius: 5,
    elevation: 2,
    // borderLeftWidth: 5,
    // borderLeftColor: '#B83227' 
},
  
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps)(CompanyList)