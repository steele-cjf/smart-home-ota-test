import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWebSocketInfo } from '../../store/common/index';
import { View, Text, Button } from 'native-base'

function WebsocketComponent(props) {
    const wsRef = useRef(null)
    useEffect(() => {
        if (props.id) {
            let { id } = props
            let url = "ws://10.10.11.244:9700/websocket/" + id
            console.log('userId:' + id + ', url: ' + url)
            var ws = new WebSocket(url);
            ws.onopen = () => onopen()
            ws.onmessage = (evt) => onMessage(evt)
            ws.onclose = () => onClose()
        }
    }, [props.id])
    const onMessage = (res) => {
        console.log('setWebSocketInfo', res.data)
        props.setWebSocketInfo(res.data)
    }
    const onopen = () => {
        console.log('setWebSocket 建立连接')
    }
    const onClose = () => {
        console.log('WebSocket 关闭连接!')
    }
    return (
        <View></View>
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