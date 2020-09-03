import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Theme from '../../style/colors';

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
              styles.labelBox,
              item.selected ? styles.selected_bgColor : '',
            ]}
            onPress={() => handleSelect(item, i)}>
            <Text
              style={[
                item.selected ? styles.selected_color : styles.default_color,
                styles.label_style,
              ]}>
              {item.value} {item.name}
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
  labelBox: {
    borderWidth: 0.5,
    borderColor: Theme.border,
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 10,
  },
  label_style: {
    width: 75,
    height: 32,
    textAlign: 'center',
    lineHeight: 32,
  },
  default_color: {
    color: Theme.textSecondary,
  },
  selected_bgColor: {
    backgroundColor: Theme.primary,
  },
  selected_color: {
    color: '#fff',
  },
});
