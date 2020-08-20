import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSearchSummaries, getMarkerList } from '../../../store/map/index';
import Component from './component';
// reducer获取
function mapStateToProps(state) {
    return {};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getSearchSummaries, getMarkerList }, dispatch);
}
export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Component);
