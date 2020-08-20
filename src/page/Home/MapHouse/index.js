import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSearchSummaries } from '../../../store/map/index';
import { getHousingList } from '../../../store/home/index';
import Component from './component';
// reducer获取
function mapStateToProps(state) {
    return {};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getSearchSummaries, getHousingList }, dispatch);
}
export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Component);
