/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Icon, Button, Left, Header, Text, Spinner } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Theme from '../../../style/colors';
import LocationsMap from '../../../page/Component/map/locations';
import { houseLayoutCn, houseItemCn, houseRatePlanCn } from '../config/houseDetailCn'
import showToast from '../../../util/toast';
import Entypo from 'react-native-vector-icons/Entypo';

const loc = {
    "name": "房子",
    latitude: 39.904989,
    longitude: 116.40,
    "type": 0
}
function HouseDetail(props) {
    const [options, setOptions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [code] = useState(props.code)
    useEffect(() => {
        setOptions(props.data)
        console.log('props.data', props.data)
        if (props.data) {
            setLoading(false)
        }
    }, [props, props.data])

    const changeCollection = (type, value) => {
        let res = Object.assign({}, options)
        res[type] = value
        setOptions(res)
        props.setCollection && props.setCollection({
            publishInfoId: options.id,
            add: value
        }, (res) => {
            if (!res.code && value) {
                showToast('已收藏')
            } else if (!res.code && !value) {
                showToast('已取消收藏')
            } else {
                showToast(res.message || '操作失败')
            }
        })
    }
    // 电话咨询
    const callPhone = () => {
        let phone = options.mobile || +86
        const url = `tel:${phone}`;
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    return showToast(`您的设备不支持该功能，请手动拨打 ${phone}`);
                }
                return Linking.openURL(url);
            })
            .catch(err => { showToast(`出错了：${err}`, 1.5); console.log(err) });
    }
    //建筑信息
    const renderHouseLayout = () => {
        let result = houseLayoutCn.map((item) => {
            let data = item.headKey ? options[item.headKey] : options
            let text = ''
            if (item.keyType === 'array') {
                text = (data[item.key[1]] || '--') + '/' + (data[item.key[0]] || '--') + '层'
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
        return (result.length && <View style={styles.houseLayoutBox}>{result}</View>) || null
    }
    // 房屋亮点(spots) & 出租要求(requirements)
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
        return (result.length && <View style={styles.houseAdditionBox}>{result}</View>) || null
    }
    // 房源信息
    const renderHouseItem = () => {
        let result = options.houseAmenity.items.map((val) => {
            return (<View style={styles.houseItemModule} key={val}>
                <AntDesign name={houseItemCn[val]} style={styles.houseLayoutIcon} />
                <Text style={styles.houseLayoutDesc}>{code['house_item'][val] || '--'}</Text>
            </View>)
        })
        return (result.length && <View style={styles.houseItemBox}>{result}</View>) || null
    }
    // 相关费用
    const renderHouseRatePlan = () => {
        let result = houseRatePlanCn.map((val) => {
            return (
                <View style={styles.houseRatePlanModule} key={val.key}>
                    <Text style={styles.houseRatePlanDesc}>{val.name}:</Text>
                    <Text style={styles.houseRatePlanText}>{options.houseRatePlan[val.key] || '--'} {val.unit}</Text>
                </View>
            )
        })
        result.unshift(
            <View style={styles.houseRatePlanModule}>
                <Text style={styles.houseRatePlanDesc}>装修:</Text>
                <Text style={styles.houseRatePlanText}>{code['house_decorator'][options.houseAmenity.decoration] || '--'}</Text>
            </View>)
        result.unshift(
            <View style={styles.houseRatePlanModule}>
                <Text style={styles.houseRatePlanDesc}>户型:</Text>
                <Text style={styles.houseRatePlanText}>{options.houseLayout.roomCount}室{options.houseLayout.hallCount}厅{options.houseLayout.toiletCount}卫</Text>
            </View>)
        return (result.length && <View style={styles.houseRatePlanBox}>{result}</View>) || null
    }
    //{code['house_type'][options.houseType]}·{options.regionFullName}·
    return (
        <View style={styles.container}>
            {loading ? <Spinner style={STYLES.spinner} color="#5C8BFF" /> :
                <View>
                    <View style={styles.flexRow}>
                        <Text style={styles.title}>{options.houseRatePlan.rentPrice}</Text>
                        <Text style={styles.desc}>元/月</Text>
                        <Text style={styles.depPay}>押{options.houseRatePlan.deposit}付{options.houseRatePlan.payment}</Text>
                        <AntDesign style={[styles.rightBtn, options.collectedByMe && styles.activeBtn]}
                            onPress={() => { changeCollection('collectedByMe', !options.collectedByMe) }}
                            name={options.collectedByMe ? 'heart' : 'hearto'}></AntDesign>
                    </View>
                    <Text style={styles.secondDes}>{options.title || '--'}</Text>
                    {renderHouseLayout()}
                    {renderHouseAddition('spots')}
                    <Text style={styles.moduleTitle}>房源简介</Text>
                    {renderHouseItem()}
                    {options.houseAddition.description ? <Text style={{ marginBottom: 16, color: '#282828', fontSize: $screen.scaleSize(12) }}>{options.houseAddition.description}</Text> : null}
                    {renderHouseAddition('requirements')}
                    {renderHouseRatePlan()}
                    <Text style={styles.moduleTitle}>地理位置</Text>
                    <View style={styles.locBox}>
                        <Entypo style={styles.locIcon} name='location-pin' />
                        <Text style={styles.locText}>{options.address || loc.name}</Text>
                    </View>
                    <View style={styles.mapBox}>
                        <LocationsMap loc={{
                            latitude: options.latitude || loc.latitude,
                            longitude: options.longitude || loc.longitude,
                            name: options.address || loc.name
                        }} />
                    </View>
                    <Button full style={styles.btn} onPress={() => callPhone()}>
                        <Text>电话咨询</Text>
                    </Button>
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
        fontSize: $screen.scaleSize(24),
        paddingRight: 5
    },
    desc: {
        fontSize: $screen.scaleSize(12),
        top: 10,
        color: Theme.primary
    },
    flexRow: {
        textAlignVertical: 'bottom',
        flexDirection: 'row'
    },
    rightBtn: {
        position: 'absolute',
        right: 16,
        fontSize: $screen.scaleSize(20),
        color: '#666',
        // top: 10
    },
    activeBtn: {
        color: '#E7263E'
    },
    secondDes: {
        color: '#282828',
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 24,
        fontSize: $screen.scaleSize(18)
    },
    moduleTitle: {
        color: '#282828',
        marginVertical: 8,
    },
    houseLayoutBox: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    houseLayoutModule: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10
    },
    houseLayoutTitle: {
        color: '#282828',
        fontSize: $screen.scaleSize(18),
        marginBottom: 8
    },
    houseLayoutDesc: {
        fontSize: $screen.scaleSize(12),
        color: '#7C7C7C'
    },
    houseAdditionBox: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    houseAdditionModule: {
        backgroundColor: '#ECF2FF',
        marginRight: 16,
        borderRadius: 5,
        marginBottom: 10
    },
    houseAdditionText: {
        fontSize: $screen.scaleSize(14),
        color: '#7C7C7C',
        paddingHorizontal: 15,
        paddingVertical: 6
    },
    houseItemBox: {
        flexDirection: 'row',
        paddingVertical: 20,
        // paddingHorizontal: 20,
        flexWrap: 'wrap',
        // justifyContent: 'space-between'
    },
    houseLayoutIcon: {
        fontSize: $screen.scaleSize(24),
        color: '#666666',
        paddingBottom: 5
    },
    houseItemModule: {
        alignItems: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 10,
        width: 40,
        // backgroundColor:'red',
        marginBottom: 25
    },
    houseRatePlanBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 15,
        flexDirection: 'row'
    },
    houseRatePlanModule: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20
    },
    houseRatePlanDesc: {
        color: '#7C7C7C',
        fontSize: $screen.scaleSize(14),
        paddingRight: 5
    },
    houseRatePlanText: {
        color: '#282828',
        position: 'absolute',
        right: 0,
        fontSize: $screen.scaleSize(14)
    },
    mapBox: {
        width: '100%',
        height: 200,
        backgroundColor: 'red',
        marginTop: 10
    },
    btn: {
        backgroundColor: '#5C8BFF',
        borderRadius: 50,
        marginTop: 35
    },
    locBox: {
        backgroundColor: '#F5F7F9',
        padding: 9,
        marginBottom: 12,
        flexDirection: 'row',
    },
    locIcon: {
        textAlignVertical: 'center',
        paddingRight: 10,
        fontSize: 15,
        color: '#7C7C7C'
    },
    locText: {
        flex: 1,
        color: '#282828',
        fontSize: 14
    },
    depPay: {
        backgroundColor: '#F5F7F9',
        borderRadius: 4,
        color: '#7C7C7C',
        paddingHorizontal: 10,
        height: 20,
        textAlignVertical: 'center',
        marginLeft: 10,
        fontSize: $screen.scaleSize(12),
        // top: 15
    }
});
export default HouseDetail;
