import React, { Component, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default function CityTab(props) {
  const tabOnPress = i => {
    props.changeSelectId(i);
  };
  const renderItem = ({item, index}) => {
    return (
        <TouchableOpacity
          style={tabStyles.tabJoke}
          activeOpacity={0.9}
          key={item.id}
          onPress={() => tabOnPress(index)}
          removeClippedSubviews={false}>
          <Text
            style={[
              tabStyles.text,
              props.selectIndex === index && { color: '#e4393c' },
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
  }
  return (
      <View style={[tabStyles.container]}>
        <FlatList
          horizontal={true}
          data={props.options}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      
  );
}
const tabStyles = StyleSheet.create({
  container: {
    height: 30,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    marginVertical: 15
  },
  tabJoke: {
    height: 40,
    marginHorizontal: 16,
  },
  line: {
    position: 'absolute',
    height: 2,
    bottom: 0,
  },
  text: {
    fontSize: $screen.scaleSize(14),
    color: '#252426',
  },
});
