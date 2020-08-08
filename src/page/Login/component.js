/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {View, Keyboard, StyleSheet} from 'react-native';
import {Text, Input, Button, CheckBox} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {Button} from 'native-base';
import {AppRoute} from '../../navigator/AppRoutes';
import showToast from '../../util/toast';
import storage from '../../util/storage';
import Theme from '../../style/colors';
import {and} from 'react-native-reanimated';

function LoginPage(props) {
  function validateField(field) {
    switch (field) {
      case 'mobile': {
        let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        const validateFlag = phoneReg.test(mobile);
        return validateFlag;
      }
      case 'verifyCode': {
        let verCodeReg = /^\d{4,6}$/;
        const validateFlag2 = verCodeReg.test(verifyCode);
        return validateFlag2;
      }
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

  function storageMappingDictionary() {
    props.getDictionaryMapping(res => {
      storage.set('dictionaryMappings', res.data);
    });
  }

  function handleSubmit() {
    //props.navigation.navigate(AppRoute.HOME);

    if (!mobile) {
      showToast('请输入手机号');
      return;
    } else if (!validateField('mobile')) {
      showToast('请输入正确的手机号');
      return;
    } else if (!verifyCode) {
      showToast('请输入短信验证码');
      return;
    } else if (!validateField('verifyCode')) {
      showToast('请输入6位数字验证码');
      return;
    } else if (!checked) {
      showToast('您需要同意《用户服务协议》');
      return;
    }

    const data = {
      mobile: mobile,
      verifyCode: verifyCode,
    };;
    props.handleLogin(data, res => {
      if (!res.code) {
        storage.set('token', res.data.accessToken);
        storageDataDictionary();
        storageMappingDictionary();
        props.navigation.navigate(AppRoute.HOME);
      } else {
        showToast(res.message);
      }
    });
  }

  function handleGetCode() {
    if (!mobile) {
      //refMobile.current.shake();
      showToast('请输入手机号');
      return;
    } else if (!validateField('mobile')) {
      showToast('请输入正确的手机号');
      return;
    }

    const data = {
      mobile: mobile,
    };

    props.getVerifyCode(data, res => {
      console.log('code', res);
      if (!res.code) {
        showToast('验证码已发送，请注意查收！');
        setSendStatus(true);
      } else {
        showToast(res.message);
      }
    });
  }

  const [isSend, setSendStatus] = useState(false);
  const refMobile = useRef(null);
  const refVerifyCode = useRef(null);
  const [mobile, setMobile] = useState(18218025628); //13661992793
  const [verifyCode, setVerifyCode] = useState(494284); //560657
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
        placeholderTextColor={Theme.textMuted}
        //leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
        leftIcon={
          <AntDesign
            name="calendar"
            style={{fontSize: 14, color: Theme.primary, marginRight: 8}}
          />
        }
        value={mobile}
        //errorMessage={mobileError}
        // onSubmitEditing={() => refMobile.current.focus()}
        onChangeText={setMobile}
        onBlur={() => validateField('mobile')}
      />
      <View>
        <Input
          inputStyle={styles.verCodeInput}
          ref={refVerifyCode}
          keyboardType="numeric"
          placeholder="请输入短信验证码"
          placeholderTextColor={Theme.textMuted}
          //leftIcon={{type: 'font-awesome', name: 'comment'}}
          leftIcon={
            <AntDesign
              name="lock1"
              style={{fontSize: 14, color: Theme.primary, marginRight: 8}}
            />
          }
          value={verifyCode}
          //errorMessage={verifyCodeError}
          // onSubmitEditing={() => refVerifyCode.current.focus()}
          onChangeText={setVerifyCode}
        />
        <Button
          containerStyle={styles.codeBtnPosition}
          buttonStyle={styles.verCodeBtn}
          titleStyle={styles.verCodeTitle}
          title="发送短信验证码"
          disabled={isSend}
          type="solid"
          onPress={handleGetCode}
        />
      </View>
      <View>
        <CheckBox
          containerStyle={styles.checkBoxContainer}
          titleStyle={styles.checkBoxTitle}
          title="同意"
          //checkedIcon="dot-circle-o"
          // uncheckedIcon="circle-o"
          checkedColor={Theme.primary}
          uncheckedColor={Theme.primary}
          checked={checked}
          onPress={() => setChecked(!checked)}
        />
        <Button
          containerStyle={styles.protocolContainer}
          titleStyle={styles.protocolTitle}
          type="clear"
          title="《用户服务协议》"
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
    backgroundColor: Theme.background,
  },
  loginTitle: {
    fontSize: 32,
    color: '#527BDF',
  },
  subtitle: {
    fontSize: 14,
    color: Theme.textSecondary,
    marginTop: 14,
    marginBottom: 92,
  },
  inputPhone: {
    fontSize: 14,
    color: Theme.textSecondary,
  },
  verCodeInput: {
    fontSize: 14,
    color: Theme.textSecondary,
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
    backgroundColor: Theme.primary,
  },
  verCodeTitle: {
    fontSize: 14,
  },
  checkBoxContainer: {
    marginLeft: -10,
    marginTop: -20,
    width: 75,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  checkBoxTitle: {
    fontSize: 14,
    color: Theme.textDefault,
  },
  protocolContainer: {
    position: 'absolute',
    left: 65,
    top: -14,
  },
  protocolTitle: {
    fontSize: 14,
    color: '#527BDF',
  },
  logBtn: {
    marginTop: 25,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.primary,
  },
  tipTitle: {
    marginTop: 14,
    fontSize: 14,
    color: Theme.textMuted,
    textAlign: 'center',
  },
});
export default LoginPage;
