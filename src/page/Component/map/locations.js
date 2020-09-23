/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { Button } from 'native-base'
import { MapView } from "react-native-amap3d";
import Entypo from 'react-native-vector-icons/Entypo'

function LoactionMap(props) {
    const [center, setCenter] = useState({})
    // 安卓scrollview包含地图控件，上下滑动的时候手势冲突
    const _gestureHandlers = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        })
    useEffect(() => {
        setCenter(props.loc)
    }, [props])
    const renderMarker = () => {
        let result = (<MapView.Marker
            icon={() => {
                return (<Entypo name='location-pin' style={{ color: 'blue', fontSize: $screen.scaleSize(30) }}></Entypo>)
            }}
            clickDisabled={true}
            coordinate={{
                latitude: center.latitude || 0,
                longitude: center.longitude || 0
            }}
        />)
        return result
    }
    return (
        <MapView style={{ flex: 1 }} zoomLevel={10} {..._gestureHandlers.panHandlers} rotateEnabled={false} center={{
            latitude: center.latitude || 0,
            longitude: center.longitude || 0
        }}>
            {renderMarker()}
        </MapView >
    );
}

const styles = StyleSheet.create({
})
export default LoactionMap;
