import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import {Button, Card} from 'react-native-elements';
import * as HomeAction from '../../store/home/index';
import Theme from '../../style/colors';

function AuthenticationPage(props) {
  function changeSelect(index) {
    const newList = [...AuthList];
    console.log(newList);
    // const List = newList.map((u, i) => {
    //   console.log('u', u);
    //   // if (i === index) {
    //   //   u.selected = true;
    //   // } else {
    //   //   u.selected = false;
    //   // }
    // });
    // setAuthList((newList[index].selected = false));
  }
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
    props.navigation.navigate(AppRoute.AUTHENTICATION);
    const response = await http.get('/rp/verifyToken');
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
  const [AuthList, setAuthList] = useState([
    {
      name: '人脸识别',
      type: '自动识别',
      description: '适合中国公民，5分钟内验证完毕',
      id: 1,
      selected: true,
    },
    {
      name: '身份证认证',
      type: '人工审核',
      description: '适合中国老人小孩或者人脸识别失败的用户，两个工作日内完成',
      id: 2,
      selected: false,
    },
    {
      name: '护照认证',
      type: '人工审核',
      description: '适合持有护照的非中国公民，两个工作日内完成',
      id: 3,
      selected: false,
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18}}>请选择认证方式：</Text>
      {AuthList.map((u, i) => {
        return (
          <View
            style={u.selected ? styles.selectedStyle : styles.authListStyle}
            key={i}
            onPress={changeSelect(i)}>
            <Text>
              <Text style={u.selected ? styles.SelectName : styles.name}>
                {u.name}{' '}
              </Text>
              <Text
                style={
                  u.selected ? styles.selectSecondaryText : styles.secondaryText
                }>
                {u.type}
              </Text>
            </Text>
            <Text
              style={
                u.selected ? styles.selectSecondaryText : styles.secondaryText
              }>
              {u.description}
            </Text>
          </View>
        );
      })}
      <Button
        style={styles.verifyBtn}
        title="开始认证"
        onPress={handlerVerify}
      />
    </View>
  );
}

// reducer获取
function mapStateToProps(state) {
  return {
    // userInfo: state.userInfo,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(HomeAction, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(AuthenticationPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    // alignItems: 'center',
  },
  authListStyle: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginTop: 15,
    paddingLeft: 10,
  },
  selectedStyle: {
    backgroundColor: Theme.accent,
    paddingVertical: 20,
    marginTop: 15,
    paddingLeft: 10,
  },
  SelectName: {
    color: '#fff',
    fontSize: 18,
  },
  name: {
    fontSize: 18,
  },
  secondaryText: {
    fontSize: 13,
    marginTop: 10,
    color: Theme.textSecondary,
  },
  selectSecondaryText: {
    fontSize: 13,
    marginTop: 10,
    color: '#fff',
  },
  verifyBtn: {
    marginTop: 30,
  },
});
