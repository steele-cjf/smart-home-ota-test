import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openCamera } from '../../store/common/index'
import { Text, Button } from 'react-native-elements';
import { View, PermissionsAndroid, Platform, StyleSheet, Linking, NativeModules, NativeEventEmitter, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import Geolocation from '@react-native-community/geolocation';
// import NotifService from './NotifService';
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function ComponentTest(props) {
    const [wifi, setWifi] = useState('')
    var [BLEList, setBLEList] = useState([])
    var [selectBle, setSelectBle] = useState(null)
    var config = []

    // 蓝牙处理
    useEffect(() => {
        if (Platform.OS === 'android') {
            BleManager.enableBluetooth()
                .then(() => {
                    // Success code
                    console.log("The bluetooth is already enabled or the user confirm");
                    BleManager.start({ showAlert: false }).then(() => {
                        console.log("Module initialized")
                    })
                    var listener = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', showBLElist);
                    return () => {
                        listener.remove()
                    };
                })
                .catch((error) => {
                    // Failure code
                    console.log("The user refuse to enable bluetooth");
                });
        }
    }, [])
    // 蓝牙连接
    const test = (peripheral) => {
        if (peripheral) {
            if (peripheral.connected) {
                BleManager.disconnect(peripheral.id);
            } else {
                console.log(1111111, peripheral.id)
                BleManager.connect(peripheral.id).then(() => {
                    let p = config[peripheral.id]
                    if (p) {
                        p.connected = true;
                    }
                    console.log(2222222, peripheral.id, config)
                    setSelectBle(p)
                    // console.log('Connected to ' + peripheral.id, p);
                }).catch((err) => {
                    console.log('err', err)
                })
            }
        }
    }
    const NotificationInfo = () => { }
    const showBLElist = (args) => {
        if (!args.name) return
        config[args.id] = args
        console.log(8888888)
        var x = Array.from(Object.values(config))
        setBLEList(x)
    }
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
        config = {}
        // 扫描，uuid、时间、能否重复
        BleManager.scan([], 3, true)
        setBLEList([])
    }
    const checkConnect = () => {
        console.log(888, selectBle)
        // BleManager.retrieveServices(selectBle.id).then(
        //     (peripheralInfo) => {
        //         // Success code
        //         console.log("Peripheral info:", peripheralInfo);
        //     }
        // );
    }
    const renderItem = (item) => {
        const color = item.connected ? 'green' : '#fff';
        return (
            <TouchableHighlight onPress={() => test(item)}>
                <View style={[styles.row, { backgroundColor: color }]}>
                    <Text style={{ fontSize: 12, textAlign: 'center', color: '#333333', padding: 10 }}>{item.name || ' --'}</Text>
                    <Text style={{ fontSize: 10, textAlign: 'center', color: '#333333', padding: 2 }}>RSSI: {item.rssi}</Text>
                    <Text style={{ fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20 }}>{item.id}</Text>
                </View>
            </TouchableHighlight>
        );
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
            <Button style={styles.mrg} title='检查连接' onPress={() => { checkConnect() }}></Button>
            <ScrollView style={styles.scroll}>
                {(BLEList.length == 0) &&
                    <View style={{ flex: 1, margin: 20 }}>
                        <Text style={{ textAlign: 'center' }}>No peripherals</Text>
                    </View>
                }
                <FlatList
                    data={BLEList}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
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
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        width: window.width,
        height: window.height
    },
    scroll: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        margin: 10,
    },
    row: {
        margin: 10
    },
})