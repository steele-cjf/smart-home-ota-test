import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTenantHouseList} from '../../../store/house/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    houseDetail: state.houseDetail,
    dictionaryMappings: state.dictionaryMappings,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({getTenantHouseList}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
