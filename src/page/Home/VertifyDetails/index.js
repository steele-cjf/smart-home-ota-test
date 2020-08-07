import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getManualAuditInfo } from '../../../store/user/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({getManualAuditInfo}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Component);