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
import {getVerifyToken, getVerifyResult} from '../../store/home/index';
import Theme from '../../style/colors';
import storage from '../../util/storage';

function AuthenticationPage(props) {
  function changeSelect(i) {
    setSelectIndex(selectIndex => (selectIndex = i));
  }
  // function getVerifyResult() {
  //   const data = {
  //     bizId: tokenObj.bizId,
  //   };
  //   console.log('tokenObj', tokenObj);
  //   http
  //     .get('/rp/verifyResult', data)
  //     .then(res => {
  //       if (!res.code) {
  //         showToast('认证成功');
  //       } else {
  //         showToast(res.message);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  function personalVerify() {
    props.getVerifyToken({userId}, res => {
      if (res.code) {
        showToast(res.message);
        return;
      }
      console.log('ddddd', res.data);
      let {token, bizId} = res.data;
      if (Platform.OS === 'ios') {
        let domId = findNodeHandle(AliyunVerify.current);

        NativeModules.RealPersonAuth.addEvent(domId, token, (state, errorCode, message) => {
          //返回结果
          console.log(1111, state);
          console.log(2222, errorCode);
          console.log(3333, message);  
           
          if (state === 'RPStatePass') {
             showToast("认证返回成功");
             props.getVerifyResult({bizId});
          } else if (state === 'RPStateFail') {
             showToast("认证不通过");
          } else if (state === 'RPStateNotVerify') {
             showToast("未认证");
          }
        });

        //NativeModules.RealPersonAuth.addEvent(domId, token);
        return;
      }
      // 安卓活体认证
      NativeModules.AliyunVerify.show(res.data.verifyToken, ret => {
        console.log(99999, ret);
        if (ret === 'success') {
          // 认证结果返回
          props.getVerifyResult({bizId});
        } else {
          showToast('认证失败');
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
    });
  });
  useEffect(() => {
    console.log(9999, props.verfityResult);
  }, [props.verfityResult]);

  const [AuthList] = useState([
    {
      name: '人脸识别',
      type: '自动验证',
      description: '适合中国公民，5分钟内验证完毕',
      id: 1,
    },
    {
      name: '身份证',
      type: '人工审核',
      description: '适合中国老人小孩或人脸识别失败的用户，两个工作日内完成',
      id: 2,
    },
    {
      name: '护照',
      type: '人工审核',
      description: '适合持有护照的非中国公民，两个工作日内完成',
      id: 3,
    },
  ]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [userId, setUserId] = useState(0);
  const AliyunVerify = useRef();
  return (
    <View style={styles.container} ref={AliyunVerify}>
      <View>
        <Text style={styles.tipStatus}>当前状态：</Text>
        <Text style={styles.status}>未实名认证</Text>
      </View>
      <Text style={styles.verTitle}>请选择认证方式：</Text>
      {AuthList.map((u, i) => {
        return (
          <TouchableOpacity style={i === selectIndex ? styles.selectedStyle : styles.authListStyle}
          key={i}
          onPress={() => changeSelect(i)}>
            <Text style={i === selectIndex ? styles.SelectName : styles.name}>
              {u.name}
            </Text>
            <Text style={i === selectIndex ? styles.selectTypeText : styles.typeText}>
              {u.type}
            </Text>
            <Text style={i === selectIndex ? styles.selectSecondaryText : styles.secondaryText}>
              {u.description}
            </Text>
          </TouchableOpacity>
        );
      })}
      <Text style={styles.tipText}>
        {"为提高识别成功率： \n1、请本人认证 \n2、拍照请保持环境光线适中 \n3、面部清晰可见无遮挡"}
      </Text>
      <Button
        buttonStyle={styles.verifyBtn}
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
    verfityResult: state.verfityResult,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({getVerifyToken, getVerifyResult}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(AuthenticationPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white'
  },
  tipStatus: {
    fontSize: 14, 
    color: Theme.textSecondary,
  },
  status: {
    position: 'absolute',
    right: 0,
    fontSize: 14, 
    color: Theme.textDefault, 
    textAlign: 'right',
  },
  verTitle: {
    marginVertical: 20,
    fontSize: 14, 
    color: Theme.textDefault,
  },
  authListStyle: {
    marginBottom: 18,
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#C7C7C7',
  },
  selectedStyle: {
    marginBottom: 18,
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#527BDF',
  },
  SelectName: {
    color: '#527BDF',
    fontSize: 18,
  },
  name: {
    color: Theme.textDefault,
    fontSize: 18, 
  },
  typeText: {
    position: 'absolute',
    top: 22,
    right: 16,
    fontSize: 12,
    color: Theme.textSecondary,
  },
  selectTypeText: {
    position: 'absolute',
    top: 22,
    right: 16,
    fontSize: 12,
    color: '#527BDF',
  },
  secondaryText: {
    marginTop: 12,
    fontSize: 12,
    color: Theme.textDefault,
  },
  selectSecondaryText: {
    marginTop: 12,
    fontSize: 12,
    color: '#527BDF',
  },
  tipText: {
    padding: 12,
    fontSize: 12,
    color: Theme.textSecondary,
    borderRadius: 4,
    lineHeight: 17,
    backgroundColor: '#F0F0F0',
  },
  verifyBtn: {
    //position: 'absolute',
    //top: 280,
    //bottom: 60,
    marginTop: 185,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5C8BFF'
  },
});
