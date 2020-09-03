import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getUserInfo } from '../../store/home/index';

import Component from './component';
import {setCodeInfo, setDictionaryMappings} from '../../store/common/index';
import * as LoginAction from '../../store/login/index';
// reducer获取
function mapStateToProps(state) {
  return {
    // userInfo: state.userInfo,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({...LoginAction, setCodeInfo, setDictionaryMappings, getUserInfo}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
