import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPublishHouseDetail, publishSetCollection } from '../../../store/publish/index';



import Component from './component';
// reducer获取
function mapStateToProps(state) {
    return {
        publishHouseDetail: state.publishHouseDetail,
        dictionaryMappings: state.dictionaryMappings
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getPublishHouseDetail, publishSetCollection }, dispatch);
}
export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Component);
