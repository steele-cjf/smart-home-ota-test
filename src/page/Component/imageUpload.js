import React, { Component, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, PixelRatio } from 'react-native';
import { Text, Image } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default function Form(props) {
    const [avatarSource, setAvatarSource] = useState(null)
    function selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                setAvatarSource(source)
            }
        })
    }
    return (
        <TouchableOpacity onPress={() => { selectPhotoTapped() }} style={props.style || styles.avatar}>
            <View
                style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                {avatarSource === null ? (<Text style={styles.addBtn}>+</Text>)
                    : (<Image style={styles.avatar} source={avatarSource} />)}
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100
    },
    addBtn: {
        fontSize: 70,
        color: '#CCCCCC',
        fontWeight: "900"
    }
});