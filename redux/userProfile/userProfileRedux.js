import axios from 'axios'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';

// Actions
const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';
const REFRESHFETCHUSERPROFILE = 'REFRESHFETCHUSERPROFILE';

// Action types
export const fetchUserProfileRequest = () => {
    return {
        type: FETCH_USER_PROFILE_REQUEST
    }
}

export const fetchUserProfileSuccess = profileData => {
    return {
        type: FETCH_USER_PROFILE_SUCCESS,
        payload: profileData
    }
}

export const fetchUserProfileFailure = errors => {
    return {
        type: FETCH_USER_PROFILE_FAILURE,
        payload: errors
    }
}

export const refreshFetchUserProfile = () => {
    return {
        type: REFRESHFETCHUSERPROFILE
    }
}

export const fetchUserProfile = (token) => {
    return dispatch => {
        dispatch(fetchUserProfileRequest())
        axios.get(`${APIROOTURL}/api/userprofile/user/detail/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
            }) 
            .then(resData => {
                const result = resData.data;
                dispatch(fetchUserProfileSuccess(result))
            })
            .catch(error => {
                const errors = "OOPs, Something went very wrong"
            dispatch(fetchUserProfileFailure(errors))
            })
    }
}

export const refreshFetchUser = (token) => {
    return dispatch => {
        dispatch(fetchUserProfile(token))
    }
}

// state
export const initialState = {
    loading: true,
    profile: {},
    error: ""
}

// reducer
const profileReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_PROFILE_SUCCESS:
            return {
                loading: false,
                profile: action.payload,
                error: ""
            }
        case FETCH_USER_PROFILE_FAILURE:
            return {
                loading: false,
                profile: {},
                error: action.payload
            }
        case REFRESHFETCHUSERPROFILE:
            return {
                ...state,
            }
        default:
            return state
    }
}

export default profileReducer;
