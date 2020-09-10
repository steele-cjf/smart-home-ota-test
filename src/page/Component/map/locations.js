/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'native-base'
import { MapView } from "react-native-amap3d";
import Entypo from 'react-native-vector-icons/Entypo'

function LoactionMap(props) {
    const [center, setCenter] = useState({})
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
        <MapView style={{ flex: 1 }} zoomLevel={10} rotateEnabled={false} center={{
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
