import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet} from 'react-native';
import {getUserInfo} from '../../store/home/index';
import {AppRoute} from '../../navigator/AppRoutes';
import showToast from '../../util/toast';

function AuditHouse(props) {

  return (
    <View style={styles.container}>
      <Text style={styles.textFont}>
        <Text>当前房源</Text>
        <Text
          style={styles.buttonTextStyle}
          onPress={() => NavigatorService.navigate(AppRoute.HOUSEDETAIL)}>
          审核中，
        </Text>
        <Text style={styles.textFont}>请耐心等待</Text>
      </Text>
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
)(AuditHouse);

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
