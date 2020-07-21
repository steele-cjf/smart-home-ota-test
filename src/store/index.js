import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {userInfo, verfityResult} from './home/index';
const allReducers = combineReducers({
  userInfo,
  verfityResult
});
const store = createStore(allReducers, applyMiddleware(thunk));
export default store;
