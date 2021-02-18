import React from 'react'
import axios from 'axios'

import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'


export default useFetchTopProfilesApi = ( token ) => {

    const [ topProfiles, setTopProfiles ] = React.useState([]);

    const fetchTopProducts = () => {
        axios.get(`${APIROOTURL}/api/promoted_profiles/`,{
          headers: {
              'Authorization': `Token ${token}`
          }
      })
      .then(response => {
        setTopProfiles(response.data.results)
      })
      .catch(err => {
        console.log(err);
      })
      }

      React.useEffect(() => {
          fetchTopProducts()
      },[])

    return topProfiles
}
