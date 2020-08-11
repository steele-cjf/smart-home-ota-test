import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Theme from '../../style/colors';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPersonalInfo} from '../../store/user/index';  //接口不通
import {getUserInfo} from '../../store/home/index';

const PersonalInfoPage = (props) => {     
  
  function handleInfo() {
    //请求数据
    var info = props.userInfo;
    userId = info.data.id;

    // props.getPersonalInfo(userId, res => {  //接口不通
    //   console.log('res11:', res);
    //   console.log(8888, res.message);
  
    //   if (!res.code) {
    //     showToast('成功！');
    //   } else {
    //     showToast("90909"+res.message);
    //   }
    // });

    props.getUserInfo(res => {
      console.log('res11:', res);
      console.log(6666, res.message);
  
      if (!res.code) {
        showToast('成功！');
      } else {
        showToast("90909"+res.message);
      }
    });
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headView}>
        <Text style={styles.textTitle}>头像</Text>
        <Image style={styles.imageStyle} source={{uri:'blob:CF57F991-A050-4ED4-A8B0-4C7FB817663A?offset=0&size=221112',}}/> 
      </View>
      <View>
        <Text style={[styles.textTitle, styles.fontSize16]}>基本资料</Text>
      </View>

      <TouchableOpacity style={styles.btnStyle} onPress={handleInfo}> 
        <Text style={styles.btnTextStyle}>获取</Text>
      </TouchableOpacity>

    </View>
  ); 
}


const styles = StyleSheet.create({  
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Theme.background,
  },
  headView: {
    //marginBottom: 10,
    marginVertical: 10,
    backgroundColor: '#FFECEC',
  },
  textTitle: {
    paddingVertical: 16,
    fontSize: 14,
    color: Theme.textDefault,
    //backgroundColor: 'red',
  },
  fontSize16: {
    fontSize: 16,
  },
  imageStyle: {
    position: 'absolute',
    right: 0,
    height: 48, 
    width: 48,
    borderRadius: 24,
    backgroundColor: 'yellow',
  },
  topTextStyle1: {
    fontSize: 16,
    color: Theme.textDefault,
  },
  topTextStyle2: {
    fontSize: 14,
    color: Theme.textSecondary,
    marginTop: 10,
  },
  
  textContent: {
    position: 'absolute',
    left: 80,
    right: 0,
    paddingVertical: 10,
    textAlign: 'right',
    fontSize: 14,
    color: Theme.textDefault,
  },
  space: {
    marginTop: 45,
  },
  ImageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btnStyle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5C8BFF'
  },
  btnTextStyle: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 16, 
    color: '#FFFFFF', 
  },
});


// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
  };
}

function matchDispatchToProps(dispatch) {
  //return bindActionCreators({getPersonalInfo}, dispatch);   //接口不通
  return bindActionCreators({getUserInfo}, dispatch);   
}

const VPersonalInfoPage = connect(
  mapStateToProps,
  matchDispatchToProps
)(PersonalInfoPage);

export default VPersonalInfoPage;
