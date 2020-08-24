import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getHouseDetail } from '../../../store/house/index';
import { openCamera } from '../../../store/common/index'
import { getRoomList } from '../../../store/feature/index'
import { addTenantForm, addFamilyForm, scanAddTenant } from '../../../store/tenant/index'
import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    cameraOpt: state.cameraOpt,
    houseDetail: state.houseDetail,
    scanTenant: state.scanTenant,
    roomList: state.roomList,
    codeInfo: state.codeInfo
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ 
    getHouseDetail, 
    openCamera, 
    getRoomList, 
    addTenantForm, 
    addFamilyForm,
    scanAddTenant }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
