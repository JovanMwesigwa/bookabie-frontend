import axios from 'axios'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';


// ACTION TYPES
const FETCH_OTHER_USER_PROFILE_REQUEST = 'FETCH_OTHER_USER_PROFILE_REQUEST'
const FETCH_OTHER_USER_PROFILE_SUCCESS = 'FETCH_OTHER_USER_PROFILE_SUCCESS'
const FETCH_OTHER_USER_PROFILE_FAILURE = 'FETCH_OTHER_USER_PROFILE_FAILURE'

// Action Methods
const fetchOtherUserProfileRequest = () => {
    return {
        type: FETCH_OTHER_USER_PROFILE_REQUEST,
    }
}

const fetchOtherUserProfileSuccess = (profileData) => {
    return {
        type: FETCH_OTHER_USER_PROFILE_SUCCESS,
        payload: profileData
    }
}

const fetchOtherUserProfileFailure = (errors) => {
    return {
        type: FETCH_OTHER_USER_PROFILE_FAILURE,
        payload: errors
    }
}

export const fetchOtherUserProfile = (token, ID) => {
    return dispatch => {
        dispatch(fetchOtherUserProfileRequest())
        axios.get(`${APIROOTURL}/api/profile/${ID}/detail/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
            }) 
            .then(resData => {
                const result = resData.data;
                dispatch(fetchOtherUserProfileSuccess(result))
            })
            .catch(error => {
                const errors = "OOPs!, Something went very wrong"
            dispatch(fetchOtherUserProfileFailure(errors))
            })
    }
}

// Initial State
const initialState = {
    loading: true,
    profile: {},
    errors: ""
}


// Reducer
const otherUserProfileReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_OTHER_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_OTHER_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.payload,
                error: ""
            }
        case FETCH_OTHER_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                profile: {},
                errors: action.payload
            }
        default:
            return state;
    }
}

export default otherUserProfileReducer;