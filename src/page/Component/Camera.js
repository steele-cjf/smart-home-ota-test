import React, { useState, useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openCamera, getScanResult } from '../../store/common/index';

import { View, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';

function Camera(props) {
    var cameraRef = useRef(null)
    const [camera, setCamera] = useState({})

    const scanCode = (result) => {
        let { data } = result
        props.getScanResult(data, (res) => {
            hideScan(res)
        })
        return
    }
    const hideScan = (res) => {
        props.openCamera({ open: false, result: res })
        setCamera({ open: false })
    }

    useEffect(() => {
        if (props.cameraOpt && props.cameraOpt.open) {
            if (Platform.OS === 'android') {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
                    .then(res => {
                        if (res !== 'granted') {
                            showToast('相机权限没打开', '请在手机的“设置”选项中,允许访问您的摄像头和麦克风')
                        }
                        else setCamera(props.cameraOpt)
                    });
            } else {
                setCamera(props.cameraOpt)
                // if (cameraRef.current) {
                //     console.log(999999, cameraRef.current)
                //     cameraRef.current.checkDeviceAuthorizationStatus()
                //         .then(access => {
                //             if (!access) {
                //                 showToast('相机权限没打开', '请在iPhone的“设置-隐私”选项中,允许访问您的摄像头和麦克风')
                //             }
                //             else setCamera(props.cameraOpt)
                //         });
                // }
            }
        }
    }, [props.cameraOpt])

    return (
        <View style={[styles.container, camera && camera.open && styles.show]}>
            {camera && camera.open && <RNCamera
                ref={ref => {
                    cameraRef = ref;
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
                    buttonNegative: 'Cancel'
                }}
                onBarCodeRead={(result) => {
                    scanCode(result)
                }}>
                <View style={styles.cameraBox}>
                    <Avatar
                        size="small"
                        title="X"
                        rounded
                        onPress={() => hideScan(null)}
                        activeOpacity={0.7}
                        containerStyle={styles.cancelBtn}
                    />
                </View>
                <View style={styles.centerSquare}></View>
            </RNCamera>}
        </View>
    );
}
// reducer获取
function mapStateToProps(state) {
    return {
        cameraOpt: state.cameraOpt
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ openCamera, getScanResult }, dispatch);
}
export default connect(
    mapStateToProps,
    matchDispatchToProps,
)(Camera);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: "none"
    },
    show: {
        display: 'flex'
    },
    cancelBtn: {
        backgroundColor: 'blue',
        top: 40,
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
