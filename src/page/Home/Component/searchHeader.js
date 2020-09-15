import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native'
import { Button, Icon, Text, Left, Right, Header, Body, Input } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppRoute } from '../../../navigator/AppRoutes';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

export default function SearchHeader(props) {
    const [searchItem, setSearchItem] = useState('');
    return (
        <View>
            <Header hasSegment style={styles.container}>
                <Left style={[{ flex: 1 }, Platform.OS == 'android' && {top: -2, left: -2}]}>
                    <Button transparent onPress={() => NavigatorService.goBack()} >
                        <AntDesign name="left" style={styles.actionColor} />
                        <Text style={[styles.backBtn, Platform.OS == 'android' && styles.backBtnAndroid]}>返回</Text>
                    </Button>
                </Left>
                <Body style={{ flexDirection: 'row', flex: 4, alignItems: 'center', backgroundColor: '#E9E9E9', height: 30, borderRadius: 20, }}>
                    <EvilIcons name='search' style={styles.searchIcon} />
                    <Input
                        style={styles.Input}
                        value={searchItem}
                        onChangeText={setSearchItem}
                        onBlur={() => props.getSearchParams(searchItem)}
                        placeholder='搜索房源' />
                </Body>
                <Right style={{ flex: 0.5 }}>
                    <Entypo style={styles.RightIcon} name='location' onPress={() => NavigatorService.navigate(AppRoute.MAPHOUSE)} />
                </Right>
            </Header>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: 50,
        height: 44,
        padding: 10,
        backgroundColor: '#fff'
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
        marginRight: 10,
        //marginTop: 3,
        left: 3
    },
    searchIcon: {
        // position: 'absolute',
        // left: 5,
        // top: 8,
        color: '#7C7C7C',
        fontSize: $screen.scaleSize(18),
        paddingLeft: 10,
        // zIndex: 10
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
        fontSize: $screen.scaleSize(19)
    },
    text: {
        color: '#282828',
        paddingHorizontal: 10
    },
    backBtn: {
        color: Theme.backLink,
        fontSize: 14,
        fontWeight: 'normal',
        top: 0,
    },
    backBtnAndroid: {
        left: -10,
        top: 1
    }
});
