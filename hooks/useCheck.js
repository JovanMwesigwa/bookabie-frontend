import React from 'react'
import axios from 'axios'

import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'

const useCheck = (token, url) => {

    const [ approved, setApproved ] = React.useState(false);

    const request = async() => {
        await axios.get(`${APIROOTURL}/${url}/`, {
          headers: {
            'Authorization': `Token ${token}`, 
          }
        }).then(res => {
          setApproved(res.data)
        }).catch(err => {
          console.log(err)
        })
      }

      React.useEffect(() => {
        request()
      },[])

      return { request, approved, setApproved}
}

export default useCheck