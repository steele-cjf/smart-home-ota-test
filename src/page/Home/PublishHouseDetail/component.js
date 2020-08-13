/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon, Button, Left, Header, Text, Spinner } from 'native-base'
import HouseDetail from '../Component/houseDetail'

const img = require('../../../assets/images/mock/home1.jpg')
function PublicHouseDetail(props) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState(true)
  useEffect(() => {
    let { id } = props.route.params
    props.getPublishHouseDetail(id)
    setCode(props.dictionaryMappings)
  }, [])
  useEffect(() => {
    let res = props.publishHouseDetail
    if (res && !res.code && res.data) {
      setData(Object.assign({}, res.data))
      setLoading(false)
    }
  }, [props.publishHouseDetail])
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.headerBox} source={img}>
        <TouchableOpacity style={styles.headerBack} onPress={() => NavigatorService.goBack()} >
          <Icon name="md-chevron-back" style={styles.headerText} />
          <Text style={[styles.headerText, styles.back]}>返回</Text>
        </TouchableOpacity>
      </ImageBackground>
      {
        loading ? <Spinner></Spinner> : <HouseDetail data={data} code={code} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  headerBox: {
    height: 300
  },
  headerBack: {
    flexDirection: 'row',
    margin: 20
  },
  headerText: {
    color: '#fff',
    justifyContent: 'center'
  },
  back: {
    paddingTop: 8
  }
});
export default PublicHouseDetail;
