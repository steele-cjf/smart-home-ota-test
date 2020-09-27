/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import HouseListComponent from '../../Component/housingList/list';
import SearchHeader from '../Component/searchHeader'
import { useFocusEffect } from '@react-navigation/native';
import DropdownMenu from '../../Component/housingList/filter';
import BlankPage from '../../Component/BlankPage';

function HouseList(props) {
  const data = [{ type: 'text', value: '位置', key: 'location', selected: false }, { type: 'text', value: '户型', key: 'houseType', selected: false }, { type: 'text', value: '租金', key: 'rent', selected: false }, { type: 'icon', value: '排序', key: 'filter', selected: false }];
  const filterParamsList = [
    [{ distance: null }, { distance: '1' }, { distance: '2' }, { distance: '3' }],
    [],
    [{ priceHigh: null, priceLow: null }, { priceHigh: 1000, priceLow: 0 }, { priceHigh: 2000, priceLow: 1000 }, { priceHigh: 3000, priceLow: 2000 }, { priceHigh: 4000, priceLow: 3000 }, { priceHigh: null, priceLow: 4000 }],
    [{ orderBy: 'newest' }, { orderBy: 'price_up' }, { orderBy: 'price_down' }]
  ]
  const [houseList, setHouseList] = useState([])
  const [params, setParams] = useState({})
  const [center, setCenter] = useState('');
  const [positioningIsOn, setPositioningIsOn] = useState(true)
  const [loading, setLoading] = useState(false)

  useFocusEffect(useCallback(() => {
    fetchHouseList()
    getGeolocation()
  }, [props.route]))

  const getGeolocation = () => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true
    });
    if (Platform.OS == 'ios') {
      Geolocation.requestAuthorization()
    }
    Geolocation.getCurrentPosition(
      position => {
        // console.log('position: ' + JSON.stringify(position))
        setPositioningIsOn(true)
        if (position.coords) {
          const arr = [position.coords.longitude, position.coords.latitude];
          setCenter(arr.join(','))
        }
      },
      error => {
        setPositioningIsOn(false)
        setCenter('')
      }
    )
  }

  const fetchHouseList = (pageNum = 1) => {
    setLoading(true)
    const data = { ...params, ...{ pageNum: pageNum } }
    props.getHousingList(data, (res) => {
      console.log('hose', res)
      setHouseList(res.data)
      setLoading(false)
    });
  }
  const renderContent = () => {
    if (houseList.list && houseList.list.length) {
      return (
        <HouseListComponent list={houseList} handlerHouseList={(page) => fetchHouseList(page)} />
      )
    } else {
      return (<BlankPage errorMsg='没有房源，请尝试更换筛选条件' />)
    }
  }
  const getFilter = (sec, row) => {
    if (sec === 1) {
      return
    }
    if (sec === 0) {
      if (!positioningIsOn && row) {
        let options = [
          { text: '取消', onPress: () => console.log('Ask me later pressed') },
          { text: '确定', onPress: () => console.log('Ask me later pressed') },
          {
            // cancelable and onDismiss only work on Android.
            cancelable: true,
            onDismiss: () =>
              console.log(
                'This alert was dismissed by tapping outside of the alert dialog.'
              )
          }
        ]
        if (Platform.OS === 'android') {
          options.splice(1, 0, {})
        }
        Alert.alert('需要开启定位才能看到附近的房源', '', options);
        return
      }
      const lip = Object.assign(params, { center: center })
      setParams(lip)
    }
    const data = filterParamsList[sec][row]
    const newData = Object.assign(params, data)
    setParams(newData)
    fetchHouseList(1)
  }
  const getSection = (arr1, arr2) => {
    const houseParams = {
      houseType: arr1,
      roomCount: arr2
    }
    const newData = Object.assign(params, houseParams)
    console.log('newData2', newData);
    setParams(newData)
    fetchHouseList(1)
  }
  const getSearchParams = (item) => {
    const data = { keyword: item }
    const newData = Object.assign(params, data)
    console.log('newData1', newData);
    setParams(newData)
    fetchHouseList(1)
  }
  return (
    <View style={styles.container}>
      <SearchHeader getSearchParams={(data) => getSearchParams(data)} />
      <DropdownMenu
        bgColor={'white'}
        tintColor={'#282828'}
        activityTintColor={'#5C8BFF'}
        handler={(selection, row) => getFilter(selection, row)}
        multipleSection={(arr1, arr2) => getSection(arr1, arr2)}
        data={data}
      >
        {renderContent()}
      </DropdownMenu>
      {/* </View>)} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default HouseList;
