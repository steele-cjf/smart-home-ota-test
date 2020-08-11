import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPublishHouseDetail } from '../../../store/publish/index';
import { setWebSocketInfo } from '../../../store/common/index';



import Component from './component';
// reducer获取
function mapStateToProps(state) {
    return {
        publishHouseDetail: state.publishHouseDetail
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({getPublishHouseDetail, setWebSocketInfo}, dispatch);
}
export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Component);
