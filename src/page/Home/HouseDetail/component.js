/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-elements';
import HouseBaseInfo from '../../Component/houseBaseInfo';
import {AppRoute} from '../../../navigator/AppRoutes';

function HouseDetail(props) {
  const [houseInfo, setHouseInfo] = useState({
    status: '审核通过',
    rentStatus: '未出租',
    self: '本人',
    houseLayout: {},
    hasElevator: '电梯',
  });
  useEffect(() => {
    props.getHouseDetail('483710797791371264', res => {
      console.log('res', res);
      if (!res.code) {
        if (res.data) {
          setHouseInfo(res.data);
        }
      }
    });
  }, [props]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.bg_white, styles.padding]}>
          <HouseBaseInfo detail={houseInfo} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            marginTop: 15,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <View>
            <Text style={{fontSize: 16, color: '#666'}}>发布情况</Text>
          </View>
          <View>
            <Button
              type="clear"
              titleStyle={{fontSize: 16}}
              title={houseInfo.publishStatus}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 40,
          }}>
          <View>
            <Button
              title="住户"
              onPress={() => props.navigation.navigate(AppRoute.ADDTENANT)}
            />
          </View>
          <View>
            <Button
              title="发布"
              onPress={() => props.navigation.navigate(AppRoute.PUBLISH)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flex: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  padding: {
    padding: 10,
  },
  bg_white: {
    backgroundColor: '#fff',
  },
  item_content: {
    padding: 10,
    paddingTop: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text_style: {
    fontSize: 16,
    color: '#555',
  },
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  blue: {
    fontSize: 16,
    color: '#555',
    color: '#0d86ff',
  },
  title: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
  },
});
export default HouseDetail;
