import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { Button, Icon, Text, Left, Right, Header, Body, Segment, Input } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AppRoute } from '../../../navigator/AppRoutes';


export default function SearchHeader(props) {
    return (
        <View>
            <Header hasSegment style={styles.container}>
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => NavigatorService.goBack()} >
                        <Icon name="md-chevron-back" style={{justifyContent: 'center'}}/>
                        <Text >返回</Text>
                    </Button>
                </Left>
                <Body style={{ flex: 3 }}>
                    <Feather name='search' style={styles.searchIcon} />
                    <Input style={styles.Input} placeholder='地区/小区' />
                </Body>
                <Right style={{ flex: 0.5 }}>
                    <Entypo style={styles.RightIcon} name='location' onPress={() => NavigatorService.navigate(AppRoute.MAPHOUSE)} />
                </Right>
            </Header>
            <Segment style={styles.selectBox}>
                <View style={styles.select}>
                    <Text style={styles.text}>位置</Text>
                    <AntDesign name='caretdown' />
                </View>
                <View style={{flex: 3, flexDirection: 'row'}}>
                    <Text style={styles.text}>方式/户型</Text>
                    <AntDesign name='caretdown' />
                </View>
                <View style={styles.select}>
                    <Text style={styles.text}>租金</Text>
                    <AntDesign name='caretdown' />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <FontAwesome name='sort' style={{fontSize: 14}}></FontAwesome>
                </View>
            </Segment>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 50,
        padding: 10
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
    searchIcon: {
        position: 'absolute',
        left: 5,
        top: 8,
        color: '#7C7C7C',
        fontSize: 12,
        zIndex: 10
    },
    Input: {
        backgroundColor: '#E9E9E9',
        height: 20,
        borderRadius: 10,
        width: '100%',
        paddingLeft: 20
    },
    select: {
        flex: 2,
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center'
    },
    RightIcon: {
        color: '#333333',
        fontSize: 19
    },
    text: {
        color: '#282828',
        paddingHorizontal: 10
    }
});
