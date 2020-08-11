import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PixelRatio,
  Platform,
} from 'react-native';
import {Text, Avatar, Badge} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function ImageUpload(props) {
  const {imgUrl} = props;
  console.log('imgUrl', props);
  const [avatarSource, setAvatarSource] = useState({uri: imgUrl} || null);
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
        let source = {uri: response.uri};
        setAvatarSource(source);
        //注意，iOS 获取的图片地址要替换掉"file://",这是后面上传遇到的坑
        let imageObj = {
          uri:
            Platform.OS === 'ios'
              ? response.uri.replace('file://', '')
              : response.uri,
          name: response.fileName || 'upload.jpg',
          type: response.type,
        };
        props.setImageForm(imageObj);
      }
    });
  }
  return (
    <TouchableOpacity
      onPress={() => {
        selectPhotoTapped();
      }}>
      <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
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
              }}
              containerStyle={{position: 'absolute', top: -4, right: -4}}
            />
          </View>
        )}
      </View>
      {props.title && <Text style={{textAlign: 'center'}}>{props.title}</Text>}
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
    fontSize: 70,
    color: 'rgba(0, 0, 0, .05)',
    fontWeight: '700',
  },
});
