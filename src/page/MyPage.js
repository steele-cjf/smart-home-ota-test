/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Thumbnail, Button} from 'native-base';
import ViewUtil from '../util/ViewUtil';
import {MORE_MENU} from '../common/MORE_MENU';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppRoute} from '../navigator/AppRoutes';

export default function MyPage(props) {
  const [userInfo, setUserInfo] = useState({});
  const statusList = {
    not_audit: '未实名',
    audit_pending: '实名审核中',
    audit_pass: '已实名',
  };
  useEffect(() => {
    // eslint-disable-next-line no-undef
    storage.get('info').then(res => {
      console.log('info', res);
      setUserInfo(res);
    });
  }, []);
  function onClick(menu) {
    let RouteName;
    switch (menu) {
      case MORE_MENU.Owner:
        props.navigation.navigate(AppRoute.MYHOUSELIST);
        // RouteName = 'Owner';
        break;
      case MORE_MENU.About:
        RouteName = 'AboutPage';
        break;
      case MORE_MENU.Tenement:
        RouteName = 'TenementPage';
        break;
      case MORE_MENU.House_Collect:
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
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={[styles.flex, styles.topBox]}>
          <Text style={styles.topTitle}>我的</Text>
          <AntDesign
            name="bells"
            style={{
              fontSize: 20,
              color: '#fff',
            }}
          />
        </View>
        <TouchableOpacity>
          <View style={[styles.flex, styles.InfoBox]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Thumbnail
                style={{width: 64, height: 64, marginRight: 16}}
                source={{uri: uri}}
              />
              <View>
                <Text style={{fontSize: 20, color: '#fff'}}>
                  {userInfo.name || userInfo.mobile}
                </Text>
                <Text style={styles.unnamed}>
                  {statusList[userInfo.status]}
                </Text>
              </View>
            </View>
            <View>
              <AntDesign
                name="right"
                style={{
                  fontSize: 20,
                  color: '#fff',
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.myContent}>
        <View style={{marginHorizontal: 16, paddingTop: 15}}>
          {getItem(MORE_MENU.Owner)}
          <View style={styles.line} />
          {getItem(MORE_MENU.Tenement)}
          <View style={styles.line} />
          {getItem(MORE_MENU.House_Collect)}
          <View style={styles.groupTitle} />
          {getItem(MORE_MENU.Setting)}
          <View style={styles.line} />
          {getItem(MORE_MENU.Feedback)}
          <View style={styles.line} />
          {getItem(MORE_MENU.Privacy_Policy)}
          <View style={styles.line} />
          {getItem(MORE_MENU.About)}
          <Button
            bordered
            full
            rounded
            style={{borderColor: '#7C7C7C', marginTop: 30}}>
            <Text style={{color: '#7C7C7C', fontSize: 16}}>退出登录</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const {width, height} = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#527BDF',
  },
  headerContent: {
    height: parseInt(screenHeight * 0.25),
    marginHorizontal: 16,
  },
  myContent: {
    backgroundColor: '#fff',
    height: parseInt(screenHeight * 0.75),
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  topBox: {
    marginTop: 60,
  },
  topTitle: {
    fontSize: 24,
    color: '#fff',
  },
  InfoBox: {
    marginTop: 30,
  },
  unnamed: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#c7c7c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 10,
  },
  groupTitle: {
    height: 17,
    backgroundColor: '#f0f0f0',
    width: screenWidth,
    marginLeft: -15,
  },
  line: {
    height: 1,
    backgroundColor: '#E9E9E9',
  },
});
