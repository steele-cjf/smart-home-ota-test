import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ViewUtil from '../util/ViewUtil';
import {MORE_MENU} from '../common/MORE_MENU';

export default function MyPage(props) {
  function onClick(menu) {
    let RouteName;
    switch (menu) {
      case MORE_MENU.Owner:
        RouteName = 'OwnerPage';
        break;
      case MORE_MENU.About:
        RouteName = 'AboutPage';
        break;
      case MORE_MENU.Tenement:
        RouteName = 'TenementPage';
        break;
      case MORE_MENU.Operating_Record:
        RouteName = 'OperatingPage';
        break;
      case MORE_MENU.Setting:
        RouteName = 'SettingPage';
        break;
      case MORE_MENU.Privacy_Policy:
        RouteName = 'PrivacyPage';
        break;
      case MORE_MENU.Feedback:
        RouteName = 'FeedbackPage';
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
        {getItem(MORE_MENU.Owner)}
        <View style={styles.line} />
        {getItem(MORE_MENU.Tenement)}
        <View style={styles.line} />
        {getItem(MORE_MENU.Operating_Record)}
        <View style={styles.line} />
        {getItem(MORE_MENU.Setting)}
        <View style={styles.line} />
        <Text style={styles.groupTitle} />
        {getItem(MORE_MENU.Feedback)}
        <View style={styles.line} />
        {getItem(MORE_MENU.Privacy_Policy)}
        <View style={styles.line} />
        {getItem(MORE_MENU.About)}
      </ScrollView>
    </View>
  );
}

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
