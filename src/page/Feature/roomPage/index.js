import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  addRoom,
  getRoomList,
  updateRoomName,
} from '../../../store/feature/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    roomList: state.roomList,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({addRoom, getRoomList, updateRoomName}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
