import React, { useState, createContext, useReducer, useMemo } from 'react'


export const UserAuthentication  = createContext();

const UserAuthenticationProvider = (props) => {
    const [ isAuth, setIsAuth ] = useState(false);

 return(
    <UserAuthentication.Provider value={{ isAuth }}>
        {props.children}
    </UserAuthentication.Provider>
  )
}
export default UserAuthenticationProvider;