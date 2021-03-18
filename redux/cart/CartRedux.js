import axios from 'axios';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'

// These are the cart action Types
const FETCH_CART_REQUEST = 'FETCH_CART_REQUEST';
const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const CART_ITEM_DETAILS = 'CART_ITEM_DETAILS';
const CHECK_ITEM_IN_CART = 'CHECK_ITEM_IN_CART';

// This is the cart initial state
const initialState = {
    loading: true,
    cartItems: [],
    errors: "",
    inCart: false,
}

// These are the cart actions (functions)
export const fetchCartRequest = () => {
    return{
        type: FETCH_CART_REQUEST
    }
}

export const fetchCartSuccess = cartData => {
    return{
        type: FETCH_CART_SUCCESS,
        payload: cartData
    }
}

export const addItemToCart = id => {
    return{
        type: ADD_ITEM_TO_CART,
        payload: id
    }
}

export const removeCartItem = id => {
    return{
        type: REMOVE_CART_ITEM,
        payload: id
    }
}

export const checkItemInCart = (id) => {
    return{
        type: CHECK_ITEM_IN_CART,
        payload: id
    }
}

export const fetchCartFailure = errors => {
    return{
        type: FETCH_CART_FAILURE,
        payload: errors,
    }
}

export const fetchCheckItemInCart = id => {
    return dispatch => {
        if(state.cartItems.id.includes(id) === true)
            return true
        else
            return false
    }
}
   
export const fetchCartItemDetails = (token, id) => {
    return dispatch => {
        axios.get(`${APIROOTURL}/api/cart_item/${id}/details/`,{
            headers: {
                'Authorization': `Token ${token}`
              }
        })
            .then(res => {
                const cartData = res.data
                dispatch(fetchCartSuccess(cartData))
            })
            .catch(err => {
                dispatch(fetchCartFailure(err))
            })
    }   
}  
   
export const fetchCartData = token =>  {
    return dispatch => {
        dispatch(fetchCartRequest())
        axios.get(`${APIROOTURL}/api/my_cart/`,{
            headers: {
                'Authorization': `Token ${token}`
              }
        })
            .then(res => {
                const cartData = res.data.results[0]
                dispatch(fetchCartSuccess(cartData))
            })
            .catch(err => {
                dispatch(fetchCartFailure(err))
            })
    }
}


export const fetchCartItemRemove = (token, id) => {
    return dispatch => {
        dispatch(removeCartItem(id))
        axios.get(`${APIROOTURL}/api/remove_from_cart/${id}/`, {
            headers: {
              'Authorization': `Token ${token}`, 
            }
          })
          .then(res => {
            dispatch(fetchCartData(token))
          }) 
          .catch(err => {
            dispatch(fetchCartFailure(err))
          }) 
    } 
} 

export const fetchCartItemRemoveNoRefresh = (token, id) => {
    return dispatch => {
        dispatch(removeCartItem(id))
        axios.get(`${APIROOTURL}/api/remove_from_cart/${id}/`, {
            headers: {
              'Authorization': `Token ${token}`, 
            }
          })
          .then(res => {
            dispatch(fetchCartData(token))
          }) 
          .catch(err => {
            dispatch(fetchCartFailure(err))
          }) 
        //   dispatch(fetchCartData(token))
    } 
} 
 
export const fetchaddItemToCart = (token, id) => {
    return dispatch => {
        dispatch(addItemToCart(id))
        axios.get(`${APIROOTURL}/api/add_to_cart/${id}/`, {
            headers: {
              'Authorization': `Token ${token}`,
            }
          })
          .then(res => {
                // const cartID = res.data.id
                dispatch(fetchCartData(token))
                // return cartID
          })
          .catch(err => {
            dispatch(fetchCartFailure(err))
          }) 
    }
}

// This is the cart reducer
const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_CART_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FETCH_CART_SUCCESS:
            return{
                ...state,
                loading: false,
                cartItems: action.payload,
                errors: ''
            } 
        case ADD_ITEM_TO_CART:
            return{
                ...state, 
                loading: false,
            }
        case CART_ITEM_DETAILS:
            return{ 
                ...state, 
                cartItems: action.payload,
                errors: ''
            }
        case REMOVE_CART_ITEM:
            return{
                ...state,
                loading: false,
            }
            case  CHECK_ITEM_IN_CART:
                return{
                    ...state,
                    inCart: true
                }
        case FETCH_CART_FAILURE:
            return{
                ...state,
                loading: false,
                cartItems: [],
                errors: action.payload
            }
        default:
            return state
    }
}

export default cartReducer