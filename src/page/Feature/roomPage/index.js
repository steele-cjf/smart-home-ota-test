import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  addRoom,
  getRoomList,
  updateRoomName,
  deleteRoom,
} from '../../../store/feature/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    roomList: state.roomList,
    houseDetail: state.houseDetail,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {addRoom, getRoomList, updateRoomName, deleteRoom},
    dispatch,
  );
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
