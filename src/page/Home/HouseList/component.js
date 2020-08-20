/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-elements';
import HouseListComponent from '../../Component/housingList/list';
import SearchHeader from '../Component/searchHeader'
import { useFocusEffect } from '@react-navigation/native';

function HouseList(props) {
  const [houseList, setHouseList] = useState()
  useFocusEffect(useCallback(() => {
    props.getHousingList({ pageNum: 1 }, async (res) => {
      console.log(9999, res.data)
      setHouseList(res.data)
    });
  }, [props.route]))
  return (
    <View style={styles.container}>
      <SearchHeader />
      <HouseListComponent list={houseList} />
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
