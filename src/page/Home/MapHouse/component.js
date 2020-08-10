/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base'
import { useNavigationState } from '@react-navigation/native'

function MapHouse(props) {
  useNavigationState(state => {
    console.log(99999, state.routes)
    return state.index
  });

  return (
    <View>
      <Text>get map</Text>
      <Button onPress={() => {
        console.log(props.navigation.dangerouslyGetState().routes);
      }}><Text>get</Text></Button>
    </View>
  );
}

export default MapHouse;
