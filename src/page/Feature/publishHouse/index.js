import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {publishHouse} from '../../../store/feature/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    roomList: state.roomList,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({publishHouse}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
