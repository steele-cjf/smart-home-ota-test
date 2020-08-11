import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Theme from '../../style/colors';

export default function PersonalInfoPage(props) {

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headView}>
        <Text style={styles.textTitle}>头像</Text>
        <Image style={styles.imageStyle} source={{uri:'blob:CF57F991-A050-4ED4-A8B0-4C7FB817663A?offset=0&size=221112',}}/> 
      </View>
      <View>
        <Text style={[styles.textTitle, styles.fontSize16]}>基本资料</Text>
      </View>
    </View>
    
  ); 

}

const styles = StyleSheet.create({  
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Theme.background,
  },
  headView: {
    //flexDirection: 'row',
    //height: 100,
    //padding: 12,
    //borderRadius: 4,
    //marginBottom: 10,
    marginVertical: 10,
    backgroundColor: '#FFECEC',
  },
  textTitle: {
    paddingVertical: 16,
    fontSize: 14,
    color: Theme.textDefault,
    //backgroundColor: 'red',
  },
  fontSize16: {
    fontSize: 16,
  },
  imageStyle: {
    position: 'absolute',
    right: 0,
    height: 48, 
    width: 48,
    borderRadius: 24,
    backgroundColor: 'yellow',
  },
  topTextStyle1: {
    fontSize: 16,
    color: Theme.textDefault,
  },
  topTextStyle2: {
    fontSize: 14,
    color: Theme.textSecondary,
    marginTop: 10,
  },
  
  textContent: {
    position: 'absolute',
    left: 80,
    right: 0,
    paddingVertical: 10,
    textAlign: 'right',
    fontSize: 14,
    color: Theme.textDefault,
  },
  space: {
    marginTop: 45,
  },
  ImageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btnStyle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5C8BFF'
  },
  btnTextStyle: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 16, 
    color: '#FFFFFF', 
  },
});