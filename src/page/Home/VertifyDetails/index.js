import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getManualAuditInfo, deleteTenant } from '../../../store/user/index';
import Component from './component';

// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    dictionaryMappings: state.dictionaryMappings
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getManualAuditInfo, deleteTenant}, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Component);