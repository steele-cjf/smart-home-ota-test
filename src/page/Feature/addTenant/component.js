import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup, Button, Input, ListItem, Image } from 'react-native-elements';
import { AppRoute } from '../../../navigator/AppRoutes';
import { TouchableOpacity } from 'react-native-gesture-handler';
const image = require('../../../assets/images/scan.png')

export default function AddTenant(props) {
  const buttons = ['扫一扫添加住户', '手动添加住户'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cameraOptions, setCameraOptions] = useState(null)

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

  const renderCameraContent = () => {
    if (cameraOptions && cameraOptions.result) {
      let { result } = cameraOptions
      console.log('result', result)
      if (result.error) {
        return (
          <TouchableOpacity onPress={() => { props.openCamera({ open: true }) }} style={styles.errorDes}>
            <Text style={styles.errorColor}> {result.error}</Text>
          </TouchableOpacity>)
      }
      return (
        <TouchableOpacity onPress={() => { props.openCamera({ open: true }) }}>
          {/* <Text> {cameraContent.result}</Text> */}
        </TouchableOpacity>)
    }
    return (
      <TouchableOpacity onPress={() => { props.openCamera({ open: true }) }} style={{ alignItems: 'center' }}>
        <Image
          source={image}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.scanText}>点击扫码添加</Text>
      </TouchableOpacity>)
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
        <Text style={[styles.title, { marginTop: 20 }]}>住户信息</Text>
        <ButtonGroup
          onPress={index => updateIndex(index)}
          selectedIndex={selectedIndex}
          selectedButtonStyle={{ backgroundColor: '#527BDF' }}
          containerStyle={{ left: 0 }}
          buttons={buttons}
        />
        <View
          style={
            ({ paddingHorizontal: 10 }, selectedIndex ? { display: 'none' } : '')
          }>
          {renderCameraContent()}
        </View>
        <View style={selectedIndex !== 1 ? { display: 'none' } : ''}>
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
        style={styles.submit}
        buttonStyle={{ backgroundColor: '#5C8BFF' }}
        title="保存"
        onPress={() => saveTenant()}
      />
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
  }
});
