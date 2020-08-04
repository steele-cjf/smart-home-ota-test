import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHouseDetail} from '../../../store/house/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    houseDetail: state.houseDetail
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({getHouseDetail}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
