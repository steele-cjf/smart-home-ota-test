/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, ViewComponent } from 'react-native';
import { Button, Text } from 'react-native-elements';
import HouseListComponent from '../../Component/housingList/list';
import SearchHeader from '../Component/searchHeader'
import { useFocusEffect } from '@react-navigation/native';
import ActionBar from '../../Component/actionBar'
function HouseList(props) {
  const [houseList, setHouseList] = useState()
  useFocusEffect(useCallback(() => {
    props.getHousingList({ pageNum: 1 }, async (res) => {
      // console.log(9999, res.data)
      setHouseList(res.data)
    });
  }, [props.route]))
  const [data] = useState([["第一项目项目项目", "第二项目", "1111111111"], ["第三项目", "第四项目", "22222222222222"]])
  return (
    <View style={styles.container}>
      <SearchHeader />
      <ActionBar
        bgColor={"white"}
        tintColor={"#000000"}
        activityTintColor={"#3BB4F2"}
        optionTextStyle={{ color: "#333333" }}
        titleStyle={{ color: '#3BB4F2' }}
        handler={(selection, row) => { console.log(9999) }}
        data={data}
      >
        <HouseListComponent list={houseList} />
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    flex: 1
  }
});
export default HouseList;
