import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHouseDetail} from '../../../store/house/index';
import { openCamera } from '../../../store/common/index'

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    cameraOpt: state.cameraOpt,
    houseDetail: state.houseDetail,
    scanTenant: state.scanTenant
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({getHouseDetail, openCamera}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
