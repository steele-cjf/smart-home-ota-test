import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getMyPublishList, offShelf, republish} from '../../../store/home/index';

import Component from './component';
// reducer获取
function mapStateToProps(state) {
  return {
    houseDetail: state.houseDetail,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({getMyPublishList, offShelf, republish}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Component);
