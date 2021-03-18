import React from 'react'
import axios from 'axios'

import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'

export default useAuthUser = (token) => {

    const [ user, setUser ] = React.useState({})


    const fetchUser = async() => {
        await axios.get(`${APIROOTURL}/api/userprofile/user/detail/`,{
            headers: {
              'Authorization': `Token ${token}`, 
            }
          })
          .then(res => {
            const response = res.data
            setUser(response);
          })
          .catch (error => {
            console.log(error);
          })
    }

    React.useEffect(() => {
        fetchUser()
    },[])

    return {
      user,
      fetchUser
    }
    
}
