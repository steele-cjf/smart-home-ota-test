import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getTenantList,
} from '../../../store/feature/index';
import { getHouseDetail } from '../../../store/house/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    dictionaryMappings: state.dictionaryMappings,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {getTenantList, getHouseDetail},
    dispatch,
  );
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
