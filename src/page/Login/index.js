import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './component'
import { getUserToken } from '../../store/login/index';

// reducer获取
function mapStateToProps(state){
  return {
    userToken: state.userToken
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getUserToken }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Component);