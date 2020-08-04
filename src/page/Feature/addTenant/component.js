import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup, Icon, Button, Input, ListItem, Image } from 'react-native-elements';
import { AppRoute } from '../../../navigator/AppRoutes';
import Camera from '../../Component/Camera';
import { TouchableOpacity } from 'react-native-gesture-handler';

const image = require('../../../assets/images/scan.png')
export default function AddTenant(props) {
  const buttons = ['扫一扫添加住户', '手动添加住户'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCamera, setCamera] = useState(false);
  const [cameraContent, setCameraContext] = useState(null)
  const [house, setHouse] = useState({})
  const getCode = (result) => {
    setCamera(false)
    setCameraContext(result)
  }
  function updateIndex(index) {
    setSelectedIndex(index);
  }
  useEffect(() => {
    // props.getHouseDetail('483710797791371264');
    // console.log(55, props.houseDetail.data)
    setHouse(props.houseDetail.data)
  }, [props.houseDetail])
  const renderCameraContent = () => {
    if (cameraContent) {
      return (
        <TouchableOpacity onPress={() => { setCamera(true) }}>
          <Text> {cameraContent.data}</Text>
        </TouchableOpacity>)
    }
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={image}
          style={{ width: 200, height: 200 }}
          onPress={() => { setCamera(true) }}
        />
        <Text style={styles.scanText}>点击扫码添加</Text>
      </View>)
  }
  const renderRightContext = () => {
    return (<Text style={styles.dec}>{house.regionFullName || '--'}</Text>)
  }
  const renderRightPicker = () => {
    return (<Text style={styles.dec}>{house.regionFullName || '整租'}</Text>)
  }

  return (
    <View style={styles.container}>
      {showCamera && <Camera getCode={getCode} close={() => setCamera(false)} />}
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
      <Button
        style={{ paddingHorizontal: 10 }}
        title="保存"
        onPress={() => props.navigation.navigate(AppRoute.HOUSEDETAIL)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
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
  }
});
