import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHouseDetail, deleteHouse, getHouseTenantList, checkHouseIsEmpty} from '../../../store/house/index';
import {getRoomList} from '../../../store/feature/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {};
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {getHouseDetail, deleteHouse, getRoomList, getHouseTenantList, checkHouseIsEmpty},
    dispatch,
  );
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
