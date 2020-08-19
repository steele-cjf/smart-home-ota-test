import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHouseCollectionList} from '../../../store/house/index';
import {publishSetCollection} from '../../../store/publish/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    dictionaryMappings: state.dictionaryMappings
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({getHouseCollectionList, publishSetCollection}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
