import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
// import Icon from 'react-native-vector-icons';
import {Input, Button} from 'react-native-elements';
import {AppRoute} from '../navigator/AppRoutes';
import md5 from 'md5';
import showToast from '../util/toast';

export const LoginPage = ({navigation, dispatch}) => {
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
        return !!userMsg;
      case 'password':
        const pwdMsg = passwordReg.test(password);
        setPasswordError(pwdMsg ? null : '至少包含数字和字母6-16个字符');
        if (!password) {
          refPassword.current.shake();
        }
        return !!pwdMsg;
      default:
        return true;
    }
  }
  function handleSubmit() {
    // console.log(navigation.navigate(AppRoute.HOME));
    const data = {
      username: userName,
      password: md5(password),
    };
    if (['userName', 'password'].every(validateField)) {
      http
        .post('/auth/login', data)
        .then(res => {
          if (!res.code) {
            navigation.navigate(AppRoute.HOME);
          } else {
            showToast(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  const refUserName = useRef(null);
  const refPassword = useRef(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [userNameError, setUserNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  return (
    <View style={styles.container}>
      <Input
        ref={refUserName}
        keyboardType="numeric"
        placeholder="手机号"
        value={userName}
        errorMessage={userNameError}
        onSubmitEditing={() => refPassword.current.focus()}
        onChangeText={setUserName}
      />
      <Input
        ref={refPassword}
        placeholder="密码"
        secureTextEntry
        value={password}
        errorMessage={passwordError}
        onSubmitEditing={handleSubmit}
        onChangeText={setPassword}
      />
      <Button style={styles.logBtn} title="登录" onPress={handleSubmit} />
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
  logBtn: {
    marginVertical: 15,
    marginHorizontal: 10,
    height: 40,
    borderRadius: 5,
  },
});
