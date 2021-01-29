import React,{ useReducer, useEffect, useContext } from 'react'
import axios from 'axios';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Image } from 'react-native'
import { AuthContext } from '../../context/authentication/Context'
import { connect } from 'react-redux'



const initialState = {
    loading: true,
    account: {},
    error: ''
}

const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                account: action.payload,
                error: ''
            }
        case 'FETCH_FAILED':
            return {
                loading: false,
                account: {},
                error: 'OOPs, Encountered an error when fetching your data.'
            }
        default:
            return state
    }
}

const CompanyDetails = ({ route, authToken }) => {
    const { ID, } = route.params;

    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    const { authState } = useContext(AuthContext);

    const token = authToken;

    useEffect(() => {
        const fetchAccount = async() => {
            await axios.get(`${APIROOTURL}/api/account/${ID}/detail/`,{
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then(res => {
                    dispatch({type: 'FETCH_SUCCESS', payload: res.data})
                })
                .catch(err => {
                    dispatch({type: 'FETCH_FAILED'})
                })
        }
        fetchAccount();
    },[])

    // console.log(state.account);

const { container } = styles
 return(
  <ScrollView style={container}>

    {state.loading ? <ActivityIndicator
    
    size={25}
    color="#75DA8B"
    style={{ marginVertical: 300, alignItems: 'center', justifyContent: 'center' }}
    />
    : 
        <Image  source={{ uri: state.account.cover_photo }} style={styles.coverImageHeader} />
    }
      {state.error ? <Text>{state.error}</Text> : null }
  </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  coverImageHeader: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
  }
})

const mapStateToProps = state => {
    return{
        authToken: state.auth.token
    }
}
export default connect(mapStateToProps, null)(CompanyDetails)