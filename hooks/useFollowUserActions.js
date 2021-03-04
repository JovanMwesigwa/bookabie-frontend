import React from 'react'
import axios from 'axios'

import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'


  const useFollowUserActions = async(token, url, followState) => {
      const [ follows, setFollows ] = React.useState(null)
      setFollows(followState)
    await axios.get(`${APIROOTURL}/${url}/`,{
      headers: {
        'Authorization': `Token ${token}`,
      }
    }).then(res => {
      
    })
    .catch(err => {
      console.log(err)
    })

    return {
        follows, setFollows
    }
  }

  export default useFollowUserActions