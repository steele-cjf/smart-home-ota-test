import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, Button, StyleSheet} from 'react-native';
import {getUserInfo} from '../../store/home/index';
import {AppRoute} from '../../navigator/AppRoutes';

function HomePage(props) {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textFont}>您还没有添加任何门锁</Text>
        <Text style={styles.secondaryText}>需要添加后才能执行开锁操作</Text>
        <Button
          title="登记房源"
          onPress={() => NavigatorService.navigate(AppRoute.RECORD)}
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
    fontSize: $screen.scaleSize(20),
  },
  buttonTextStyle: {
    color: Theme.primary,
  },
  secondaryText: {
    fontSize: $screen.scaleSize(16),
    marginTop: 10,
    color: Theme.textSecondary,
  },
});
