import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderCommon from '../../Component/HeaderCommon'
import { AppRoute } from '../../../navigator/AppRoutes';

export default ScanAddDevicePage = (props) => {

  return (
    <View style={{flex: 1,}}> 
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '扫一扫绑定设备'
        }}
      />
      <Text style={{marginTop: 200,}}>扫一扫确定网关类型</Text>
      <TouchableOpacity style={{marginTop: 20, alignItems: 'center'}} onPress={() => {}}> 
        <Text style={{backgroundColor: 'red', height: 50, textAlign: 'center'}}>扫一扫/重新扫描</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 20, alignItems: 'center'}} onPress={() => { NavigatorService.navigate(AppRoute.DEVICEBEGIN); }}> 
        <Text style={{backgroundColor: 'yellow', height: 50, textAlign: 'center'}}>直接进入：设备配网</Text>
      </TouchableOpacity>
    </View>
  );
}