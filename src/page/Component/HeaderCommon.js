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
    const PropsLeftPress = () => {
        if (props.options.leftPress) {
            props.options.leftPress()
        } else {
            NavigatorService.goBack()
        }
    }
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
            <TouchableOpacity transparent style={{ display: options.rightShow || 'none', alignItems: 'center', padding: 5 }}
                onPress={() => PropsRightPress()}>
                <Text style={styles.rightText}>{options.rightTitle || '--'}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <Header style={styles.container}>
            <Left style={Platform.OS == 'android' && { flex: 1 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: '100%'}} onPress={PropsLeftPress}>
                    {/* <Icon style={styles.actionColor} name="left" /> */}
                    {/* <AntDesign name="left" style={[styles.actionColor, Platform.OS == 'android' && styles.androidIcon]} /> */}
                    <AntDesign name="left" style={[styles.actionColor]} />
                    {renderBackTitle()}
                </TouchableOpacity>
            </Left>
            <Body style={[styles.BodyBox, Platform.OS == 'android' && styles.androidBody]}>
                <Text style={styles.BodyTitle} numberOfLines={1}>{options.title || '--'}</Text>
            </Body>
            <Right style={Platform.OS == 'android' && { flex: 1 }}>
                {renderRightButton()}
            </Right>
        </Header>)
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.08)', 
    },
    actionColor: {
        color: Theme.textLink,
        fontSize: $screen.scaleSize(14),
        marginRight: 10,
        left: 3
    },
    BodyBox: {
        alignItems: 'center',
    },
    BodyTitle: {
        color: '#282828',
        fontSize: $screen.scaleSize(16),
        width: 200,
        textAlign: 'center'
    },
    backText: {
        color: Theme.textLink,
        fontSize: $screen.scaleSize(14),
    },
    rightText: {
        color: Theme.textLink,
        fontSize: $screen.scaleSize(14),
    },
    androidIcon: {
        top: 1,
        right: -6
    },
    androidBody: {
        textAlign: 'center',
        flex: 1
    }
})