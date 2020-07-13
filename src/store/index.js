import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {userInfo} from './home/index';
const allReducers = combineReducers({
  userInfo,
});
const store = createStore(allReducers, applyMiddleware(thunk));
export default store;
