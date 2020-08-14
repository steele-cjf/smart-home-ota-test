/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-elements';
import HouseListComponent from '../../Component/housingList/list';
import SearchHeader from '../Component/searchHeader'
function HouseList(props) {
  return (
    <View style={styles.container}>
      <SearchHeader />
      <HouseListComponent />
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
