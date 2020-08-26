/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, ViewComponent } from 'react-native';
import { Button, Text } from 'react-native-elements';
import HouseListComponent from '../../Component/housingList/list';
import SearchHeader from '../Component/searchHeader'
import { useFocusEffect } from '@react-navigation/native';
import DropdownMenu from '../../Component/housingList/filter';

function HouseList(props) {
  const data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Rubyfdfdfdd"], ["Swift", "Objective-C"]];
  const data22 = [{type: 'text', value: '位置', key: 'location'}, {type: 'text', value: '方式/户型', key: 'houseType'}, {type: 'text', value: '租金', key: 'rent'}, {type: 'icon', value: 'filter', key: 'filter'}];
  const [houseList, setHouseList] = useState()
  useFocusEffect(useCallback(() => {
    // props.getHousingList({ pageNum: 1 }, async (res) => {
    //   console.log(9999, res.data)
    //   setHouseList(res.data)
    // });
    fetchHouseList()
  }, [props.route]))

  const fetchHouseList = (pageNum = 1) => {
    console.log('test22');
    props.getHousingList({ pageNum: pageNum }, (res) => {
      setHouseList(res.data)
    });
  }
  
  const getFilter = (sec, row) => {
    console.log(sec, row);
  }
  return (
    <View style={styles.container}>
      <SearchHeader />
      <DropdownMenu
        bgColor={'white'}
        tintColor={'#282828'}
        activityTintColor={'#5C8BFF'}
        handler={(selection, row) => getFilter(selection, row)}
        data={data22}
      >
        <HouseListComponent list={houseList} handlerHouseList={(page) => fetchHouseList(page)} />
      </DropdownMenu>
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
