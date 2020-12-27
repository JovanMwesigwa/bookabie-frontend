import React, { useState, useEffect, createContext, useContext} from 'react'
import axios from 'axios';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { AuthContext } from '../authentication/Context';

export const CategoryContext = createContext();


const CategoryContextProvider = (props) => {

  const [ categories, setCategories ] = useState([]);

  const { authState } = useContext(AuthContext);

  const token = authState.token;

  const fetchCategories = async(token_) => {
    try {
      const response = await axios.get(`${APIROOTURL}/api/categories/`,{
        headers: {
          'Authorization': `Token ${token_}`
        }
      })
      setCategories(response.data.results)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    const useEffectFetch = async() => {
      const token_ = await authState.token
      fetchCategories(token_);
    }
    useEffectFetch()
  },[token])

  // console.log(token);
  
 return(
    <CategoryContext.Provider value={{ categories }}>
        {props.children}
    </CategoryContext.Provider>
  )
}


export default CategoryContextProvider