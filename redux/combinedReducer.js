import { combineReducers} from 'redux'
import authReducer from './auth/authRedux'
import cartReducer from './cart/CartRedux';
import postReducer from './posts/postsRedux'

const combinedReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    posts: postReducer,
});

export default combinedReducer;