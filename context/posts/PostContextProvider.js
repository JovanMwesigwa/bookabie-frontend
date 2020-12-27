import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = (props) => {

    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        axios.get('http://5fb8c00ec79.ngrok.io/api/products/')
          .then(response => {
            // console.log(response.data);
            setPosts(response.data)
            
          })
          .catch(err => {
            console.log(err);
          })
      },[]) 

 return(

    <PostContext.Provider value={{ posts }}>
        {props.children}
    </PostContext.Provider>
  
  )
}


export default PostContextProvider