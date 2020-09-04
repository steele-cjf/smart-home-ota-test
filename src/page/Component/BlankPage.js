
import React, {useState} from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

export default function BlankPage(props) {
  const img = require('../../assets/images/error.png')
  const {errorMsg} = props;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image source={img}></Image>
      <Text style={{color: '#7C7C7C', fontSize: 14, marginTop: 16}}>{errorMsg}</Text>
    </View>
  )
}