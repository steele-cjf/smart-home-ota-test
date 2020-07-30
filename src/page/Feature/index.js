import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ViewUtil from '../../util/ViewUtil';
import {MORE_MENU} from '../../common/MORE_MENU';
import {AppRoute} from '../../navigator/AppRoutes';

function FeaturePage(props) {
  function onClick(menu) {
    let RouteName;
    switch (menu) {
      case MORE_MENU.HouseDetail:
        props.navigation.navigate(AppRoute.HOUSEDETAIL);
        break;
      case MORE_MENU.TemporaryKey:
        RouteName = 'TemporaryKey';
        break;
      case MORE_MENU.Member:
        RouteName = 'Member';
        break;
      case MORE_MENU.Record:
        RouteName = 'Record';
        break;
      case MORE_MENU.Declare:
        RouteName = 'Declare';
        break;
      case MORE_MENU.ComponentTest:
        RouteName = 'ComponentTest';
        props.navigation.navigate(AppRoute.COMPONENTTEST);
        break;
    }
  }
  function getItem(menu) {
    return ViewUtil.getMenuItem(() => onClick(menu), menu);
  }
  return (
    <View>
      <ScrollView>
        <Text style={styles.groupTitle} />
        {getItem(MORE_MENU.HouseDetail)}
        <View style={styles.line} />
        {getItem(MORE_MENU.TemporaryKey)}
        <View style={styles.line} />
        {getItem(MORE_MENU.Member)}
        <View style={styles.line} />
        {getItem(MORE_MENU.Record)}
        <View style={styles.line} />
        {getItem(MORE_MENU.Feedback)}
        <View style={styles.line} />
        {getItem(MORE_MENU.ComponentTest)}
        <View style={styles.line} />
      </ScrollView>
    </View>
  );
}

// reducer获取
function mapStateToProps(state) {
  return {};
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(FeaturePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray',
  },
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
});
