import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {userInfo} from './home/index';
import {houseDetail} from './house/index';
import {myHouseList} from './home/index';
import {
  cameraOpt,
  webSocketInfo,
  codeInfo,
  dictionaryMappings
} from './common/index';
import {roomList} from './feature/index';
import {publishHouseDetail} from './publish/index';
const allReducers = combineReducers({
  userInfo,
  houseDetail,
  cameraOpt,
  roomList,
  myHouseList,
  publishHouseDetail,
  webSocketInfo,
  codeInfo,
  dictionaryMappings
});
const store = createStore(allReducers, applyMiddleware(thunk));
export default store;
