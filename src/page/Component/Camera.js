import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';

export default function Camera(props) {
    var camera = useRef(null)

    const scanCode = (result) => {
        props.getCode && props.getCode(result)
        return
    }
    return (
        <View style={styles.container}>
            <RNCamera
                ref={ref => {
                    camera = ref;
                }}
                captureAudio={false}
                style={{ flex: 1, justifyContent: 'center' }}
                flashMode={RNCamera.Constants.FlashMode.on}
                type={RNCamera.Constants.Type.back}
                autoFocusPointOfInterest={{ x: 0.5, y: 0.5 }}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                onBarCodeRead={(result) => {
                    scanCode(result)
                }}>
                <View style={styles.cameraBox}>
                    <Avatar
                        size="small"
                        title="X"
                        rounded
                        onPress={() => props.close()}
                        activeOpacity={0.7}
                        containerStyle={styles.cancelBtn}
                    />
                </View>
                <View style={styles.centerSquare}></View>
            </RNCamera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
    },
    cancelBtn: {
        backgroundColor: 'blue',
        top: 10,
        right: 10
    },
    cameraBox: {
        flex: 1,
        alignItems: 'flex-end'
    },
    centerSquare: {
        flex: 1,
        borderColor: 'rgba(0, 0, 0, .2)',
        borderWidth: 2,
        width: 200,
        height: 200,
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: [{
            translateX: 100
        }, {
            translateY: -100
        }],
        zIndex: 1000,
    }
});
