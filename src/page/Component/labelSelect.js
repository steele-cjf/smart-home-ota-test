import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function LabelSelect(props) {
  const list = props.labelList;

  function handleSelect(item, i) {
    props.checkItem(item, i);
  }
  return (
    <View style={styles.flex_box}>
      {list.map((item, i) => {
        return (
          <TouchableOpacity
            style={[
              styles.label_style,
              item.selected ? styles.selected_bgColor : '',
            ]}
            onPress={() => handleSelect(item, i)}>
            <Text style={[item.selected ? styles.selected_color : '']}>
              {item.value}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  flex_box: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    paddingLeft: 15,
    paddingTop: 15,
  },
  label_style: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 3,
  },
  selected_bgColor: {
    backgroundColor: 'green',
  },
  selected_color: {
    color: '#fff',
  },
});
