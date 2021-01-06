import React,{ createContext, useReducer, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import axios from 'axios';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { AuthContext } from '../authentication/Context'


const initialState = {
    accLoading: true,
    accounts: [],
    accErrors: ''
}

const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_SUCCESS':
            return {
                accLoading: false,
                accounts: action.payload,
                accErrors: ''
            }
        case 'FETCH_FAILED':
            return {
                accLoading: false,
                accounts: [],
                accErrors: 'Something broke when getting your data.'
            }
        default:
            return state 
    }
}

export const AccountContext = createContext();

const AccountContextProvider = (props) => {

const [ state, dispatch ]  = useReducer(reducer, initialState);

const { authState } = useContext(AuthContext);

  const token = authState.token;

  const fetchData = async(token_) => {
      try{
        const response = await axios.get(`${APIROOTURL}/api/promoted_profiles/`,{
            headers: {
                'Authorization': `Token ${token_}`
            }
        })
        dispatch({type: 'FETCH_SUCCESS', payload: response.data.results})
      }catch(error){
        dispatch({type: 'FETCH_FAILED'})
      }
    
  }

  

  const fetchRefreshedData = async() => {
    try{
      const response = await axios.get(`${APIROOTURL}/api/promoted_profiles/`,{
          headers: {
              'Authorization': `Token ${token}`
          }
      })
      
      dispatch({type: 'FETCH_SUCCESS', payload: response.data.results})
    }catch(error){
      dispatch({type: 'FETCH_FAILED'})
    }
  
}

useEffect(() => {
    const useeffectFetch = async() => {
        const token_ = await authState.token
        fetchData(token_)
    }
    useeffectFetch();
},[token])

// console.log("*****************", state.accounts);

 return(
    <AccountContext.Provider value={{ ...state, fetchRefreshedData }}>
        {props.children}
    </AccountContext.Provider>
  )
}


export default AccountContextProvider