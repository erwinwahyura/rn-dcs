import { combineReducers } from 'redux';
import navReducers from './navReducers';
import dataReducers from './dataReducers';

export default combineReducers({ 
    navReducers: navReducers,
    dataReducers: dataReducers,
});