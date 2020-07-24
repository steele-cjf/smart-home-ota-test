import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Text } from 'react-native-elements';

export default function CitySelect(props) {
    const [options, setOptions] = useState([]);
    const _select = (item) => {
        props.changeAddress(item)
    }
    useEffect(() => {
        setOptions(props.address)
    }, [props.address])

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={() => _select(item, index)}
                style={styles.list}>
                <Text
                    style={{
                        fontSize: 14,
                        color: props.selectId === item.id ? '#D6382F' : '#666666'
                    }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={options}
            renderItem={_renderItem}
            keyExtractor={(_, index) => index.toString()}
        />
    );
}
const styles = StyleSheet.create({
    list: {
        height: 40,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});