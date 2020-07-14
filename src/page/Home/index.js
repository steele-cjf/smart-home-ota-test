import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {getUserInfo} from '../../store/home/index';
import {AppRoute} from '../../navigator/AppRoutes';

function HomePage(props) {
  // const getInfo = useCallback(props.getUserInfo);
  // const INFO = props.userInfo.data;
  // get store
  useEffect(() => {
    !props.userInfo && props.getUserInfo();
  }, [props, props.userInfo]);

  // return (
  //   <View style={{marginTop: 150}}>
  //     <Text>您还未，</Text>
  //     <Button title="实名认证" onPress={handlerVerify} />
  //     <Button title="身份证人工验证" onPress={() => {props.navigation.navigate('IdCardVertifyPage');}} />
  //     <Button title="护照人工验证" onPress={() => {props.navigation.navigate('PassportVertifyPage');}} />

  return (
    <View style={styles.container}>
      <Text style={styles.textFont}>
        <Text>您还未</Text>
        <Text
          style={styles.buttonTextStyle}
          onPress={() => props.navigation.navigate(AppRoute.PASSPORTVERTIFY)}>
          实名认证
        </Text>
      </Text>
      <Text style={styles.secondaryText}>更多操作需要实名认证</Text>
      {/* <View v-else>
        <Text>您还没有添加任何门锁</Text>
        <Text>需要添加后才能执行开锁操作</Text>
        <Button title="登记房源" />
        <Button title="申请电子钥匙" />
      </View> */}
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
