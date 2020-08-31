import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from '../../style/colors';
import HeaderCommon from '../Component/HeaderCommon'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfoUrl } from '../../store/user/index';
import { useFocusEffect } from '@react-navigation/native';

const MyQRCodePage = (props) => {

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
      getUserInfoUrl();
    }, [props.route])
  )

  function getUserInfo() {
    var userInfoData = props.userInfo.data;
    let { name, mobile, avatarImageUrl} = userInfoData;

    let headImg;
    if (!avatarImageUrl) {
      headImg = require('../../assets/images/head.png');
    } else {
      headImg = {uri: avatarImageUrl};
    }
    setUserInfo({ name, mobile, headImg });
  }
  function getUserInfoUrl() { 
    var userId = props.userInfo.data.id;
    $postImage('/qrcode/' + userId + '/genUserInfoUrl', res => {
      setImageUrl(res.uri);
    })
  }

  const [userInfo, setUserInfo] = useState({});
  const [imageUrl, setImageUrl] = useState();

  return (
    <View>
      <HeaderCommon
        options={{
        backTitle: '返回',
        title: '二维码'
        }}
      />
      <View style={styles.containerStyle}>
        <Image style={styles.headImageStyle} source={userInfo.headImg} />
        <Text style={styles.textName}>{userInfo.name}</Text>
        <Text style={styles.textMobile}>{userInfo.mobile}</Text>
        <View style={styles.lineView} />
        <View style={styles.imageContainerStyle}>
          <Image style={styles.imageStyle} source={{ uri: imageUrl }} />
        </View>
        <Text style={styles.textTip}>扫一扫上面的二维码图案，将我加入</Text>
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Theme.background,
  },
  headImageStyle: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: 'gray',
  },
  textName: {
    position: 'absolute',
    left: 88,
    top: 18,
    fontSize: 14,
    color: Theme.textDefault,
  },
  textMobile: {
    position: 'absolute',
    left: 88,
    top: 44,
    fontSize: 14,
    color: Theme.textDefault,
  },
  lineView: {
    marginTop: 16,
    height: 1,
    backgroundColor: '#E9E9E9',
  },
  imageContainerStyle: {
    alignItems: 'center',
    marginTop: 34,
  },
  imageStyle: {
    height: 235,
    width: 235,
  },
  textTip: {
    textAlign: 'center',
    marginTop: 26,
    fontSize: 12,
    color: Theme.textSecondary,
  },
});


// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfoUrl }, dispatch);
}

const VMyQRCodePage = connect(
  mapStateToProps,
  matchDispatchToProps
)(MyQRCodePage);

export default VMyQRCodePage;