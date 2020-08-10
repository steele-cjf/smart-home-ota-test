/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base'
import { useNavigationState } from '@react-navigation/native'
import { MapView } from "react-native-amap3d";
function MapHouse(props) {
  useNavigationState(state => {
    console.log(99999, state.routes)
    return state.index
  });

  return (
    <View style={{flex: 1}}>
      <MapView>
        <MapView.Marker
          coordinate={{
            latitude: 39.91095,
            longitude: 116.37296
          }}
        />
      </MapView>
    </View>
  );
}

export default MapHouse;
