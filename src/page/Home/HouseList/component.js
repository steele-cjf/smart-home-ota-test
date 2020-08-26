/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, ViewComponent } from 'react-native';
import { Spinner } from 'native-base';
import HouseListComponent from '../../Component/housingList/list';
import SearchHeader from '../Component/searchHeader'
import { useFocusEffect } from '@react-navigation/native';
import DropdownMenu from '../../Component/housingList/filter';

function HouseList(props) {
  const data = [{type: 'text', value: '位置', key: 'location'}, {type: 'text', value: '方式/户型', key: 'houseType'}, {type: 'text', value: '租金', key: 'rent'}, {type: 'icon', value: 'filter', key: 'filter'}];
  const filterParamsList = [
    [{distance: '1'}, {distance: '2'}, {distance: '3'}],
    [],
    [{priceHigh: null, priceLow: null}, {priceHigh: 1000, priceLow: 0}, {priceHigh: 2000, priceLow: 1000},{priceHigh: 3000, priceLow: 2000}, {priceHigh: 4000, priceLow: 3000}, {priceHigh: null, priceLow: 4000}],
    [{orderBy: 'newest'}, {orderBy: 'price_up'}, {orderBy: 'price_down'}]
  ]
  const [houseList, setHouseList] = useState()
  const [params, setParams] = useState({})
  const [loading, setLoading] = useState(false)

  useFocusEffect(useCallback(() => {
    fetchHouseList()
  }, [props.route]))

  const fetchHouseList = (pageNum = 1) => {
    setLoading(true)
    const data = {...params, ...{pageNum: pageNum}}
    console.log('data', data);
    props.getHousingList(data, (res) => {
      console.log('hose', res)
      setHouseList(res.data)
      setLoading(false)
    });
  }
  
  const getFilter = (sec, row) => {
    if (sec === 1) {
      return
    }
    const data = filterParamsList[sec][row]
    const newData = Object.assign(params, data)
    setParams(newData)
    fetchHouseList(1)
  }
  const getSection = (arr) => {
    console.log('arr', arr);
  }
  const getSearchParams = (item) => {
    console.log('item', item);
  }
  return (
    <View style={styles.container}>
      {/* {loading ? (
        <Spinner color="#5C8BFF" />
      ) : (
      <View style={styles.container}> */}
        <SearchHeader getSearchParams={(data) => getSearchParams(data)} />
        <DropdownMenu
          bgColor={'white'}
          tintColor={'#282828'}
          activityTintColor={'#5C8BFF'}
          handler={(selection, row) => getFilter(selection, row)}
          multipleSection={(arr) => getSection(arr)}
          data={data}
        >
          <HouseListComponent list={houseList} handlerHouseList={(page) => fetchHouseList(page)} />
        </DropdownMenu>
      {/* </View>)} */}
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
