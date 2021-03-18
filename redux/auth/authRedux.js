import axios from 'axios';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import AsyncStorage from '@react-native-community/async-storage';


// These are the action types
const RETRIEVE_TOKEN = 'RETRIEVE_TOKEN';
const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
  
// This is the initialState
const initialState = {
    loading: true,
    token: null,
    username: null
}

// These are the Actions 
export const retrieveToken = token => {
    // This endpoint gets the token stored in the async storage 
    return{
        type: RETRIEVE_TOKEN,
        payload: token
    }
}

export const register = user_id => {
    return{
        type: REGISTER,
        payload: user_id
    }
}

export const login = token => {
    return{
        type: LOGIN,
        payload: token
    }
}

export const logout = () => {
    return{ 
        type: LOGOUT,
    }
}

export const signUp = (username, email, password, goToLogin) => {
    return dispatch => {
        // This endpoint will be called in the Register screen.
        axios.post(`${APIROOTURL}/api/auth/users/`, {
                email: email,
                username: username,
                password: password,
                re_password: password
            })
            .then(res => {
                let user_id = res.data
                dispatch(register(user_id));
                goToLogin()
            })
        .catch(error => {
            console.log(error);
        }) 
    }
}

export const signIn = (email, passwordText) => {
    return dispatch => {
        axios.post(`${APIROOTURL}/api/auth/token/login/`, {
            username: email,
            password: passwordText
            })
        .then(response => {
            let token = response.data.auth_token
            const save = async() => {
                try {
                    await AsyncStorage.setItem("Token", token)
                } catch (error) {
                    console.log(error);
                }
            }
            save();
            dispatch(login(token));
            })
            .catch (error => {
                console.log(error);
            }) 
    }
}


export const signOut = (token) => {
    return dispatch => {
        dispatch(logout())
        const remove = async() => {
            try {
                await AsyncStorage.removeItem("Token")
            } catch (error) {
                console.log("An error occurred when logging you out")
            }
        }
        remove();
        axios.post(`${APIROOTURL}/api/auth/token/logout/`,{
            headers: {
              'Authorization': `Token ${token}`
            }
          }) 
        .then(response => {
            })
            .catch (error => {
                console.log(error);
            }) 
             
    }
}

export const load = () => {
    return async(dispatch) => {
        // This load function will be called in the Feed UseEffect() on load 
        // It is supposed to retrieve the token stored in the store.
        try {
            let token = await AsyncStorage.getItem("Token")
            if(token !== null){
                dispatch(retrieveToken(token))
            }
        } catch (error) {
            console.log(error);
        } 
    }
}
 
export const logoutHandler = () => {
    return async(dispatch) => {
        try {
            await AsyncStorage.removeItem("Token")
            dispatch(logout())
        } catch (error) {
            console.log("An error occurred when logging you out")
        }
    }
}

// authReducer
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case RETRIEVE_TOKEN:
            return{
                ...state,
                loading: false,
                token: action.payload,
                username: null
            }
        case REGISTER:
            return{
                ...state,
                loading: false,
                username: action.payload,
                token: null
            }
        case LOGIN:
            return{
                ...state,
                loading: false,
                username: null,
                token: action.payload
            }
        case LOGOUT:
            return{
                ...state,
                loading: false,
                username: null,
                token: null
            }
        default:
            return state
    }
}

// setTimeout(() => {
//     load()  
// }, 5000);



export default authReducer;