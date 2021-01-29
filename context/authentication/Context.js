import React, { useState, useEffect, useContext, useMemo, useReducer, createContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import AsyncStorage from '@react-native-community/async-storage';



export  const AuthContext  = createContext();
// this is how i made the authentication 
// i created a useReducer to handle changes mainly focusing on the 
// 1 - loading
// 2 - username
// 3 - token
// The intialstate created handles the isLoading state that will display a loading screen
// when a token is null
 
const initialState = {
  isLoading: true,
  username: null,
  token: null
}

// The reducer will have the different case changes
const reducer = (prevState, action) => {
  switch(action.type){
    // This case is essntial to retrieve the token stored in the AsyncStorage, 
    //   sets the isLoading to false and disables the loading screen
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        isLoading: false,
        token: action.token
      }
    // This case will return the username when the user registers. Here i called it 'id',
    // I set the token to null because the backend api does not return a token key when just registering the user.
    // The token is only returned and created when a user is logging in.
    // So i set it to null just so i don't face weired bugs because its not my main interest
    case 'REGISTER':
      return {
        ...prevState,
        isLoading: false,
        username: action.id,
        token: null
      }
    // Here I set the isLoading to false, 
    // I returned the username again as 'id', that the user enters and the token that is created and recieved back to me by the backend.
    case 'LOGIN':
      return {
        ...prevState,
        isLoading: false,
        username: action.id,
        token: action.token
      }
    // Here am interested in killing the username and token. 
    case 'LOGOUT':
      return {
        ...prevState,
        isLoading: false,
        username: null,
        token: null
      }
    default:
      return state
  }
}

const AuthContextProvider = (props) => {

 const [ state, dispatch ] = useReducer(reducer, initialState);

//  This is the memorised functions that handle basic authentication changes 
// Remember that this authContext is passed down as useContext value to the Login, SignUp and Logout button on Line 164.
  const authContext = useMemo(() => ({
    // Username, email, password and the goToLogin function are passed as props from the signUp handleSubmit function. 
    // These props hold the text that the user enters from the inputs in the SignUp screen. 
    signUp: (username, email, password, goToLogin) => {
      // Here I made a post request to my backend, just to send the user's entered values so that he can be signed up,
      // With the appropreate fields. 
      axios.post(`${APIROOTURL}/api/auth/users/`, {
        email: email,
        username: username,
        password: password,
        re_password: password
      })
      .then(res => {
        // Here I dispatch the 'REGISTER' state function.
        dispatch({type: 'REGISTER', id: email})
      })
      .catch(err => {
        console.log(err);
      });
      // This function navigates the user to the login screen in order for them to login into their new account 
      goToLogin()
    },
    signIn: (email, passwordText) => {
      axios.post(`${APIROOTURL}/api/auth/token/login/`, {
        username: email,
        password: passwordText
      })
      .then( res => {
        // After logining in the user, a token is created and returned by my backend as auth_token and I stored it as token_
        let token_ = res.data.auth_token;
        // This is the save AsyncStorage function to store the token_
        const save = async () => {
          try {
            await AsyncStorage.setItem('token', token_)  
          } catch (e) {
            console.log(e);
          }
        }
        // After we call the save function, dispatch the 'LOGIN' state function and pass in the saved token_ 
        save()
        dispatch({type: 'LOGIN', id: email, token: token_ })
      })
      .catch(err => {
        console.log(err);
      });
    
    },
    signOut: () => {
        const remove = async() => {
          try {
            // Here is the AsyncStorage remove item function to remove the saved token since, 
            // a signout function kills the token 
            await AsyncStorage.removeItem('token')
          } catch (e) {
            console.log(e);
          }
        }
        remove()
        dispatch({type: 'LOGOUT' })
      }
  }),[])

  // Here is the load AsyncStorage load function to get the token that was saved in AsyncStorage
  const load = async() => {
    try {
      let token = await AsyncStorage.getItem('token')
      if (token !== null){
        dispatch({type: 'RETRIEVE_TOKEN', token: token })
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout( () => {
      load()
    },1000)
  },[])


// console.log(authContext.signIn);

const authState = state;

 return(

    <AuthContext.Provider value={{authContext, authState }}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider