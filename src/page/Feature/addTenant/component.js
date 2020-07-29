import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, NativeModules } from 'react-native';
import { ButtonGroup, Icon, Button, Input } from 'react-native-elements';
import { AppRoute } from '../../../navigator/AppRoutes';
import Camera from '../../Component/Camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NetworkInfo } from 'react-native-network-info';
import Geolocation from '@react-native-community/geolocation';
import NetInfo from "@react-native-community/netinfo";
import showToast from '../../../util/toast';


export default function AddTenant(props) {
  const buttons = ['扫一扫添加住户', '手动添加住户'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCamera, setCamera] = useState(false);
  const [cameraContent, setCameraContext] = useState(null)
  const [ip, setIp] = useState('')

  const getCode = (result) => {
    setCamera(false)
    setCameraContext(result)
  }
  function updateIndex(index) {
    setSelectedIndex(index);
  }
  const renderCameraContent = () => {
    if (cameraContent) {
      return (
        <TouchableOpacity onPress={() => { setCamera(true) }}>
          <Text> {cameraContent.data}</Text>
        </TouchableOpacity>)
    }
    return (<Icon name="done" size={100} color="green" onPress={() => { setCamera(true) }} />)
  }
  // 获取wifi的方式
  const getWifi = async () => {
    NetInfo.fetch("wifi").then(state => {
      showToast(state.details.ssid)
      console.log("SSID", state.details.ssid);
      console.log("BSSID", state.details.bssid);
      console.log("Is connected?", state.isConnected);
    });
    return
    if (Platform.OS !== 'ios') {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    } else {
      // console.log(1111111111111111)
      await Geolocation.requestAuthorization()
    }
    // console.log(2222222222222222)
    var x = {
      "getBSSID": 1,
      "getBroadcast": 2,
      "getConstants": 3,
      "getGatewayIPAddress": 4,
      "getIPAddress": 5,
      "getIPV4Address": 6,
      "getSSID": 7,
      "getSubnet": 8,
      "getWIFIIPV4Address": 9
    }
    let a = await NativeModules.RNNetworkInfo.getSSID
    console.log(a)
    // NetworkInfo.getSSID().then((res) => {
    //   showToast(res)
    //   console.log(res, 11112)
    // }).catch((err)=>showToast(err))
    // let ipAddress = await NetworkInfo.getIPAddress()
    // showToast('ssid:' +  ssid + ',ip:' + ipAddress)
    // console.log(33333333333333)
    // setIp(ssid)
  }
  return (
    <View style={styles.container}>
      {showCamera && <Camera getCode={getCode} close={() => setCamera(false)} />}
      <ButtonGroup
        onPress={index => updateIndex(index)}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ height: 100 }}
      />
      <View
        style={
          ({ paddingHorizontal: 10 }, selectedIndex ? { display: 'none' } : '')
        }>
        <Text style={{ fontSize: 16, marginTop: 20, color: '#999' }}>
          可扫已实名的APP用户的二维码
      </Text>
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
      <Button
        style={{ paddingHorizontal: 10, marginTop: 10 }}
        title="获取wifi"
        onPress={() => getWifi()}
      />
      <Text>当前连接的wifi：{ip || '--'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: '#999',
    fontSize: 16,
  },
});
