import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {userInfo, verfityResult} from './home/index';
import {houseDetail} from './house/index';
import {myHouseList} from './home/index';
import {cameraOpt} from './common/index';
import {roomList} from './feature/index';
const allReducers = combineReducers({
  userInfo,
  verfityResult,
  houseDetail,
  cameraOpt,
  roomList,
  myHouseList,
});
const store = createStore(allReducers, applyMiddleware(thunk));
export default store;
