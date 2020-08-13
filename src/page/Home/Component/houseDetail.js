/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Icon, Button, Left, Header, Text, Spinner } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Theme from '../../../style/colors';
import { houseLayoutCn, houseItemCn } from '../config/houseDetailCn'

function HouseDetail(props) {
    const [options, setOptions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [code] = useState(props.code)
    useEffect(() => {
        setOptions(props.data)
        // console.log('props.data', props.data, 2)
        if (props.data) {
            setLoading(false)
        }
    }, [props.data])

    const changeData = (type, value) => {
        let res = Object.assign({}, options)
        res[type] = value
        setOptions(res)
    }
    const renderHouseLayout = () => {
        let result = houseLayoutCn.map((item) => {
            let data = item.headKey ? options[item.headKey] : options
            let text = ''
            if (item.keyType === 'array') {
                text = (data[item.key[0]] || '--') + '/' + (data[item.key[1]] || '--')
            } else {
                text = (item.codeKey ? code[item.codeKey][data[item.key]] : data[item.key]) || '--'
            }
            return (
                <View style={styles.houseLayoutModule}>
                    <Text style={styles.houseLayoutTitle}>
                        {text}
                    </Text>
                    <Text style={styles.houseLayoutDesc}>{item.name}</Text>
                </View>)
        })
        return (<View style={styles.houseLayoutBox}>{result}</View>)
    }
    const renderHouseAddition = (type) => {
        let key = 'rent_requirements'
        let check = type === 'spots'
        if (check) {
            key = 'house_spots'
        }
        let result = options.houseAddition[type].map((item) => {
            return (<View style={[styles.houseAdditionModule, !check && { backgroundColor: '#E9E9E9' }]}>
                <Text style={styles.houseAdditionText}>{code[key][item] || '--'}</Text>
            </View>)
        })
        return (<View style={styles.houseAdditionBox}>{result}</View>)
    }
    const renderHouseItem = () => {
        let result = options.houseAmenity.items.map((val) => {
            return (<View style={styles.houseItemModule}>
                <AntDesign name={houseItemCn[val]} style={styles.houseLayoutIcon} />
                <Text style={styles.houseLayoutDesc}>{code['house_item'][val] || '--'}</Text>
            </View>)
        })
        return (<View style={styles.houseItemBox}>{result}</View>)
    }
    return (
        <View style={styles.container}>
            {loading ? <Spinner /> :
                <View>
                    <View style={styles.flexRow}>
                        <Text style={styles.title}>{options.houseRatePlan.rentPrice}</Text>
                        <Text style={styles.desc}>元/月</Text>
                        <AntDesign style={[styles.rightBtn, options.collectedByMe && styles.activeBtn]}
                            onPress={() => { changeData('collectedByMe', !options.collectedByMe) }}
                            name={options.collectedByMe ? 'heart' : 'hearto'}></AntDesign>
                    </View>
                    <Text style={styles.secondDes}>{code['house_type'][options.houseType]}·{options
                        .regionFullName}·{options.houseLayout.roomCount}房·{options.houseLayout.hallCount}厅·{options.houseLayout.toiletCount}卫</Text>
                    {renderHouseLayout()}
                    {renderHouseAddition('spots')}
                    <Text style={styles.moduleTitle}>房源简介</Text>
                    {renderHouseItem()}
                    <Text style={{ marginBottom: 16 }}>沙头角一房一厅，小区门口就有绿动共享单车{options.houseAddition.description || '--'}</Text>
                    {renderHouseAddition('requirements')}
                    <Text style={styles.moduleTitle}>地理位置</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        marginVertical: 8,

    },
    houseLayoutBox: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    houseLayoutModule: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
    },
    houseLayoutTitle: {
        color: '#282828',
        fontSize: 18,
        marginBottom: 8
    },
    houseLayoutDesc: {
        fontSize: 12,
        color: '#7C7C7C'
    },
    houseAdditionBox: {
        flexDirection: 'row',
        marginBottom: 20
    },
    houseAdditionModule: {
        backgroundColor: '#ECF2FF',
        marginRight: 16,
        borderRadius: 5
    },
    houseAdditionText: {
        fontSize: 14,
        color: '#7C7C7C',
        paddingHorizontal: 15,
        paddingVertical: 6
    },
    houseItemBox: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexWrap: 'wrap',
        // justifyContent: 'space-between'
    },
    houseLayoutIcon: {
        fontSize: 24,
        color: '#666666',
        paddingBottom: 5
    },
    houseItemModule: {
        alignItems: 'flex-start',
        marginHorizontal: 20,
        marginBottom: 20
    }
});
export default HouseDetail;
