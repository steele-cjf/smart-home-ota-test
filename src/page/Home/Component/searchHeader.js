import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native'
import { Button, Icon, Text, Left, Right, Header, Body, Input } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icomoon from '../../../common/Icomoon';
import { AppRoute } from '../../../navigator/AppRoutes';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

export default function SearchHeader(props) {
    const [searchItem, setSearchItem] = useState('');
    return (
        <View>
            <Header hasSegment style={styles.container}>
                <View>
                    <Button transparent onPress={() => NavigatorService.goBack()} style={{flex: 1, alignItems: 'center', paddingRight: 10}} >
                        <AntDesign name="left" style={[styles.actionColor]} />
                        <Text style={[styles.backBtn]}>返回</Text>
                    </Button>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: '#E9E9E9', height: 30, borderRadius: 20}}>
                    <EvilIcons name='search' style={styles.searchIcon} />
                    <Input
                        style={styles.Input}
                        value={searchItem}
                        onChangeText={setSearchItem}
                        onBlur={() => props.getSearchParams(searchItem)}
                        placeholder='搜索房源' />
                </View>
                <View>
                    <Entypo style={styles.RightIcon} name='location' onPress={() => NavigatorService.navigate(AppRoute.MAPHOUSE)} />
                </View>
            </Header>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        // height: 44,
        // padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    selectBox: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#E9E9E9',
        borderTopColor: '#E9E9E9',
        paddingVertical: 12,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    actionColor: {
        color: Theme.textLink,
        fontSize: $screen.scaleSize(14),
    },
    searchIcon: {
        color: '#7C7C7C',
        fontSize: $screen.scaleSize(18),
        paddingLeft: 10,
    },
    Input: {
        paddingLeft: 10,
        fontSize: $screen.scaleSize(14)
    },
    select: {
        flex: 2,
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center'
    },
    RightIcon: {
        color: '#333333',
        fontSize: $screen.scaleSize(23),
        width: '100%',
        textAlign: 'center',
        paddingLeft: 10,
    },
    text: {
        color: '#282828',
        paddingHorizontal: 10
    },
    backBtn: {
        color: Theme.backLink,
        fontSize: 14,
        fontWeight: 'normal',
        paddingLeft: 5,
        paddingRight: 0
    },
    backBtnAndroid: {
        left: -10,
        top: 1
    }
});
