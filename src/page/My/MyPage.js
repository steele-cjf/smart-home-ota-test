/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Thumbnail, Button } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import ViewUtil from '../../util/ViewUtil';
import { MORE_MENU } from '../../common/MORE_MENU';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icomoon from '../../common/Icomoon';
import { AppRoute } from '../../navigator/AppRoutes';
import { handleLogout } from '../../store/login/index';
import { getUserInfo } from '../../store/home/index';

function MyPage(props) {
  const statusColor = {
    not_audit: '#c7c7c7',
    audit_pending: '#9BB8FF',
    audit_pass: '#FEC941',
    audit_reject: '#FF7373',
  };
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // eslint-disable-next-line no-undef
    storage.get('info').then(res => {
      //console.log('info', res);
      setUserInfo(res);
    });
  }, [props.userInfo]);
  useFocusEffect(
    useCallback(() => {
      props.getUserInfo(); // 获取个人信息
    }, [props.route]))

  function onClick(menu) {
    let RouteName;
    switch (menu) {
      case MORE_MENU.Owner:
        NavigatorService.navigate(AppRoute.MYHOUSELIST, {
          screen: 'MyHouseList',
        });
        // RouteName = 'Owner';
        break;
      case MORE_MENU.About:
        //RouteName = 'AboutPage';
        NavigatorService.navigate(AppRoute.ABOUT, {
          screen: 'AboutPage',
        });
        break;
      case MORE_MENU.Tenement:
        NavigatorService.navigate(AppRoute.TENANTHOUSELIST, {
          screen: 'TenantHouseList',
        });
        break;
      case MORE_MENU.House_Collect:
        NavigatorService.navigate(AppRoute.HOUSECOLLECTIONLIST, {
          screen: 'HouseCollectionList',
        });
        break;
      case MORE_MENU.Setting:
        RouteName = 'SettingPage';
        break;
      case MORE_MENU.Privacy_Policy:
        //RouteName = 'PrivacyPage';
        NavigatorService.navigate(AppRoute.AGREEMENT, {
          screen: 'AgreementPage',
        });
        break;
      case MORE_MENU.Feedback:
        //RouteName = 'FeedbackPage';
        NavigatorService.navigate(AppRoute.SUGGESTION, {
          screen: 'SuggestionPage',
        });
        break;
    }
  }
  function getItem(menu) {
    return ViewUtil.getMenuItem(() => onClick(menu), menu, '#527BDF');
  }
  function logoutSubmit() {
    props.handleLogout(res => {
      if (!res.code) {
        // eslint-disable-next-line no-undef
        (async () => {
          await storage.set('token', null);
          NavigatorService.reset(AppRoute.LOGIN)
        })();
      }
    });
  }

  function goVertifyDetailPage() {
    if (userInfo.status === 'audit_pass') {
      NavigatorService.navigate(AppRoute.PERSONALINFO);
    } else if (userInfo.status === 'not_audit') {
      NavigatorService.navigate(AppRoute.AUTHENTICATION);
    } else if ((userInfo.status === 'audit_pending') || (userInfo.status === 'audit_reject')) {
      NavigatorService.navigate(AppRoute.VERDETAILS);
    }
  }
  const uri = require('../../assets/images/head.png');

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={[styles.flex, styles.topBox]}>
          <Text style={styles.topTitle}>我的</Text>
          <AntDesign
            name="bells"
            style={{
              fontSize: 20,
              color: '#fff'
            }}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => NavigatorService.navigate(AppRoute.PERSONALINFO)} >
          <View style={[styles.flex, styles.InfoBox]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
              <Thumbnail style={{ marginRight: 16 }} source={(userInfo && userInfo.avatarImageUrl) ? { uri: userInfo && userInfo.avatarImageUrl } : uri} />
              <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 20, color: '#fff' }}>
                  {userInfo && (userInfo.name || userInfo.mobile)}
                </Text>
                <TouchableWithoutFeedback onPress={goVertifyDetailPage}>
                  <View style={[styles.statusBox, { backgroundColor: statusColor[userInfo && userInfo.status], }]}> 
                    <Text style={styles.statusText}>{props.dictionaryMappings.user_status[userInfo && userInfo.status]}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <TouchableWithoutFeedback onPress={(e) => {NavigatorService.navigate(AppRoute.MYQRCODE)}}>
              <Icomoon style={[{marginRight: 24}, 
                {display: userInfo && userInfo.status !== 'audit_pass' ? 'none' : 'flex'}]} 
                name='erweima'
                color='white'
                size={34}
              />
            </TouchableWithoutFeedback>
            <View>
              <AntDesign
                name="right"
                style={{
                  fontSize: $screen.scaleSize(20),
                  color: '#fff',
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView bounces={false} style={styles.myContent}>
        <View style={{ marginHorizontal: 16, paddingTop: 15 }}>
          <View
            style={{
              display: userInfo && userInfo.status !== 'audit_pass' ? 'none' : 'flex',
            }}>
            {getItem(MORE_MENU.Owner)}
            <View style={styles.line} />
            {getItem(MORE_MENU.Tenement)}
            <View style={styles.line} />
          </View>
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
            onPress={() => logoutSubmit()}
            style={{ borderColor: '#7C7C7C', marginVertical: 20, height: 40 }}>
            <Text style={{ color: '#7C7C7C', fontSize: $screen.scaleSize(16) }}>退出登录</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#527BDF',
  },
  headerContent: {
    marginHorizontal: 16
  },
  myContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  topBox: {
    marginTop: 8
  },
  topTitle: {
    fontSize: $screen.scaleSize(24),
    color: '#fff',
  },
  InfoBox: {
    marginTop: 20,
    marginBottom: 24
  },
  statusText: {
    fontSize: $screen.scaleSize(12),
    color: '#fff',
  },
  statusBox: {
    borderRadius: 4,
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

// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    dictionaryMappings: state.dictionaryMappings
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ handleLogout, getUserInfo }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(MyPage);
