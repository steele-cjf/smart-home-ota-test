import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../../../style/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';


const status_cf = {
    'not_audit': {
        title: '您还未进行实名认证，请尽快验证!',
        desc: '更多操作需要实名认证才可以进行',
        iconName: 'idcard',
        btnDesc: '实名认证'
    },
    'audit_pending': {
        title: '您的实名信息正在审核中，请耐心等待!',
        desc: '更多操作需要认证完成才可以进行',
        iconName: 'idcard',
        btnDesc: '查看进度',
        showLocation: true
    },
    'audit_reject': {
        title: '您的实名信息未通过，请重新提交!',
        desc: '更多操作需要认证完成才可以进行',
        iconName: 'idcard',
        btnDesc: '重新提交'
    },
    'audit_pass': {
        title: '您还没添加登记房源，请尽快登记!',
        desc: '添加后才能执行开锁操作',
        icon: 'home',
        btnDesc: '登记房源'
    },
    'audit_pending': {
        title: '您的房源正在审核中，请耐心等待!',
        desc: '审核完成后才可以添加住户和发布房源',
        iconName: 'idcard',
        btnDesc: '查看进度'
    },
    'audit_reject': {
        title: '您的房源审核失败了，请重新提交!',
        desc: '审核完成后才可以添加住户和发布房源',
        iconName: 'idcard',
        btnDesc: '重新提交',
        showLocation: true
    },
    'audit_pass': {
        title: '您的房源还未绑定设备，请尽快绑定!',
        desc: '审核完成后才可以添加住户和发布房源',
        iconName: 'tool',
        btnDesc: '绑定设备',
        showLocation: true
    }
}
export default function StatusCard(props) {
    const [options, setOptions] = useState(status_cf['not_audit'])

    useEffect(() => {
        setOptions(status_cf[props.status || 'audit_pass'])
    }, [props.status])
    return (
        <View style={styles.container}>
            {options && options.showLocation &&
                <TouchableOpacity style={styles.topBox} onPress={() => props.showList()}>
                    <Entypo style={styles.LeftIcon} name='location-pin' />
                    <Text style={styles.location}>222</Text>
                    <AntDesign name='caretdown' style={styles.RightIcon} />
                </TouchableOpacity>
            }
            <View style={styles.bottomBox}>
                <View style={styles.Leftcontent}>
                    <Text style={styles.title}>{options.title || '--'}</Text>
                    <Text style={styles.des} note>{options.desc || '--'}</Text>
                </View>
                <View style={styles.RightContent}>
                    <AntDesign name={options.iconName} style={styles.iconBox} />
                    <Text style={{ color: Theme.primary }}>{options.btnDesc || '--'}</Text>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10
    },
    topBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#E9E9E9',
        fontSize: 16,
        paddingBottom: 13,
        flexDirection: 'row'
    },
    location: {
        color: '#7C7C7C',
        fontSize: 16
    },
    RightIcon: {
        position: 'absolute',
        right: 21,
        color: '#7C7C7C'
    },
    LeftIcon: {
        color: '#7C7C7C',
        paddingRight: 5,
        fontSize: 17
    },
    bottomBox: {
        flexDirection: 'row'
    },
    title: {
        color: '#282828',
        fontSize: 16,
        paddingVertical: 13
    },
    des: {
        color: '#7C7C7C',
        fontSize: 12
    },
    Leftcontent: {
        width: '80%'
    },
    RightContent: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconBox: {
        color: Theme.primary,
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 2
    }
});
