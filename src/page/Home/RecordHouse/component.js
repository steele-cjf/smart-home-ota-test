import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Input, Text} from 'react-native-elements';
import ImageUpload from '../../Component/imageUpload';

function RecordHouse(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>房源资料</Text>
        <Input label="所在地区" placeholder="请选择地址" />
        <Input label="详细地址" placeholder="街道、小区、楼与门牌号" />
        <Input label="房屋所有者" placeholder="" />
        <Text style={styles.title}>房产证照片</Text>
        <ImageUpload />
        <Text style={styles.title}>建筑信息</Text>
        <Input label="建筑面积" placeholder="㎡" />
        <Input label="楼层" placeholder="街道、小区、楼与门牌号" />
        <Input label="户型" placeholder="几室几厅几卫" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
  },
});
export default RecordHouse;
