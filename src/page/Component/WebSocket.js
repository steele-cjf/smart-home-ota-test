import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWebSocketInfo } from '../../store/common/index';
import { View, Text } from 'native-base'
import WS from 'react-native-websocket'

function WebsocketComponent(props) {
    const wsRef = useRef(null)
    const [url, setUrl] = useState('')

    useEffect(() => {
        if (props.id) {
            let { id } = props
            console.log(2222, id)
            setUrl("http://10.10.11.244:9760/websocket/" + id)
        }
    }, [props.id])
    const onMessage = (data) => {
        console.log('setWebSocketInfo', data)
        setWebSocketInfo(data)
    }
    return (
        <View>
            {
                url ?
                    <WS
                        ref={wsRef}
                        url={url}
                        onOpen={() => {
                            console.log('WebSocket 建立连接!')
                        }}
                        onMessage={(data) => onMessage(data)}
                        onError={() => console.log(22555)}
                        onClose={() => console.log(33)}
                        reconnect // Will try to reconnect onClose
                    /> : null
            }
        </View>

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