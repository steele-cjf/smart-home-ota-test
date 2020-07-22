import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addHouse} from '../../../store/home/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {};
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({addHouse}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
