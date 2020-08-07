import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, H3, CardItem, Left, Right, Icon } from 'native-base'
const status_cf = {
    0: {
        title: '您还未进行实名认证，请尽快验证!',
        desc: '更多操作需要实名认证才可以进行',
        icon: '',
        btnDesc: '实名认证'
    },
    1: {
        title: '您的实名信息正在审核中，请耐心等待!',
        desc: '更多操作需要认证完成才可以进行',
        icon: '',
        btnDesc: '查看进度'
    },
    2: {
        title: '您的实名信息未通过，请重新提交!',
        desc: '更多操作需要认证完成才可以进行',
        icon: '',
        btnDesc: '重新提交'
    },
    3: {
        title: '您还没添加登记房源，请尽快登记!',
        desc: '添加后才能执行开锁操作',
        icon: '',
        btnDesc: '登记房源'
    },
    4: {
        title: '您的房源正在审核中，请耐心等待!',
        desc: '审核完成后才可以添加住户和发布房源',
        icon: '',
        btnDesc: '查看进度'
    },
    5: {
        title: '您的房源审核失败了，请重新提交!',
        desc: '审核完成后才可以添加住户和发布房源',
        icon: '',
        btnDesc: '重新提交'
    },
    5: {
        title: '您的房源还未绑定设备，请尽快绑定!',
        desc: '审核完成后才可以添加住户和发布房源',
        icon: '',
        btnDesc: '绑定设备'
    }
}
export default function StatusCard(props) {
    const [status] = useState(status_cf[props.status || 0])
    return (
        <View style={styles.container}>
            <Card>
                <CardItem>
                    <Left>
                        <H3><Text>{status.title}</Text></H3>
                        <H3><Text>{status.desc}</Text></H3>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </CardItem>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
});
