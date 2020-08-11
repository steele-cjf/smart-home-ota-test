import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWebSocketInfo } from '../../store/common/index';
import WS from 'react-native-websocket'

function WebsocketComponent(props) {
    const wsRef = useRef(null)
    return (
        <WS
            ref={wsRef}
            url="wss://echo.websocket.org/"
            onOpen={() => {
                setWebSocketInfo('1111111')
                console.log('Open!')
            }}
            onMessage={() => console.log(11)}
            onError={() => console.log(22)}
            onClose={() => console.log(33)}
            reconnect // Will try to reconnect onClose
        />
    );
}

// reducer获取
function mapStateToProps(state) {
    return {
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ setWebSocketInfo }, dispatch);
}
export default connect(
    mapStateToProps,
    matchDispatchToProps,
)(WebsocketComponent);