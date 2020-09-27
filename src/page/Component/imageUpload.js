import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PixelRatio,
  Platform,
  Text
} from 'react-native';
import { ActionSheet } from 'native-base'
import { Avatar, Badge } from 'react-native-elements';
//import ImagePicker from 'react-native-image-picker';
 import ImagePicker from 'react-native-image-crop-picker';
//  ImagePicker.openPicker({
//    skipBackup
//  })
//const initOptions = { width: 300, height: 400, useFrontCamera: true, mediaType: 'photo', multiple: false }
const initOptions = { 
  mediaType: 'photo', 
  multiple: false,
  compressImageQuality: 0.5,
  compressImageMaxWidth: 1000,
  compressImageMaxHeight: 1000,
  loadingLabelText : '加载中...',
  showCropGuidelines: false, 
}

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
    var optionsOld = {
      title: '请选择',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择相册',
      quality: 0.5,
      maxWidth: 1000,
      maxHeight: 1000,
      allowsEditing: false,
      noData: false,
      permissionDenied: {
        title: '权限拒绝',
        text: '请打开相机权限，才能从库中选择图像。',
        reTryTitle: '确定',
        okTitle: '重试'
      },
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    // ImagePicker.showImagePicker(optionsOld, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     showToast('系统设置拒绝访问相册权限')
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     console.log('4444444444fileSize:', response.fileSize/(1024*1024));
    //     showToast('图片大小'+response.fileSize/(1024*1024)+'M'); //test

    //     setAvatarSource({ uri: response.uri });
    //     let imageObj = {
    //       uri: Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri,
    //       name: response.fileName || 'upload.jpg',
    //       type: response.type,
    //     };
    //     props.setImageForm(imageObj);
    //   }
    // });
    //return

    if (options.multiple && props.imgUrl) {
      return; //图片多选时，只最后的空图片可点击弹出选项框; 单选可原图替换
    }

    if (actionSheet !== null) {
      actionSheet._root.showActionSheet(
        {
          options: ['拍照', '相册', '取消'],
          cancelButtonIndex: 2,
          title: "请选择"
        },
        buttonIndex => {
          if (buttonIndex < 2) {
            let arr = ['openCamera', 'openPicker']
            ImagePicker[arr[buttonIndex]](options)
            .then(image => {
              if (!options.multiple || buttonIndex === 0) { //拍照也是单张
                console.log('4444444444fileSize:', image.size/(1024*1024));
                let source = { uri: image.path };
                setAvatarSource(source);
                
                //注意，iOS 获取的图片地址要替换掉"file://",这是后面上传遇到的坑
                let imageObj = {
                  //uri: Platform.OS === 'ios' ? image.sourceURL : image.path,
                  uri: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
                  name: image.fileName || 'upload.jpg',
                  type: image.mime,

                };
                props.setImageForm(imageObj);
              } else {
                let imgObjs = [];
                image.map((itemImage, index) => {
                  let imageObj = {
                    //uri: Platform.OS === 'ios' ? itemImage.sourceURL : itemImage.path,
                    uri: Platform.OS === 'ios' ? itemImage.path.replace('file://', '') : itemImage.path,
                    name: itemImage.filename || 'upload.jpg',
                    type: itemImage.mime
                  };
                  imgObjs.push(imageObj);
                })
                props.setImageForm(imgObjs);
              }
            })
            .catch(err => {
              console.log('7777777', err)
              if (buttonIndex === 0) {
                showToast('系统设置了拒绝访问相机')
              } else {
                showToast('系统设置了拒绝访问相册')
              }
            });
          }
        }
      )
    }
  }


  return (
    <TouchableWithoutFeedback onPress={() => {selectPhotoTapped();}}>
      <View>
        <ActionSheet ref={(c) => { setActionSheet(c) }} />
        <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 10 }]}>
          {avatarSource === null ?
            (<Text style={styles.addBtn}>+</Text>) : (
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
      </View>
    </TouchableWithoutFeedback>
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
