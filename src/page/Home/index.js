import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, NativeModules} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import { getUserInfo } from '../../store/home/index';

function HomePage(props) {
  function getVerifyResult() {
    const data = {
      bizId: tokenObj.bizId,
    };
    console.log('tokenObj', tokenObj);
    http
      .get('/rp/verifyResult', data)
      .then(res => {
        if (!res.code) {
          showToast('认证成功');
        } else {
          showToast(res.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function handlerVerify() {
    // const response = await http.get('/rp/verifyToken');
    // // const tokenObj = ;
    // if (!response.code) {
    //   console.log('response', response);
    //   await setTokenObj(tokenObj => (tokenObj = response.data));
    // } else {
    //   showToast(response.message);
    //   return;
    // }
    // NativeModules.AliyunVerify.show(tokenObj.verifyToken, ret => {
    //   showToast(ret.result);
    //   console.log(ret.result);
    //   if (ret.result === 'success') {
    //     getVerifyResult;
    //   }
    // });
  }

  const [tokenObj, setTokenObj] = useState({});

  // get store
  useEffect(() => {
    !props.userInfo && props.getUserInfo();
    console.log(9999, props.userInfo)
  }, [props, props.userInfo]);

  return (
    <View style={{marginTop: 150}}>
      <Text>您还未，</Text>
      <Button title="实名认证" onPress={handlerVerify} />
      <Button title="身份证人工验证" onPress={() => {props.navigation.navigate('IdCardVertifyPage');}} />
      <Button title="护照人工验证" onPress={() => {props.navigation.navigate('PassportVertifyPage');}} />
    </View>
  );
}

// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfo }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(HomePage);
