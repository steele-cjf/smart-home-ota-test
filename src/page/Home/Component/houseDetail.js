/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Icon, Button, Left, Header, Text, Spinner } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Theme from '../../../style/colors';
function HouseDetail(props) {
    const [options, setOptions] = useState({})
    useEffect(() => {
        setOptions(props.data)
    }, props.data)
    const changeData = (type, value) => {
        let res = Object.assign({}, options)
        res[type] = value
        setOptions(res)
    }
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <Text style={styles.title}>3600</Text>
                <Text style={styles.desc}>元/月</Text>
                <AntDesign style={[styles.rightBtn, options.collect && styles.activeBtn]} 
                onPress={() => {changeData('collect', !options.collect)}}
                name={options.collect ? 'heart' : 'hearto'}></AntDesign>
            </View>
            <Text style={styles.secondDes}>整租·位置·2房·1卫·1间</Text>
            <Text style={styles.moduleTitle}>--</Text>
            <Text style={styles.moduleTitle}>地理位置</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        top: -50,
        borderRadius: 20,
        padding: 16
    },
    title: {
        color: Theme.primary,
        fontSize: 33
    },
    desc: {
        fontSize: 17,
        top: 16,
        color: Theme.primary
    },
    flexRow: {
        textAlignVertical: 'bottom',
        flexDirection: 'row'
    },
    rightBtn: {
        position: 'absolute',
        right: 16,
        fontSize: 20, 
        color: '#666',
        top: 10
    },
    activeBtn: {
        color: '#527BDF'
    },
    secondDes: {
        color: '#282828',
        marginTop: 8,
        fontSize: 16
    },
    moduleTitle: {
        color: '#282828',
        marginVertical: 8
    }
});
export default HouseDetail;
