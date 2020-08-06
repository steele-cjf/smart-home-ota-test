/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Thumbnail, Button} from 'native-base';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ViewUtil from '../../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={[styles.flex, styles.topBox]}>
          <Text style={styles.topTitle}>功能</Text>
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
                style={{width: 96, height: 94, marginRight: 16}}
                source={{uri: uri}}
              />
              {/* <View>
                <Text style={{fontSize: 20, color: '#fff'}}>
                  {userInfo.name || userInfo.mobile}
                </Text>
                <Text style={styles.unnamed}>
                  {statusList[userInfo.status]}
                </Text>
              </View> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.myContent}>
        <View style={{marginHorizontal: 16, paddingTop: 15}}>
          {getItem(MORE_MENU.HouseDetail)}
          <View style={styles.line} />
          {getItem(MORE_MENU.TemporaryKey)}
          <View style={styles.line} />
          {getItem(MORE_MENU.Record)}
          <View style={styles.line} />
          {getItem(MORE_MENU.Declare)}
          <View style={styles.line} />
          {getItem(MORE_MENU.ComponentTest)}
          <View style={styles.line} />
        </View>
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
    height: parseInt(screenHeight * 0.3),
    marginHorizontal: 16,
  },
  myContent: {
    backgroundColor: '#fff',
    height: parseInt(screenHeight * 0.7),
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
