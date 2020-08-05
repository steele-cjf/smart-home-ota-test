import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import { Text, Input, Button, CheckBox } from 'react-native-elements';
// import {Text, Input} from 'react-native-elements';
// import {Button} from 'native-base';
import { AppRoute } from '../../navigator/AppRoutes';
import showToast from '../../util/toast';
import storage from '../../util/storage';

function LoginPage(props) {
  function validateField(field) {
    let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    switch (field) {
      case 'mobile':
        const userMsg = phoneReg.test(mobile);
        setMobileError(userMsg ? null : '请输入正确的手机号');
        if (!mobile) {
          refMobile.current.shake();
        }
        if (mobile) {
          setSendStatus(ifSend => (ifSend = false));
        }
        return !!userMsg;
      case 'verifyCode':
        setVerifyCodeError(verifyCode ? null : '请输入短信验证码');
        if (!verifyCode) {
          refVerifyCode.current.shake();
        }
        return !!verifyCode;
      default:
        return true;
    }
  }
  function storageDataDictionary() {
    props.getAllData(res => {
      // console.log('resss', res.data);
      let result = {};
      res.data.forEach(item => {
        result[item.name] = item.dictionaries;
      });
      storage.set('code', result);
    });
  }
  // action
  function handleSubmit() {
    // props.navigation.navigate(AppRoute.HOME);
    const data = {
      mobile: mobile,
      verifyCode: verifyCode,
    };
    if (['mobile', 'verifyCode'].every(validateField)) {
      console.log(777, data)
      props.handleLogin(data, res => {
        console.log(9999, res)
        if (!res.code) {
          storage.set('token', res.data.accessToken);
          storageDataDictionary();
          props.navigation.navigate(AppRoute.HOME);
        } else {
          showToast(res.message);
        }
      });
    }
  }
  function handleGetCode() {
    setSendStatus(ifSend => (ifSend = true));
    const data = {
      mobile: mobile,
    };
    
    props.getVerifyCode(data, res => {
      console.log('code', res);
      if (!res.code) {
        showToast('验证码已发送，请注意查收！');
      } else {
        showToast(res.message);
      }
    });
  }

  const [ifSend, setSendStatus] = useState(true);

  const refMobile = useRef(null);
  const refVerifyCode = useRef(null);
  const [mobile, setMobile] = useState(13661992793);
  const [verifyCode, setVerifyCode] = useState(608653);
  const [mobileError, setMobileError] = useState(null);
  const [verifyCodeError, setVerifyCodeError] = useState(null);
  const [checked, setChecked] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>登录</Text>
      <Text style={styles.subtitle}>欢迎使用慧眼居</Text>
      <Input
        inputStyle={styles.inputPhone}
        ref={refMobile}
        keyboardType="numeric"
        placeholder="请输入中国大陆手机号"
        placeholderTextColor='#C7C7C7'
        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        value={mobile}
        errorMessage={mobileError}
        onSubmitEditing={() => refMobile.current.focus()}
        onChangeText={setMobile}
        onBlur={e => validateField('mobile')}
      />
      <View>
        <Input
          inputStyle={styles.verCodeInput}
          ref={refVerifyCode}
          keyboardType="numeric"
          placeholder="请输入短信验证码"
          placeholderTextColor="#C7C7C7"
          leftIcon={{type: 'font-awesome', name: 'comment'}}
          value={verifyCode}
          errorMessage={verifyCodeError}
          onSubmitEditing={() => refVerifyCode.current.focus()}
          onChangeText={setVerifyCode}
        />
        <Button containerStyle={styles.codeBtnPosition} buttonStyle={styles.verCodeBtn} titleStyle={styles.verCodeTitle}
          title="发送短信验证码"
          disabled={ifSend}
          type="solid"
          onPress={handleGetCode}
        />
      </View>
      <View>
        <CheckBox containerStyle={styles.checkBoxContainer} titleStyle={styles.checkBoxTitle}
          title='同意'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={checked}
          onPress={() => setChecked(!checked)}
        />
        <Button containerStyle={styles.protocolContainer} titleStyle={styles.protocolTitle}
          type='clear'
          title='《用户服务协议》'
        />
      </View>
      <Button buttonStyle={styles.logBtn} title="登录" onPress={handleSubmit} />
      <Text style={styles.tipTitle}>若手机号未注册将自动注册为新用户</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 128,
  },
  loginTitle: {
    fontSize: 32,
    color: '#527BDF',
  },
  subtitle: {
    fontSize: 14,
    color: '#7C7C7C',
    marginTop: 14,
    marginBottom: 92,
  },
  inputPhone: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  verCodeInput: {
    fontSize: 14,
    color: '#7C7C7C',
    width: 30,
    marginRight: 168,
  },
  codeBtnPosition: {
    position: 'absolute',
    right: 10,
    top: 7,
  },
  verCodeBtn: {
    width: 147,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#5C8BFF',
  },
  verCodeTitle: {
    fontSize: 14,
  },
  checkBoxContainer: {
    marginLeft: -10,
    marginTop: -25,
    width: 75,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  checkBoxTitle: {
    fontSize: 14,
    color: '#282828',
  },
  protocolContainer: {
    position: 'absolute',
    left: 65,
    top: -19,
  },
  protocolTitle: {
    fontSize: 14,
    color: '#527BDF',
  },
  logBtn: {
    marginTop: 25,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5C8BFF',
  },
  tipTitle: {
    marginTop: 14,
    fontSize: 14,
    color: '#C7C7C7',
    textAlign: 'center',
  },
});
export default LoginPage;
