import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from '../../style/colors';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfoUrl} from '../../store/user/index';


const MyQRCodePage = (props) => {
  
  useEffect(() => {
    getUserInfo(); 
    getUserInfoUrl(); 
  }, [props.userInfo]); 

  function getUserInfo() {
    var userInfoData = props.userInfo.data;
    let {name, mobile, avatarImageUrl} = userInfoData;
    if (!avatarImageUrl) {
      avatarImageUrl = 'ooo'
    }
    setUserInfo({name, mobile, avatarImageUrl});
  }

  function getUserInfoUrl() {
    var userId = props.userInfo.data.id;
    
    props.getUserInfoUrl(userId, url => {
      console.log('******getUserInfoUrl:', url);
      if (url) {
        setImageUrl(url);
      } else {
        showToast("90909");
      }
    });
  }

  const [userInfo, setUserInfo] = useState({});
  const [imageUrl, setImageUrl] = useState('ooo');  
  
  return(
    <View style={styles.containerStyle}>
      <Image style={styles.headImageStyle} source={{uri: userInfo.avatarImageUrl}} /> 

      <Text style={styles.textName}>{userInfo.name}</Text>
      <Text style={styles.textMobile}>{userInfo.mobile}</Text>
      <View style={styles.lineView} />
      <View style={styles.imageContainerStyle}>
        <Image style={styles.imageStyle} source={{uri: imageUrl}} />
      </View>
      <Text style={styles.textTip}>扫一扫上面的二维码图案，将我加入</Text>
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
    top: 16, 
    fontSize: 14,
    color: Theme.textDefault,
  },
  textMobile: {
    position: 'absolute',
    left: 88,
    top: 48, 
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
    marginTop: 30,
  },
  imageStyle: {
    height: 250, 
    width: 250,
  },
  textTip: {
    textAlign: 'center',
    marginTop: 24,
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
  return bindActionCreators({getUserInfoUrl}, dispatch);   
}

const VMyQRCodePage = connect(
  mapStateToProps,
  matchDispatchToProps
)(MyQRCodePage);

export default VMyQRCodePage;