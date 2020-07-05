import React, {useState, useRef} from 'react';
import {View, StyleSheet, NativeModules, findNodeHandle} from 'react-native';
// import Icon from 'react-native-vector-icons';
import {Input, Button} from 'react-native-elements';
import {AppRoute} from '../navigator/AppRoutes';

export const RegisterPage = ({navigation, dispatch}) => {
  function validateField(field) {
    let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    let passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[^]{6,16}$/;
    switch (field) {
      case 'userName':
        const userMsg = phoneReg.test(userName);
        setUserNameError(userMsg ? null : '请输入正确的手机号');
        if (!userName) {
          refUserName.current.shake();
        }
        if (userMsg) {
          setSendStatus(ifSend => (ifSend = false));
        }
        return !!userMsg;
      case 'password':
        const pwdMsg = passwordReg.test(password);
        setPasswordError(pwdMsg ? null : '至少包含数字和字母6-16个字符');
        if (!password) {
          refPassword.current.shake();
        }
        return !!pwdMsg;
      case 'registerCode':
        setRegisterCodeError(registerCode ? null : '请输入短信验证码');
        if (!registerCode) {
          refRegisterCode.current.shake();
        }
        return !!registerCode;
      case 'password1':
        setPassword1Error(password === password1 ? null : '两次密码不一致');
        if (password !== password1) {
          refPassword1.current.shake();
        }
        return password === password1;
      default:
        return true;
    }
  }
  function handleSubmit() {
    // console.log(navigation.navigate(AppRoute.HOME));
    const data = {
      username: userName,
      password: password,
      registerCode: registerCode,
    };
    if (['userName', 'password'].every(validateField)) {
      http
        .post('/auth/register', data)
        .then(res => {
          if (!res.code) {
            showToast('注册成功, 即将跳转登录界面');
            navigation.navigate(AppRoute.Login);
          } else {
            showToast(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  function authReal () {
    console.log(8888, findNodeHandle(rootRef.current))
    const RealPersonAuth = NativeModules.RealPersonAuth
    RealPersonAuth.addEvent(findNodeHandle(rootRef.current), this.state.token || 'token')
  }

  function handleGetCode() {
    setSendStatus(ifSend => (ifSend = true));
    const data = {
      mobile: userName,
    };
    http
      .post('/sms/registrationCode', data)
      .then(res => {
        if (!res.code) {
          showToast('验证码已发送，请注意查收');
          setTimeout(function() {
            setSendStatus(ifSend => (ifSend = false));
          }, 60000);
        } else {
          setSendStatus(ifSend => (ifSend = false));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  const [ifSend, setSendStatus] = useState(true);

  const rootRef = useRef(null);
  const refUserName = useRef(null);
  const refPassword = useRef(null);
  const refPassword1 = useRef(null);
  const refRegisterCode = useRef(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [registerCode, setRegisterCode] = useState(null);
  const [userNameError, setUserNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [password1Error, setPassword1Error] = useState(null);
  const [registerCodeError, setRegisterCodeError] = useState(null);

  return (
    <View style={styles.container} ref='xxx' ref={rootRef}>
      <Input
        ref={refUserName}
        keyboardType="numeric"
        placeholder="手机号"
        value={userName}
        errorMessage={userNameError}
        onSubmitEditing={() => refPassword.current.focus()}
        onChangeText={setUserName}
        onBlur={e => validateField('userName')}
      />
      <View>
        <Input
          ref={refRegisterCode}
          keyboardType="numeric"
          placeholder="短信验证码"
          value={registerCode}
          errorMessage={registerCodeError}
          onSubmitEditing={() => refRegisterCode.current.focus()}
          onChangeText={setRegisterCode}
        />
        <Button
          title="获取验证码"
          disabled={ifSend}
          type="clear"
          onPress={handleGetCode}
        />
      </View>
      <Input
        ref={refPassword}
        placeholder="密码"
        secureTextEntry
        value={password}
        errorMessage={passwordError}
        onSubmitEditing={handleSubmit}
        onChangeText={setPassword}
      />
      <Input
        ref={refPassword1}
        placeholder="确认密码"
        secureTextEntry
        value={password1}
        errorMessage={password1Error}
        onSubmitEditing={handleSubmit}
        onChangeText={setPassword1}
      />
      <Button style={styles.logBtn} title="注册" onPress={handleSubmit} />
      <Button style={styles.logBtn} title="ios-实人认证" onPress={authReal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 160,
  },
  inputBox: {
    position: 'relative',
  },
  codeBtn: {
    position: 'absolute',
  },
  logBtn: {
    marginVertical: 15,
    marginHorizontal: 10,
    height: 40,
    borderRadius: 5,
  },
});
