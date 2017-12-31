import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);
export default createStore(rootReducer, middleware);