import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet} from 'react-native';
import {getUserInfo} from '../../store/home/index';
import {AppRoute} from '../../navigator/AppRoutes';
import showToast from '../../util/toast';

function HomePage(props) {
  useEffect(() => {
    if (!props.userInfo) {
      props.getUserInfo();
      return;
    }
    const Info = props.userInfo;
    if (!Info.code) {
      storage.set('info', Info.data);
      setUserInfo(Info.data);
      // props.navigation.navigate(AppRoute.RECORD);
    } else {
      showToast(Info.message);
      // props.navigation.navigate(AppRoute.RECORD);
      props.navigation.navigate(AppRoute.LOGIN);
    }
  }, [props, props.userInfo]);

  const [userInfo, setUserInfo] = useState({});

  return (
    <View style={styles.container}>
      {!userInfo.verifyStatus ? (
        <Text style={styles.textFont}>
          <Text>您还未</Text>
          <Text
            style={styles.buttonTextStyle}
            onPress={() => props.navigation.navigate(AppRoute.AUTHENTICATION)}>
            实名认证
          </Text>
        </Text>
      ) : (
        <Text style={styles.textFont}>您的实名信息正在审核中</Text>
      )}
      <Text style={styles.secondaryText}>更多操作需要实名认证</Text>
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
  return bindActionCreators({getUserInfo}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(HomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFont: {
    fontSize: 20,
  },
  buttonTextStyle: {
    color: Theme.primary,
  },
  secondaryText: {
    fontSize: 16,
    marginTop: 10,
    color: Theme.textSecondary,
  },
});
