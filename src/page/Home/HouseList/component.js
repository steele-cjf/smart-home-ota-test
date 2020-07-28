/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-elements';
import HouseListComponent from '../../Component/housingList/list';

function HouseList(props) {
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
      <HouseListComponent nav={props.navigation} />
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
    color: '#0d86ff',
  },
  title: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
  },
});
export default HouseList;
