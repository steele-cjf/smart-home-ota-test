import React, { Component, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

export default function CityTab(props) {
  const tabOnPress = i => {
    props.changeSelectId(i);
  };

  return (
      <View style={[tabStyles.container]}>
        {props.options &&
          props.options.map((tab, i) => {
            if (!tab) {
              return;
            }
            return (
              <TouchableOpacity
                style={tabStyles.tabJoke}
                activeOpacity={0.9}
                key={tab.id}
                onPress={() => tabOnPress(i)}
                removeClippedSubviews={false}>
                <Text
                  style={[
                    tabStyles.text,
                    props.selectIndex === i && { color: '#e4393c' },
                  ]}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
  );
}
const tabStyles = StyleSheet.create({
  container: {
    height: 40,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    position: 'relative',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'scroll'
  },
  tabJoke: {
    // height: 40,
    marginHorizontal: 16,
  },
  line: {
    position: 'absolute',
    height: 2,
    bottom: 0,
  },
  text: {
    fontSize: 14,
    color: '#252426',
  },
});
