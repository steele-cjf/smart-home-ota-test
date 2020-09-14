/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';

export default function HouseItem(props) {
  const { houseInfo } = props;
  const [dictionary, setDictionary] = useState({})
  useEffect(() => {
    storage.get('dictionaryMappings').then(res => {
      setDictionary(res)
    });
  }, [props])
  return (
    <TouchableOpacity
      onPress={() => props.onPress(houseInfo)}
      style={styles.container}>
      <View style={{ flex: 20 }}>
        <Image
          source={{
            uri: houseInfo.imgUrl || 'https://reactnativeexample.com/favicon.png',
          }}
          style={styles.linkImage}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.houseName} numberOfLines={1}>
          {houseInfo.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
          }}>
          <Text style={styles.houseInfo}>
            {houseInfo.roomCount || '--'}室{houseInfo.hallCount || '--'}厅
            {houseInfo.toiletCount || '--'}卫
          </Text>
          <Text style={styles.houseInfo}> - {dictionary && dictionary['house_type'] && dictionary['house_type'][houseInfo.houseType]}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={[styles.rentPrice, styles.highColor]}>
            {houseInfo.rentPrice || '--'}
          </Text>
          <Text style={[styles.highColor, styles.miniSize]}>元/月</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    // paddingLeft: 0,
    borderColor: '#E9E9E9',
    paddingVertical: 15,
    // paddingHorizontal: 16
    marginHorizontal: 16
  },
  linkImage: {
    width: 75,
    height: 75,
    resizeMode: 'cover',
    borderRadius: 4
  },
  houseName: {
    fontSize: $screen.scaleSize(16),
    color: '#282828',
  },
  houseInfo: {
    fontSize: $screen.scaleSize(12),
    color: '#7c7c7c',
  },
  rentPrice: {
    fontSize: $screen.scaleSize(20),
    marginRight: 4,
  },
  miniSize: {
    fontSize: $screen.scaleSize(12),
  },
  highColor: {
    color: '#5C8BFF',
  },
  rightContainer: {
    flex: 80,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    paddingLeft: 26,
  },
});
