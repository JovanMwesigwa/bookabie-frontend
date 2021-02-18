import React from 'react'
import axios from 'axios'

import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'


export default useGetApiCall = (type, token, endUrl) => {
    const [ data, setData ] = React.useState([])


    const axiosGetAPI = () => {
        axios.type(`${APIROOTURL}/${endUrl}`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        })
        .then(resData => {
          setData(resData.data)
        })
        .catch(error => {
          console.log(error)
        })
      }
      return {
          axiosGetAPI, data
      }
}