import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getUserInfo, verifyIdCard } from '../../../store/home/index';
import {getManualAuditInfo} from '../../../store/user/index';

import Component from './component';

// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getUserInfo, verifyIdCard, getManualAuditInfo}, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
