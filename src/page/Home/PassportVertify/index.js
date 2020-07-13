import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
  };
}
// function matchDispatchToProps(dispatch) {
//   return bindActionCreators(LoginAction, dispatch);
// }
export default connect(
  mapStateToProps,
  null,
)(Component);
