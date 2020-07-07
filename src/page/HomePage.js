import React, {useState} from 'react';
import {View, Text, NativeModules} from 'react-native';
import {Button} from 'react-native-elements';
import http from '../util/http';

export const HomePage = ({navigation, dispatch}) => {
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
    const response = await http.get('/rp/verifyToken');
    // const tokenObj = ;
    if (!response.code) {
      console.log('response', response);
      await setTokenObj(tokenObj => (tokenObj = response.data));
    } else {
      showToast(response.message);
      return;
    }
    NativeModules.AliyunVerify.show(tokenObj.verifyToken, ret => {
      showToast(ret.result);
      console.log(ret.result);
      if (ret.result === 'success') {
        getVerifyResult;
      }
    });
  }

  const [tokenObj, setTokenObj] = useState({});

  return (
    <View style={{marginTop: 150}}>
      <Text>您还未实名认证，</Text>
      <Button title="去实名" onPress={handlerVerify} />
    </View>
  );
};
