import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { AuthContext } from '../../context/authentication/Context'
export const UserInfoContext = createContext();

const UserInfoContextProvider = (props) => {

    const [ userInfo, setUserInfo ] = useState({});

    const [ userProfile, setUserProfile ] = useState({});

    const { authState } = useContext(AuthContext);

    const token = authState.token

    useEffect(() => {
        const fetchUserData = async() => {
            await axios.get(`${APIROOTURL}/api/userprofile/user/detail/`,{
                headers: {
                    'Authorization': `Token ${token}`
                  }
            })
                .then(res => {
                    // console.log(res.data);
                    setUserInfo(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        fetchUserData();
    },[token])

    // console.log(userInfo);
 return(
    <UserInfoContext.Provider value={{userInfo}}>
        {props.children}
    </UserInfoContext.Provider>
  )
}


export default UserInfoContextProvider