import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import {
    Header,
    Left,
    Right,
    Body
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function HeaderCommon(props) {
    const [options, setOptions] = useState({})
    useEffect(() => {
        setOptions(props.options)
    }, [props.options])
    const PropsRightPress = () => {
        props.options.rightPress && props.options.rightPress()
    }
    const renderBackTitle = () => {
        if (options.backTitle) {
            return (<Text style={styles.backText}>{options.backTitle}</Text>)
        }
        return null
    }
    const renderRightButton = () => {
        return (
            <TouchableOpacity transparent style={{ display: options.rightShow || 'none' }}
                onPress={() => PropsRightPress()}>
                <Text style={styles.rightText}>{options.rightTitle || '--'}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <Header style={styles.container}>
            <Left style={Platform.OS && { flex: 1 }}>
                <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => NavigatorService.goBack()}>
                    {/* <Icon style={styles.actionColor} name="left" /> */}
                    <AntDesign name="left" style={[styles.actionColor, Platform.OS && styles.androidIcon]} />
                    {renderBackTitle()}
                </TouchableOpacity>
            </Left>
            <Body style={[styles.BodyBox, Platform.OS && styles.androidBody]}>
                <Text style={styles.BodyTitle}>{options.title || '--'}</Text>
            </Body>
            <Right style={Platform.OS && { flex: 1 }}>
                {renderRightButton()}
            </Right>
        </Header>)
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 44,
    },
    actionColor: {
        color: Theme.textLink,
        fontSize: $screen.scaleSize(14),
        marginRight: 10,
    },
    BodyBox: {
        alignItems: 'center'
    },
    BodyTitle: {
        color: '#282828',
        fontSize: $screen.scaleSize(16)
    },
    backText: {
        color: Theme.textLink,
    },
    rightText: {
        color: Theme.textLink,
    },
    androidIcon: {
        top: 4,
        right: -6
    },
    androidBody: {
        textAlign: 'center',
        flex: 1
    }
})