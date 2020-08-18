import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {publishHouse} from '../../../store/feature/index';
import { getPublishHouseDetail, updatePublishInfo } from '../../../store/publish/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    roomList: state.roomList,
    codeInfo: state.codeInfo,
    dictionaryMappings: state.dictionaryMappings,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({publishHouse, getPublishHouseDetail, updatePublishInfo}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
