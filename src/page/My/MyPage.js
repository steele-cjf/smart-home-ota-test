/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Thumbnail, Button, Spinner } from 'native-base';
import ViewUtil from '../../util/ViewUtil';
import { MORE_MENU } from '../../common/MORE_MENU';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppRoute } from '../../navigator/AppRoutes';
import { handleLogout } from '../../store/login/index';

function MyPage(props) {
  const statusColor = {
    not_audit: '#c7c7c7',
    audit_pending: '#9BB8FF',
    audit_pass: '#FEC941',
    audit_reject: '#FF7373',
  };
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [mappings, setMappings] = useState({});

  useEffect(() => {
    // eslint-disable-next-line no-undef
    storage.get('info').then(res => {
      console.log('info', res);
      res.status = 'audit_pass';
      setUserInfo(res);
    });
    storage.get('dictionaryMappings').then(res => {
      setMappings(res);
      setLoading(false);
    });
  }, []);

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
        RouteName = 'AboutPage';
        break;
      case MORE_MENU.Tenement:
        NavigatorService.navigate(AppRoute.TENANTHOUSELIST, {
          screen: 'TenantHouseList',
        });
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
        //RouteName = 'FeedbackPage';
        NavigatorService.navigate(AppRoute.SUGGESTION, {
          screen: 'SuggestionPage',
        });
        break;
    }
  }
  function getItem(menu) {
    return ViewUtil.getMenuItem(() => onClick(menu), menu);
  }
  function logoutSubmit() {
    props.handleLogout(res => {
      if (!res.code) {
        // eslint-disable-next-line no-undef
        (async () => {
          await storage.set('token', null);
          props.navigation.navigate(AppRoute.LOGIN);
        })();
      }
    });
  }
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner color="#5C8BFF" />
      ) : (
          <View>
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
              <TouchableOpacity TouchableOpacity onPress={() => NavigatorService.navigate(AppRoute.PERSONALINFO)} >
                <View style={[styles.flex, styles.InfoBox]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Thumbnail
                      style={{ width: 64, height: 64, marginRight: 16 }}
                      source={{ uri: uri }}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                      <Text style={{ fontSize: 20, color: '#fff' }}>
                        {userInfo.name || userInfo.mobile}
                      </Text>
                      <View
                        style={[
                          styles.statusBox,
                          {
                            backgroundColor: statusColor[userInfo.status],
                          },
                        ]}>
                        <Text style={styles.statusText}>
                          {mappings.user_status[userInfo.status]}
                        </Text>
                      </View>
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
              <View style={{ marginHorizontal: 16, paddingTop: 15 }}>
                <View
                  style={{
                    display: userInfo.status !== 'audit_pass' ? 'none' : 'flex',
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
                  style={{ borderColor: '#7C7C7C', marginTop: 30 }}>
                  <Text style={{ color: '#7C7C7C', fontSize: 16 }}>退出登录</Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        )}
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
  statusText: {
    fontSize: 12,
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
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ handleLogout }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(MyPage);
