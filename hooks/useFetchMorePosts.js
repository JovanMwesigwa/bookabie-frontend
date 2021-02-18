import React from 'react'
import axios from 'axios'

import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'

export default useFetchMorePosts = (token) => {

    const [ morePosts, setMorePosts ] = React.useState([]);
    const [ morePostsLoading, setMorePostsLoading ] = React.useState(false);

      const loadMorePostsData  = (next) => {
        setMorePostsLoading(true);
        axios.get(`${APIROOTURL}/api/posts/?page=${next}`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        })
          .then(res => {
            setMorePostsLoading(false)
            setMorePosts(res.data.results);
          })
          .catch(err => {
          console.log(err);
          })
      }
  

    return { morePosts, morePostsLoading, setMorePostsLoading,  loadMorePostsData}
}
