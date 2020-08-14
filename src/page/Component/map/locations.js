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
                return (<Entypo name='location-pin' style={{ color: 'blue', fontSize: 20 }}></Entypo>)
            }}
            title={center.name}
            coordinate={{
                latitude: center.lat,
                longitude: center.lng
            }}
        />)
        return result
    }
    return (
        <MapView style={{ flex: 1 }} zoomLevel={6} center={{
            latitude: center.lat,
            longitude: center.lng
        }}>
            {renderMarker()}
        </MapView >
    );
}

const styles = StyleSheet.create({
})
export default LoactionMap;
