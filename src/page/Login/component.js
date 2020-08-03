import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';

import {Text, Input, Button} from 'react-native-elements';
import {AppRoute} from '../../navigator/AppRoutes';
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
      props.handleLogin(data, res => {
        console.log(res);
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
  const [verifyCode, setVerifyCode] = useState(595087);
  const [mobileError, setMobileError] = useState(null);
  const [verifyCodeError, setVerifyCodeError] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>登录</Text>
      <Text style={styles.subtitle}>欢迎使用慧眼居</Text>
      <Input
        ref={refMobile}
        keyboardType="numeric"
        placeholder="手机号"
        value={mobile}
        errorMessage={mobileError}
        onSubmitEditing={() => refMobile.current.focus()}
        onChangeText={setMobile}
        onBlur={e => validateField('mobile')}
      />
      <View>
        <Input
          ref={refVerifyCode}
          keyboardType="numeric"
          placeholder="短信验证码"
          value={verifyCode}
          errorMessage={verifyCodeError}
          onSubmitEditing={() => refVerifyCode.current.focus()}
          onChangeText={setVerifyCode}
        />
        <Button
          title="获取验证码"
          disabled={ifSend}
          type="clear"
          onPress={handleGetCode}
        />
      </View>
      <Button style={styles.logBtn} title="登录" onPress={handleSubmit} />
      <Text style={styles.title}>若手机号未注册将自动注册为新用户</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 32, //10
    paddingRight: 32, //10
    paddingTop: 128, //160
    //backgroundColor: 'red'
  },
  loginTitle: {
    fontSize: 32,
    color: '#527BDF',
    // marginTop: 30,
    // marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#7C7C7C',
    marginTop: 14,
    marginBottom: 82,    
    //backgroundColor: 'red',
  },
  title: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    paddingRight: 20,
  },
  logBtn: {
    marginVertical: 15,
    marginHorizontal: 10,
    height: 40,
    borderRadius: 5,
  },
});
export default LoginPage;
