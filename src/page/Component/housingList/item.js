/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';

export default function HouseItem(props) {
  const {houseInfo} = props;

  return (
    <TouchableOpacity
      onPress={() => props.onPress(houseInfo)}
      style={styles.container}>
      <View style={{flex: 20}}>
        <Image source={houseInfo.imgUrl} style={styles.linkImage} />
      </View>
      <View style={styles.rightContainer}>
        <Text>{houseInfo.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>
            {houseInfo.roomCount}室{houseInfo.hallCount}厅
            {houseInfo.toiletCount}
          </Text>
          <Text>{houseInfo.houseType}</Text>
        </View>
        <Text>{houseInfo.rentPrice}/月</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    borderBottomWidth: 0.5,
    borderColor: 'darkgray',
    marginLeft: 10,
    marginRight: 10,
  },
  linkImage: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    backgroundColor: '#f4f4f4',
  },
  rightContainer: {
    flex: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
  },
});
