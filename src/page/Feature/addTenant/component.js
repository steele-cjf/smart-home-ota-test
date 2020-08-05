import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, ListItem, Image, Card } from 'react-native-elements';
import { Button } from 'native-base';

import { AppRoute } from '../../../navigator/AppRoutes';
import { TouchableOpacity } from 'react-native-gesture-handler';
const image = require('../../../assets/images/scan.png')

export default function AddTenant(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cameraOptions, setCameraOptions] = useState(null)
  const [roomList] = useState(props.roomList)
  const [house, setHouse] = useState({})

  function updateIndex(index) {
    setSelectedIndex(index);
  }
  // hose详情获取
  useEffect(() => {
    props.openCamera({ open: false, result: null })
    setHouse(props.houseDetail.data)
  }, [props.houseDetail])

  // 扫描结果获取
  useEffect(() => {
    setCameraOptions(props.cameraOpt)
  }, [props.cameraOpt])

  //保存
  const saveTenant = () => {
    console.log(props.userInfo)
    // props.navigation.navigate(AppRoute.HOUSEDETAIL)
  }

  const renderScanContent = () => {
    console.log(888, props.roomList)
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={image}
          style={{ width: 115, height: 115 }}
        />
        <Button rounded full style={styles.scanBtn} onPress={() => { props.openCamera({ open: true }) }}>
          <Text style={{ color: '#fff' }}>扫码添加住户</Text>
        </Button>
        <TouchableOpacity onPress={() => updateIndex(1)}>
          <Text style={styles.scanText}>没有二维码？手动添加住户并实名</Text>
        </TouchableOpacity>
      </View>)
  }

  const renderCameraContent = () => {
    if (cameraOptions && cameraOptions.result) {
      let { data } = cameraOptions.result
      if (cameraOptions.result.error) {
        return (
          <TouchableOpacity onPress={() => { props.openCamera({ open: true }) }} style={styles.errorDes}>
            <Text style={styles.errorColor}> {result.error}</Text>
          </TouchableOpacity>)
      }
      return (
        <View>
          {/* <Text> {cameraContent.result}</Text> */}
          <Card style>
            <ListItem
              leftElement={<Text style={styles.dec}>姓名</Text>}
              rightElement={<Text>{data.name || '--'}</Text>}
              bottomDivider
            />
            <ListItem
              leftElement={<Text style={styles.dec}>手机号码</Text>}
              rightElement={<Text>{data.mobile || '--'}</Text>}
            />
          </Card>
        </View>)
    }
    return renderScanContent()
  }

  const renderRightContext = () => {
    return (<Text style={styles.dec}>{house && house.regionFullName || '--'}</Text>)
  }
  const renderRightPicker = () => {
    return (<Text style={styles.dec}>{house && house.regionFullName || '整租'}</Text>)
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>房屋信息</Text>
        <ListItem
          leftElement={<Text>房屋地址</Text>}
          rightElement={renderRightContext()}
          bottomDivider
        />
        <ListItem
          leftElement={<Text>房屋类型</Text>}
          rightElement={renderRightPicker()}
          chevron
        />
        <View
          style={
            ({ paddingHorizontal: 10 }, selectedIndex ? { display: 'none' } : '')
          }>
          <Text style={[styles.title, { marginTop: 20 }]}>住户信息</Text>
          {renderCameraContent()}
        </View>
        <View style={selectedIndex !== 1 ? { display: 'none' } : ''}>
          <Text style={[styles.title, { marginTop: 20 }]}>住户信息</Text>
          <Input
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>真实姓名</Text>}
          />
          <Input
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>身份证号</Text>}
          />
          <Input
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>手机号</Text>}
          />
        </View>
      </View>
      <Button
        full
        style={styles.scanBtn}
        onPress={() => saveTenant()}
      ><Text style={{color: '#fff'}}>添加住户</Text></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
    flexDirection: 'column'
  },
  title: {
    fontSize: 16,
    marginBottom: 20
  },
  label: {
    color: '#999',
    fontSize: 16,
  },
  dec: {
    color: '#7C7C7C'
  },
  scanText: {
    color: '#527BDF',
    fontSize: 14,
    marginTop: 16
  },
  submit: {
    paddingHorizontal: 10,
    height: 60
  },
  errorDes: {
    alignItems: 'center',
    paddingVertical: 60
  },
  errorColor: {
    color: 'red'
  },
  scanText: {
    color: '#7C7C7C',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  scanBtn: {
    borderRadius: 30,
    backgroundColor: '#5C8BFF',
    marginVertical: 30
  }
});
