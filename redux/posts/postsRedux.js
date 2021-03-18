import axios from 'axios'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';

        
const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
const FETCH_MORE_POSTS = 'FETCH_MORE_POSTS';   
const FETCH_HOTRELOAD_POSTS = 'FETCH_HOTRELOAD_POSTS';
         
       
const initialState = {
    loading: true,
    postsItems: [], 
    errors: "" 
} 

export const fetchPostsRequest = () => {   
    return {
        type: FETCH_POSTS_REQUEST
    } 
} 

export const fetchPostsSuccess = postsData => {
    return{ 
        type: FETCH_POSTS_SUCCESS,     
        payload: postsData 
    }  
}     

export const fetchMorePosts = postsData => {
    return {
        type: FETCH_MORE_POSTS,
        payload: postsData 
    }
}

export const fetchHotReloadPosts = postsData => {
    return {
        type: FETCH_HOTRELOAD_POSTS,
        payload: postsData
    }
}

export const fetchPostsFailure = errors => {
    return{
        type: FETCH_POSTS_FAILURE,
        payload: errors
    }
}
      
export  const fetchPosts = (token) => {
    return dispatch => {
        dispatch(fetchPostsRequest())
        axios.get(`${APIROOTURL}/api/posts/?page=1`, {
        headers: {
            'Authorization': `Token ${token}`
        }  
        })  
        .then(resData => {
            const postsData = resData.data.results;
            dispatch(fetchPostsSuccess(postsData))
        })
        .catch(error => {
            const errors = "OOPs, Something went very wrong"
        dispatch(fetchPostsFailure(errors))
        }) 
    }    
}  
 
export const hotReloadPosts = (token) => {
    return dispatch => {
        axios.get(`${APIROOTURL}/api/posts/?page=1`, {
        headers: {
            'Authorization': `Token ${token}`    
        }  
        })    
        .then(resData => {
            const postsData = resData.data.results;
            dispatch(fetchPostsSuccess(postsData))
         }) 
        .catch(error => {
            const errors = "OOPs, Something went very wrong"
        dispatch(fetchPostsFailure(errors))
        })
    }
}

export const fetchLoadMorePosts = (token, nextUrl)  => {
    return dispatch => {
        axios.get(`${nextUrl}`, {
            headers: {
              'Authorization': `Token ${token}`
            }
          })
            .then(res => {
                const postsData = resData.data.results;
                dispatch(fetchPostsSuccess(postsData))
            })
            .catch(err => {
            console.log(err);
            })
    } 
}
 

const postReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_POSTS_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case FETCH_POSTS_SUCCESS:
            return{
                ...state,
                loading: false,
                postsItems: action.payload,
                errors: ''
            }
        case FETCH_MORE_POSTS:
            return {
                ...state,
                loading: false,
                postsItems: action.payload,
                errors: ""
            }
            case FETCH_HOTRELOAD_POSTS:
                return {
                    ...state,
                    loading: false,
                    postsItems: action.payload,
                    errors: ""
                }      
        case FETCH_POSTS_FAILURE:    
            return{     
                ...state,  
                loading: false,  
                postsItems: [], 
                errors: action.payload
            } 
        default:      
            return state 
    } 
}  
          
export default postReducer
