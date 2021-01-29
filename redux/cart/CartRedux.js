import axios from 'axios';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'

// These are the cart action Types
const FETCH_CART_REQUEST = 'FETCH_CART_REQUEST';
const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const CART_ITEM_DETAILS = 'CART_ITEM_DETAILS';

// This is the cart initial state
const initialState = {
    loading: true,
    cartItems: [],
    errors: ""
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

export const checkItemInCart = cartData => {
    return{
        type: CART_ITEM_DETAILS,
        payload: cartData
    }
}

export const fetchCartFailure = errors => {
    return{
        type: FETCH_CART_FAILURE,
        payload: errors,
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

export const fetchCartData = token => {
    return dispatch => {
        dispatch(fetchCartRequest())
        axios.get(`${APIROOTURL}/api/my_cart/`,{
            headers: {
                'Authorization': `Token ${token}`
              }
        })
            .then(res => {
                const cartData = res.data.results
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
        axios.delete(`${APIROOTURL}/api/cart_item/${id}/remove/`, {
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

export const fetchaddItemToCart = (token, id) => {
    return dispatch => {
        dispatch(addItemToCart(id))
        axios.post(`${APIROOTURL}/api/add_to_cart/`, id, {
            headers: {
              'Authorization': `Token ${token}`,
              data: id,
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