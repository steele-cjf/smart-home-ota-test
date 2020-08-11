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
            uri: 'https://reactnativeexample.com/favicon.png',
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
            {houseInfo.toiletCount || '--'}
          </Text>
          <Text >{dictionary && dictionary['house_type'] && dictionary['house_type'][houseInfo.houseType]}</Text>
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
    borderBottomWidth: 0.5,
    borderColor: 'darkgray',
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 15,
  },
  linkImage: {
    width: 75,
    height: 75,
    resizeMode: 'cover',
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  houseName: {
    fontSize: 16,
    color: '#282828',
  },
  houseInfo: {
    fontSize: 12,
    color: '#7c7c7c',
  },
  rentPrice: {
    fontSize: 20,
  },
  miniSize: {
    fontSize: 12,
  },
  highColor: {
    color: '#5C8BFF',
  },
  rightContainer: {
    flex: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
});
