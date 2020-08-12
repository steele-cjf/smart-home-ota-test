import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWebSocketInfo } from '../../store/common/index';
import { View, Text } from 'native-base'
import WS from 'react-native-websocket'
import * as sock from './socket/sockjs'
import * as st from './socket/stomp'

function WebsocketComponent(props) {
    const wsRef = useRef(null)
    var [stompClient] = useState(null)
    useEffect(() => {
        // var socket = new WebSocket("http://10.10.14.244:9700/app");
        // socket.onOpen= () => {
        //     console.log('连接成功')
        // }
        // socket.onMessage = () => {
        //     console.log('message')
        // }
        // socket.onclose = () => {
        //     console.log('close')
        // }
        // console.log(SockJS)
        // var socket = new SockJS("http://10.10.14.244:9700/websocket");
        // stompClient = Stomp.over(socket);
        // stompClient.connect({}, function (frame) {
        //     console.log('Connected:' + frame);
        //     //监听一个具有自己信息的对列（/toAll/id）
        //     //把用户名作为自己监听的消息队列标识
        //     stompClient.subscribe('/user/123/notice', function (response) {
        //         console.log('hello world')
        //     });
        // });

    }, [])
    return (
        <Text></Text>
        // <WS
        //     ref={wsRef}
        //     url="wss://10.10.11.244:9700/app/websocket"
        //     onOpen={() => {
        //         setWebSocketInfo('1111111')
        //         console.log('Open!')
        //     }}
        //     onMessage={() => console.log(11)}
        //     onError={() => console.log(22555)}
        //     onClose={() => console.log(33)}
        //     reconnect // Will try to reconnect onClose
        // />
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