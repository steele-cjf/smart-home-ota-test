/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Icon, Button, Left, Header, Text, Spinner } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
function HouseDetail(props) {
    const [options, setOptions] = useState({})
    useEffect(() => {
        setOptions(props.data)
    }, props.data)
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <Text style={styles.title}>3600</Text>
                <Text>元/月</Text>
                <AntDesign name={options.collect ? 'heart' : 'hearto'}></AntDesign>
            </View>
            <Text>整租·位置·2房·1卫·1间</Text>
            <View style={styles.flexRow}>
                
            </View>
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
    flexRow: {
        flexDirection: 'row'
    }
});
export default HouseDetail;
