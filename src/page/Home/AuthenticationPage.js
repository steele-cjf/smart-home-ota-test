import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  findNodeHandle,
  Platform,
} from 'react-native';
import { AppRoute } from '../../navigator/AppRoutes';
import { getVerifyToken, getVerifyResult } from '../../store/home/index';
import Theme from '../../style/colors';
import HeaderCommon from '../Component/HeaderCommon'

function AuthenticationPage(props) {
  function changeSelect(i) {
    setSelectIndex(selectIndex => (selectIndex = i));
  }

  function personalVerify() {
    console.log('userId2:*****', userId)
    props.getVerifyToken({ userId }, res => { //userInfo.id
      console.log(888, res)
      if (res.code) {
        showToast(res.message);
        return;
      }
      let { verifyToken, bizId } = res.data;
      if (Platform.OS === 'ios') {
        let domId = findNodeHandle(AliyunVerify.current);
        // ios活体认证
        console.log('domId, verifyToken', domId, verifyToken,)
        NativeModules.RealPersonAuth.addEvent(domId, verifyToken, (state, errorCode, message) => {
          //返回结果
          console.log('state, errorCode, message', state, errorCode, message)
          if (state === 'RPStatePass') {
            showToast("认证返回成功");
            props.getVerifyResult({ bizId });
          } else if (state === 'RPStateFail') {
            showToast("认证不通过");
          } else if (state === 'RPStateNotVerify') {
            showToast("未完成认证");
          }
        });
        return;
      }
      // 安卓活体认证
      NativeModules.AliyunVerify.show(verifyToken, ret => {
        if (ret === 'success') {
          // 认证结果返回
          props.getVerifyResult({ bizId });
        } else {
          showToast('认证失败');
        }
      });
    });
  }

  function loadStatus() {
    console.log('loadStatus^^^^^^^^^^^^^');
    setUserStatus('audit_pending'); //修改认证成功返回 audit_pending
  }

  function handlerVerify() {
    if (selectIndex === 0) {
      personalVerify();
    } else if (selectIndex === 1) {

      const { params } = props.route;
      if (params && params.userId) {
        NavigatorService.navigate(AppRoute.IDCARDVERTIFY, { userId: params.userId, refreshStatus: () => { loadStatus(); } });
      } else {
        NavigatorService.navigate(AppRoute.IDCARDVERTIFY, { refreshStatus: () => { loadStatus(); } });
      }

    } else {

      const { params } = props.route;
      if (params && params.userId) {
        NavigatorService.navigate(AppRoute.PASSPORTVERTIFY, { userId: params.userId, refreshStatus: () => { loadStatus(); } });
      } else {
        NavigatorService.navigate(AppRoute.PASSPORTVERTIFY, { refreshStatus: () => { loadStatus(); } });
      }

    }
  }
  // 初始化获取用户信息
  useEffect(() => {
    //setUserInfo(props.userInfo.data);
    setUser();
  }, []);  //[props.userInfo]

  function setUser() {
    const { params } = props.route;
    if (params && params.userId) {
      setUserId(params.userId);
      setUserStatus(params.authStatus);
    } else {
      console.log('userId1:*****', props.userInfo.data.id)
      setUserId(props.userInfo.data.id);
      setUserStatus(props.userInfo.data.status);
    }
  }

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
  //const [userInfo, setUserInfo] = useState(0);
  const [userId, setUserId] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const AliyunVerify = useRef();
  return (
    <View style={styles.container0}>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '实名认证'
        }}
      />
      <View style={styles.container} ref={AliyunVerify}>
        <View>
          <Text style={styles.tipStatus}>当前状态：</Text>
          <Text style={styles.status}>{props.dictionaryMappings.user_status[userStatus]}</Text>
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
        <TouchableOpacity style={styles.verifyBtn} onPress={handlerVerify}>
          <Text style={styles.btnText}>开始认证</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    dictionaryMappings: state.dictionaryMappings
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getVerifyToken, getVerifyResult }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(AuthenticationPage);

const styles = StyleSheet.create({
  container0: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Theme.background,
  },
  tipStatus: {
    fontSize: $screen.scaleSize(14),
    color: Theme.textSecondary,
  },
  status: {
    position: 'absolute',
    right: 0,
    fontSize: $screen.scaleSize(14),
    color: Theme.textDefault,
    textAlign: 'right',
  },
  verTitle: {
    marginVertical: 20,
    fontSize: $screen.scaleSize(14),
    color: Theme.textDefault,
  },
  authListStyle: {
    marginBottom: 18,
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Theme.border,
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
    fontSize: $screen.scaleSize(18),
  },
  name: {
    color: Theme.textDefault,
    fontSize: $screen.scaleSize(18),
  },
  typeText: {
    position: 'absolute',
    top: 22,
    right: 16,
    fontSize: $screen.scaleSize(12),
    color: Theme.textSecondary,
  },
  selectTypeText: {
    position: 'absolute',
    top: 22,
    right: 16,
    fontSize: $screen.scaleSize(12),
    color: '#527BDF',
  },
  secondaryText: {
    marginTop: 12,
    fontSize: $screen.scaleSize(12),
    color: Theme.textDefault,
  },
  selectSecondaryText: {
    marginTop: 12,
    fontSize: $screen.scaleSize(12),
    color: '#527BDF',
  },
  tipText: {
    padding: 12,
    fontSize: $screen.scaleSize(12),
    color: Theme.textSecondary,
    borderRadius: 4,
    lineHeight: 17,
    backgroundColor: '#F0F0F0',
  },
  verifyBtn: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5C8BFF'
  },
  btnText: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: $screen.scaleSize(16),
    color: '#FFFFFF',
  },
});
