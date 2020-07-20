import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { verifyIdCard } from '../../../store/home/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({verifyIdCard}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Component);
