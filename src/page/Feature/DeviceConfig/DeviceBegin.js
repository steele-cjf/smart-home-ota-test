import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderCommon from '../../Component/HeaderCommon'
import { AppRoute } from '../../../navigator/AppRoutes';

export default DeviceBeginPage = (props) => {

  return (
    <View style={{flex: 1,}}> 
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '启动设备配网'
        }}
      />
      <View style={{backgroundColor: 'blue' ,height: 200,}}> 
      </View>
      <Text style={{marginTop: 20,}}>确定已执行以上操作</Text>
      <TouchableOpacity style={{marginTop: 20}} onPress={() => {}}> 
        <Text style={{backgroundColor: 'yellow', height: 50, textAlign: 'center'}}>开始配网</Text>
      </TouchableOpacity>
    </View>
  );
}