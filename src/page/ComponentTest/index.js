import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openCamera } from '../../store/common/index'
import { Text, Button } from 'react-native-elements';
import { View, PermissionsAndroid, Platform, StyleSheet, Linking, NativeModules, NativeEventEmitter } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import Geolocation from '@react-native-community/geolocation';
// import NotifService from './NotifService';
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function ComponentTest(props) {
    const [wifi, setWifi] = useState('')
    useEffect(() => {
        console.log(9999, BleManager)
        BleManager.start({ showAlert: false }).then(() => {
            console.log("Module initialized")
        })
        BleManager.enableBluetooth()
            .then(() => {
                // Success code
                console.log("2The bluetooth is already enabled or the user confirm");
            })
            .catch((error) => {
                // Failure code
                console.log("1The user refuse to enable bluetooth");
            });
        // bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral');
        // bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (args) => {
        //     console.log('*****', args)
        // } );
    }, [])
    const NotificationInfo = () => { }

    const getWifi = async () => {
        if (Platform.OS !== 'ios') {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        } else {
            await Geolocation.requestAuthorization()
        }
        let wf = await NetworkInfo.getSSID()
        setWifi(wf)
    }

    const open = (type, url) => {
        Linking.canOpenURL(url).then(res => {
            if (res) {
                Linking.openURL(url)
            } else {
                showToast('请先安装' + type)
            }
        }).catch(err => {
            showToast('请先安装' + type)
        })
    }
    const openApp = (type) => {
        if (type === 'setting') {
            open(type, 'App-Prefs:root=WIFI');
        } else if (type === 'weChart') {
            open(type, 'weixin://')
        }
    }
    const getBleList = () => {
        console.log(7777)
        BleManager.scan([], 15, false, {
            numberOfMatches: 3,
            matchMode: 1,
            scanMode: 2,
            reportDelay: 0
          }).then((results) => {
            console.log('Scanning...', results);
            BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
                // Success code
                console.log(peripheralsArray);
            });
        })

    }

    return (
        <View style={{ margin: 20, flex: 1 }}>
            <Button title='获取wifi' onPress={() => { getWifi() }}></Button>
            <Text>{wifi || '未能获取wifi'}</Text>
            <Button style={styles.mrg} title='启动二维码扫描' onPress={() => { props.openCamera({ open: true }) }}></Button>
            <Button style={styles.mrg} title='打开微信' onPress={() => { openApp('weChart') }}></Button>
            <Button style={styles.mrg} title='打开设置' onPress={() => { openApp('setting') }}></Button>
            <Button style={styles.mrg} title='打开通知' onPress={() => { NotificationInfo() }}></Button>
            <Button style={styles.mrg} title='扫描蓝牙' onPress={() => { getBleList() }}></Button>
        </View>
    );
}
function mapStateToProps(state) {
    return {
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ openCamera }, dispatch);
}
export default connect(
    mapStateToProps,
    matchDispatchToProps,
)(ComponentTest);
const styles = StyleSheet.create({
    mrg: {
        marginBottom: 20
    }
})