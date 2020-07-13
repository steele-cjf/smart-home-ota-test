import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getUserInfo } from '../../../store/home/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfo }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
