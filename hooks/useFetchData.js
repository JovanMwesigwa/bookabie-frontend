import React from 'react'
import axios from 'axios'

import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'


export default useFetchData = (token, url) => {

    const [ loading, setLoading ] = React.useState(true);
    const [ data, setData ] = React.useState([])
    const [ errors, setErrors ] = React.useState("")

    const request = async() => {
        await axios.get(`${APIROOTURL}/${url}`, {
            headers: {
              'Authorization': `Token ${token}`
            }
          })
          .then(res => {
            setData(res.data)
            setLoading(false)
          })
          .catch(err => {
            setLoading(false)
            setErrors("OOPs!, an error occured.")
          })
      }

      return {
          request,
          loading,
          data,
          errors
      }

}