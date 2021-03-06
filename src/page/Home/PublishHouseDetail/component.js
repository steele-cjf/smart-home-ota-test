/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon, Button, Left, Header, Text, Spinner } from 'native-base'
import HouseDetail from '../Component/houseDetail'
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from '../../Component/Swiper';
import HeaderCommon from '../../Component/HeaderCommon';

const image = require('../../../assets/images/mock/home1.jpg')
function PublicHouseDetail(props) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState(true)
  const [img, setImg] = useState([])
  useEffect(() => {
    let { id } = props.route.params
    props.getPublishHouseDetail(id, res => {
      if (res && !res.code && res.data) {
        setData(Object.assign({}, res.data))
        setLoading(false)
        let picture = res.data.houseAddition.images
        if (picture && picture.length) {
          let i = picture.map((item) => {
            return { uri: item }
          })
          setImg(i)
        } else {
          setImg([image])
        }
      }
    })
    setCode(props.dictionaryMappings)
  }, [])
  const setCollection = (data, callback) => {
    props.publishSetCollection(data, callback)
  }
  return (
    <View style={styles.container}>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '房源信息',
        }}
      />
      <ScrollView bounces={false}>
        <View style={{ height: 250, backgroundColor: '#E1E5EB' }} >
          {loading ? <Spinner color="#5C8BFF"></Spinner> : <Swiper items={img} showPage />}
        </View>

        {
          loading ? <Spinner color="#5C8BFF"></Spinner> : <HouseDetail data={data} code={code} setCollection={(data, callback) => setCollection(data, callback)} />
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  headerBox: {
    height: 300
  }
});
export default PublicHouseDetail;
