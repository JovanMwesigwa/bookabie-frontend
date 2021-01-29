import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import combinedReducer from './combinedReducer';


// const store =  createStore(combinedReducer, compose(applyMiddleware(thunk)));
const store =  createStore(combinedReducer,applyMiddleware(thunk));


export default store;