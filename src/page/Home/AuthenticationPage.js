import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  Text,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  findNodeHandle,
  Platform,
} from 'react-native';
import {Button} from 'react-native-elements';
import {AppRoute} from '../../navigator/AppRoutes';
import {getVerifyToken} from '../../store/home/index';
import Theme from '../../style/colors';
import storage from '../../util/storage';

function AuthenticationPage(props) {
  function changeSelect(i) {
    setSelectIndex(selectIndex => (selectIndex = i));
  }
  function getVerifyResult() {
    // const data = {
    //   bizId: tokenObj.bizId,
    // };
    // console.log('tokenObj', tokenObj);
    // http
    //   .get('/rp/verifyResult', data)
    //   .then(res => {
    //     if (!res.code) {
    //       showToast('认证成功');
    //     } else {
    //       showToast(res.message);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  function personalVerify() {
    console.log('ddd', Platform.OS);
    console.log('userId', userId);
    props.getVerifyToken({userId: '480077089862602752'}, res => {
      if (res.code) {
        showToast(res.message);
        return;
      }
      let token = res.data.verifyToken
      if (Platform.OS === 'ios') {
        let domId = findNodeHandle(AliyunVerify.current)
        NativeModules.RealPersonAuth.addEvent(domId, token)
        return
      }
      // 
      NativeModules.AliyunVerify.show(token, ret => {
        if (ret.result === 'success') {
          getVerifyResult;
        }
      });
    });
  }

  function handlerVerify() {
    if (selectIndex === 0) {
      personalVerify();
    } else if (selectIndex === 1) {
      props.navigation.navigate(AppRoute.IDCARDVERTIFY);
    } else {
      props.navigation.navigate(AppRoute.PASSPORTVERTIFY);
    }
  }

  useEffect(() => {
    storage.get('info').then(info => {
      setUserId(info.id);
      console.log('id', userId);
    });
  });

  const [AuthList] = useState([
    {
      name: '人脸识别',
      type: '自动识别',
      description: '适合中国公民，5分钟内验证完毕',
      id: 1,
    },
    {
      name: '身份证认证',
      type: '人工审核',
      description: '适合中国老人小孩或者人脸识别失败的用户，两个工作日内完成',
      id: 2,
    },
    {
      name: '护照认证',
      type: '人工审核',
      description: '适合持有护照的非中国公民，两个工作日内完成',
      id: 3,
    },
  ]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [userId, setUserId] = useState(0);
  const AliyunVerify = useRef()
  return (
    <View style={styles.container} ref={AliyunVerify}>
      <Text style={{fontSize: 18}}>请选择认证方式：</Text>
      {AuthList.map((u, i) => {
        return (
          <TouchableOpacity
            style={
              i === selectIndex ? styles.selectedStyle : styles.authListStyle
            }
            key={i}
            onPress={() => changeSelect(i)}>
            <Text>
              <Text style={i === selectIndex ? styles.SelectName : styles.name}>
                {u.name}{' '}
              </Text>
              <Text
                style={
                  i === selectIndex
                    ? styles.selectSecondaryText
                    : styles.secondaryText
                }>
                {u.type}
              </Text>
            </Text>
            <Text
              style={
                i === selectIndex
                  ? styles.selectSecondaryText
                  : styles.secondaryText
              }>
              {u.description}
            </Text>
          </TouchableOpacity>
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
    userInfo: state.userInfo,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({getVerifyToken}, dispatch);
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
