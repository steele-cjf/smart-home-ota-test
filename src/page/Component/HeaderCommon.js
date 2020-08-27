import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import {
    Header,
    Left,
    Right,
    Body,
    Icon,
    Button
} from 'native-base';
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
            <TouchableOpacity transparent style={{display: options.rightShow || 'none'}}
                onPress={() => PropsRightPress()}>
                <Text style={styles.rightText}>{options.rightTitle || '--'}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <Header style={styles.container}>
            <Left>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => NavigatorService.goBack()}>
                    <Icon style={styles.actionColor} name="arrow-back" />
                    {renderBackTitle()}
                </TouchableOpacity>
            </Left>
            <Body style={styles.BodyBox}>
                <Text style={styles.BodyTitle}>{options.title || '--'}</Text>
            </Body>
            <Right>
                {renderRightButton()}

            </Right>
        </Header>)
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    actionColor: {
        color: Theme.textLink
    },
    BodyBox: {
        alignItems: 'center'
    },
    BodyTitle: {
        color: '#282828',
        fontSize: 16
    },
    backText: {
        color: Theme.textLink,
        top: 5
    },
    rightText: {
        color: Theme.textLink,
        flexWrap: 'wrap',
        width: 40
    }
})