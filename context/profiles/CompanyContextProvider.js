import React, { useState, createContext, useEffect, useReducer, useContext  } from 'react'
import axios from 'axios'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { AuthContext } from '../authentication/Context'
// 1 - loading indicator
// 2 - get posts
// 3 - show errors

const initialState = {
  loading: true,
  products: [],
  errors: ''
}

const reducer = (state, action) => {
  switch(action.type){
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        products: action.payload,
        errors: ''
      }
    case 'FETCH_FAILURE':
      return {
        loading: false,
        products: [],
        errors: 'OOPs, Something went wrong.'
      }
    default:
      return state
  }  
}


export const  CompanyContext = createContext();


const CompanyContextProvider = (props) => {

  const [ state, dispatch ] = useReducer(reducer, initialState);

  const [ userInfo, setUserInfo ] = useState({})

  const [ newProducts, setNewProducts ] = useState([]);

  const [ list, setList ] = useState([]);


  const { authState } = useContext(AuthContext);

  const token = authState.token;

  const fetchPostsData = async(token_) => {
    try {
      // const token_ = await token
      const responseData = await axios.get(`${APIROOTURL}/api/posts/?page=1`, {
        headers: {
          'Authorization': `Token ${token_}`
        }
      });
      dispatch({type: 'FETCH_SUCCESS', payload: responseData.data })
    } catch (error) {
      dispatch({type: 'FETCH_FAILURE'})
    }
  }

  const fetchUsersData = async(token_) => {
    try {
      // const token_ = await token
      const userResponseData = await axios.get(`${APIROOTURL}/api/auth/users/me/`, {
        headers: {
          'Authorization': `Token ${token_}`
        }
      })
      setUserInfo(userResponseData.data)
    } catch (error) {
     console.log(error);
    }
    
  }

  const fetchPosts = () => {
    axios.get(`${state.products.next}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
      dispatch({type: 'FETCH_SUCCESS', payload: res.data })

      })
      .catch(err => {
      dispatch({type: 'FETCH_FAILURE'})

      })
  }

  const fetchFirstPostsData = async() => {
    try {
      const token_ = await token
      const response = await axios.get(`${APIROOTURL}/api/posts/?page=1`, {
        headers: {
          'Authorization': `Token ${token_}`
        }
      });
      dispatch({type: 'FETCH_SUCCESS', payload: response.data })
    } catch (error) {
      dispatch({type: 'FETCH_FAILURE'})
    }
  }

  const handleLoadMore = () => {
    fetchPosts()
  }

  useEffect(() => {
    const fetchEffect = async() => {
      const token_ = await token
      fetchPostsData(token_)
      fetchUsersData(token_)
    }
    fetchEffect();
  },[token])

 return(  
   <CompanyContext.Provider value={{  ...state, userInfo, handleLoadMore, fetchFirstPostsData, newProducts, fetchPostsData }}>
     {props.children}
   </CompanyContext.Provider>
    
  )
}

export default CompanyContextProvider