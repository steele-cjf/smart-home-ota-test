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
  const [imageUrl, setImageUrl] = useState(''); 
  
  return(
    <View style={styles.containerStyle}>
      <Image style={styles.headImageStyle} source={{uri: userInfo.avatarImageUrl}} />
      <Text>{userInfo.name}</Text>
      <Text>{userInfo.mobile}</Text>
      <Image style={styles.imageStyle} source={{uri: imageUrl}} />
      <Text>扫一扫上面的二维码图案，将我加入</Text>
    </View>
  );
  
}


const styles = StyleSheet.create({  
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Theme.background,
  },
  headImageStyle: {
    height: 48, 
    width: 48,
    backgroundColor: 'gray',
  },
  imageStyle: {
    height: 148, 
    width: 148,
    backgroundColor: 'gray',
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