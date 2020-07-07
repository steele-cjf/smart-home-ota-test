import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {userToken} from './login/index'

const allReducers= combineReducers({
  userToken
});
const store = createStore(allReducers, applyMiddleware (thunk));
export default store;
