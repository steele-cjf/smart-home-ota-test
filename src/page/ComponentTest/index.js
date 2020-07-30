import React, { useState } from 'react';
import { Text, Button } from 'react-native-elements';
import { View, PermissionsAndroid, Platform, StyleSheet, Linking } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import Geolocation from '@react-native-community/geolocation';
import Camera from '../Component/Camera';
import LinkingSettings from 'react-native-linking-settings';


export default function ComponentTest(props) {
    const [wifi, setWifi] = useState('')
    const [showCamera, setShowCamera] = useState(false)
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
            if (Platform.OS == 'ios') {
                open(type, 'App-Prefs:root=WIFI');
            } else {
                LinkingSettings.openSettings('WIFI_SETTINGS');
            }
        } else if (type === 'weChart') {
            open(type, 'weixin://')
        }
    }

    return (
        <View style={{ margin: 20, flex: 1 }}>
            <Button title='获取wifi' onPress={() => { getWifi() }}></Button>
            <Text>{wifi || '未能获取wifi'}</Text>
            <Button style={styles.mrg} title='启动二维码扫描' onPress={() => { setShowCamera(true) }}></Button>
            {showCamera && <Camera close={() => setShowCamera(false)} />}
            <Button style={styles.mrg} title='打开微信' onPress={() => { openApp('weChart') }}></Button>
            <Button style={styles.mrg} title='打开设置' onPress={() => { openApp('setting') }}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    mrg: {
        marginBottom: 20
    }
})