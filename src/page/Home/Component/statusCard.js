import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../../../style/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icomoon from '../../../common/Icomoon';
import Entypo from 'react-native-vector-icons/Entypo';
import { AppRoute } from '../../../navigator/AppRoutes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// 身份
const TENANT = 'tenant' //租客
const status_cf = {
    'not_audit': {
        title: '您还未进行实名认证, 请尽快验证!',
        desc: '更多操作需要实名认证才可以进行',
        iconName: 'renzheng',
        btnDesc: '实名认证',
        route: 'AUTHENTICATION'
    },
    'audit_pending': {
        title: '您的实名信息审核中, 请耐心等待!',
        desc: '更多操作需要认证完成才可以进行',
        iconName: 'renzheng',
        btnDesc: '查看进度',
        route: 'VERDETAILS'
    },
    'audit_reject': {
        title: '您的实名信息未通过, 请重新提交!',
        desc: '更多操作需要认证完成才可以进行',
        iconName: 'renzheng',
        btnDesc: '重新提交',
        route: 'VERDETAILS'
    },
    'audit_pass': {
        title: '您还没添加登记房源, 请尽快登记!',
        desc: '添加后才能执行开锁操作',
        iconName: 'dengjifangyuan',
        btnDesc: '登记房源',
        route: 'RECORD'
    }
}
const houseStatus = {
    'audit_pending': {
        title: '您的房源正在审核中, 请耐心等待!',
        desc: '审核完成后才可以添加住户和发布房源',
        iconName: 'renzheng',
        btnDesc: '查看进度',
        showLocation: true,
        route: 'HOUSEDETAIL'
    },
    'audit_reject': {
        title: '您的房源审核失败了, 请重新提交!',
        desc: '审核完成后才可以添加住户和发布房源',
        iconName: 'renzheng',
        btnDesc: '重新提交',
        showLocation: true,
        route: 'FEATURE'
    },
    'audit_pass': {
        title: '您的房源还未绑定设备, 请尽快绑定!',
        desc: '审核完成后才可以添加住户和发布房源',
        iconName: 'shebei',
        btnDesc: '绑定设备',
        showLocation: true,
        route: 'FEATURE'
    }
}
export default function StatusCard(props) {
    const [options, setOptions] = useState(status_cf['not_audit'])

    useEffect(() => {
        if (props.status !== 'audit_pass'
            || (props.status === 'audit_pass' && (!props.item || !props.item.houseId))) {
            let data = Object.assign({}, status_cf[props.status || 'not_audit'])
            setOptions(data)
        }
    }, [props, props.status])

    useEffect(() => {
        if (props.status === 'audit_pass' && props.item && props.item.houseId) {
            let { status, address, houseId, houseRole } = props.item
            let data = Object.assign({}, houseStatus[status || 'audit_pending'])
            data.name = address
            data.id = houseId
            data.houseRole = houseRole
            setOptions(data)
        }
    }, [props, props.item])
    const renderStatus = () => {
        var list = [
            { icon: 'paper-plane', name: 1, text: '开启' },
            { icon: '500px-with-circle', name: 2, text: '开启' },
            { icon: 'progress-one', name: 3, text: '75%' },
            { icon: 'signal', name: 4, text: '开启' },
            { icon: 'paper-plane', name: 5, text: '开启' }
        ]
        return list.map((item) => {
            return (
                <View key={item.name} style={styles.cardList}>
                    <Entypo style={styles.LeftIcon} name={item.icon} />
                    <Text style={styles.cardText}>{item.text}</Text>
                </View>
            )
        })

    }
    const renderRent = () => {
        return (
            <View style={styles.rentBox}>
                {renderStatus()}
                <TouchableOpacity style={styles.rightBox}>
                    <MaterialCommunityIcons style={[styles.LeftIcon, styles.rightText]} name='door' />
                    <Text style={styles.rightText}>开门</Text>
                </TouchableOpacity>
            </View>)
    }
    return (
        <View style={styles.container}>
            {options && options.showLocation &&
                <TouchableOpacity style={styles.topBox} onPress={() => props.showList()}>
                    <Entypo style={styles.LeftIcon} name='location-pin' />
                    <Text style={styles.location} numberOfLines={1}>{options.name || '--'}</Text>
                    <Icomoon name='xiajiantou_shixin' style={styles.RightIcon} />
                </TouchableOpacity>
            }
            {/* 判断是房东还是租客 */}
            {(options && options.houseRole !== TENANT) && <View style={styles.bottomBox}>
                <View style={styles.Leftcontent}>
                    <Text style={styles.title} numberOfLines={1}>{options.title || '--'}</Text>
                    <Text style={styles.des} note>{options.desc || '--'}</Text>
                </View>
                <TouchableOpacity style={styles.RightContent} onPress={() => NavigatorService.navigate(AppRoute[options.route], {
                    id: options.id || undefined,
                    role: options.houseRole || undefined,
                })}>
                    {/* <AntDesign name={options.iconName} style={styles.iconBox} /> */}
                    <Icomoon name={options.iconName} style={styles.iconBox} />
                    <Text style={{ color: Theme.primary, fontSize: $screen.scaleSize(14)}}>{options.btnDesc || '--'}</Text>
                </TouchableOpacity>
            </View>}
            {options.houseRole && options.houseRole === TENANT && renderRent()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8
    },
    topBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#E9E9E9',
        fontSize: $screen.scaleSize(16),
        paddingBottom: 13,
        flexDirection: 'row'
    },
    location: {
        color: '#7C7C7C',
        fontSize: $screen.scaleSize(16),
        flexWrap: 'wrap',
        width: '80%'
    },
    RightIcon: {
        position: 'absolute',
        right: 20,
        top: 4,
        color: '#7C7C7C',
        height: '100%',
        textAlignVertical: 'center',
    },
    LeftIcon: {
        color: '#7C7C7C',
        paddingRight: 5,
        fontSize: $screen.scaleSize(17),
        textAlign: 'center',
        top: 3
    },
    bottomBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#282828',
        fontSize: $screen.scaleSize(16),
        paddingBottom: 7
    },
    des: {
        color: '#7C7C7C',
        fontSize: $screen.scaleSize(12)
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
        fontSize: $screen.scaleSize(20),
        paddingTop: 10,
        paddingBottom: 2
    },
    rentBox: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    cardList: {
        marginRight: 15,
        textAlign: 'center',
    },
    cardText: {
        color: '#7C7C7C',
        marginTop: 5
    },
    rightBox: {
        flexDirection: 'row',
        borderLeftWidth: 1,
        borderLeftColor: '#E9E9E9',
        paddingLeft: 15,
        position: 'absolute',
        right: 0
    },
    rightText: {
        color: '#5C8BFF',
        fontSize: $screen.scaleSize(16),
        paddingTop: 10,
        padding: 5
    }
});
