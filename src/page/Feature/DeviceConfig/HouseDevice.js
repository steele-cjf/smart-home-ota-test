import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderCommon from '../../Component/HeaderCommon'
import { AppRoute } from '../../../navigator/AppRoutes';

export default HouseDevicePage = (props) => {

  return (
    <View style={{flex: 1,}}> 
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '门锁设备'
        }}
      />
      <Text>深圳市科技大厦501</Text>
      <TouchableOpacity style={{marginTop: 200}} onPress={() => { NavigatorService.navigate(AppRoute.SCANADDDEVICE); }}> 
        <Text style={{backgroundColor: 'yellow', height: 50, textAlign: 'center'}}>添加设备</Text>
      </TouchableOpacity>
    </View>
  );
}