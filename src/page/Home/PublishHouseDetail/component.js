/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon, Button, Left, Header, Text, Spinner } from 'native-base'
import HouseDetail from '../Component/houseDetail'
import { ScrollView } from 'react-native-gesture-handler';

const image = require('../../../assets/images/mock/home1.jpg')
function PublicHouseDetail(props) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState(true)
  const [img, setImg] = useState(null)
  useEffect(() => {
    let { id } = props.route.params
    props.getPublishHouseDetail(id, res => {
      if (res && !res.code && res.data) {
        setData(Object.assign({}, res.data))
        setLoading(false)
        let picture = res.data.houseAddition.images
        if(picture && picture.length) {
          setImg({uri: picture[0]})
        } else {
          setImg(image)
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
      <ScrollView>
        <ImageBackground style={styles.headerBox} source={img} />
        {
          loading ? <Spinner></Spinner> : <HouseDetail data={data} code={code} setCollection={(data, callback) => setCollection(data, callback)} />
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
