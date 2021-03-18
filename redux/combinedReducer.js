import { combineReducers} from 'redux'
import authReducer from './auth/authRedux'
import cartReducer from './cart/CartRedux';
import otherUserProfileReducer from './otherUserProfile/otherUserprofilerRedux';
import postReducer from './posts/postsRedux'
import profileReducer from './userProfile/userProfileRedux'

const combinedReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    posts: postReducer,
    userProfile: profileReducer,
    otherUserProfile: otherUserProfileReducer,
});

export default combinedReducer;