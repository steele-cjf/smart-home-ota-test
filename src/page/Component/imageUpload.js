import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PixelRatio,
  Platform,
  Text
} from 'react-native';
import { ActionSheet } from 'native-base'
import { Avatar, Badge } from 'react-native-elements';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
const initOptions = { width: 300, height: 400, useFrontCamera: true, mediaType: 'photo', multiple: false }
export default function ImageUpload(props) {
  const [avatarSource, setAvatarSource] = useState(null);
  const [actionSheet, setActionSheet] = useState(null);
  const [options, setOptions] = useState(initOptions);


  useEffect(() => {
    if (props.imgUrl) {
      setAvatarSource({ uri: props.imgUrl });
    } else {
      setAvatarSource(null)
    }
  }, [props.imgUrl]);
  useEffect(() => {
    // width height multiple: 是否多选
    setOptions(Object.assign({}, initOptions, props.options))
  }, [props.options]);

  function selectPhotoTapped() {
    if (actionSheet !== null) {
      actionSheet._root.showActionSheet(
        {
          options: ['拍照', '相册', 'cancel'],
          cancelButtonIndex: 2,
          title: "请选择"
        },
        buttonIndex => {
          if (buttonIndex < 2) {
            let arr = ['openCamera', 'openPicker']
            ImagePicker[arr[buttonIndex]](options).then(image => {
              let source = { uri: image.path };
              setAvatarSource(source);
              //注意，iOS 获取的图片地址要替换掉"file://",这是后面上传遇到的坑
              let imageObj = {
                uri:
                  Platform.OS === 'ios'
                    ? image.sourceURL
                    : image.path,
                name: image.filename || 'upload.jpg',
                type: image.mime
              };
              props.setImageForm(imageObj);
            });
          }
        }
      )
    }
  }
  return (
    <TouchableOpacity
      onPress={() => {
        selectPhotoTapped();
      }}>
      <ActionSheet ref={(c) => { setActionSheet(c) }} />
      <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 10 }]}>
        {avatarSource === null ? (
          <Text style={styles.addBtn}>+</Text>
        ) : (
            <View>
              <Avatar style={styles.avatar} source={avatarSource} />
              <Badge
                value="X"
                status="error"
                onPress={() => {
                  setAvatarSource(null);
                  props.setImageForm(null);
                  props.handlerDelete && props.handlerDelete();
                }}
                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
              />
            </View>
          )}
      </View>
      {props.title && <Text style={{ textAlign: 'center' }}>{props.title}</Text>}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  avatarContainer: {
    borderColor: '#C7C7C7', //'#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    textAlign: 'center',
  },
  addBtn: {
    fontSize: $screen.scaleSize(70),
    color: 'rgba(0, 0, 0, .05)',
    fontWeight: '700',
  },
});
