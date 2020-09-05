import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {userInfo} from './home/index';
import {houseDetail} from './house/index';
import {myHouseList} from './home/index';
import {
  cameraOpt,
  webSocketInfo,
  codeInfo,
  dictionaryMappings,
  homeHouse,
  featureHouse
} from './common/index';
import {roomList} from './feature/index';
const allReducers = combineReducers({
  userInfo,
  houseDetail,
  cameraOpt,
  roomList,
  myHouseList,
  webSocketInfo,
  codeInfo,
  dictionaryMappings,
  homeHouse,
  featureHouse
});
const store = createStore(allReducers, applyMiddleware(thunk));
export default store;
