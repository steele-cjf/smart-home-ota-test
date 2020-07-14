import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, Button, StyleSheet} from 'react-native';
import {getUserInfo} from '../../store/home/index';
import {AppRoute} from '../../navigator/AppRoutes';
import showToast from '../../util/toast';

function HomePage(props) {
  useEffect(() => {
    if (!props.userInfo) {
      async () => {
        await props.getUserInfo();
        const Info = props.userInfo;
        if (!Info.code) {
          console.log('Info', Info);
          storage.set('info', Info.data);
        } else {
          showToast(Info.message);
          props.navigation.navigate(AppRoute.LOGIN);
        }
      };
    }
  }, [props, props.userInfo]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textFont}>
        <Text>您还未</Text>
        <Text
          style={styles.buttonTextStyle}
          onPress={() => props.navigation.navigate(AppRoute.AUTHENTICATION)}>
          实名认证
        </Text>
      </Text> */}
      {/* <Text style={styles.textFont}>您的实名信息正在审核中</Text> */}
      {/* <Text style={styles.secondaryText}>更多操作需要实名认证</Text> */}
      <View>
        <Text style={styles.textFont}>您还没有添加任何门锁</Text>
        <Text style={styles.secondaryText}>需要添加后才能执行开锁操作</Text>
        <Button
          title="登记房源"
          onPress={() => props.navigation.navigate(AppRoute.RECORD)}
        />
        <Button title="申请电子钥匙" />
      </View>
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
