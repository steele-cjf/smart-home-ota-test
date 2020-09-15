/**
 * @page feature
 */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner, Root, ActionSheet, Button } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { getMyHouseList } from '../../store/home/index';
import { setFeatureHouse } from '../../store/common/index'
import ViewUtil from '../../util/ViewUtil';
import { MORE_MENU } from '../../common/MORE_MENU';
import { AppRoute } from '../../navigator/AppRoutes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
function FeaturePage(props) {
  const [loading, setLoading] = useState(true);
  const [houseList, setHouseList] = useState({});
  const [selectHouse, setSelectHouse] = useState({});
  const [user, setUser] = useState(false);
  const [hasHouse, setHasHouse] = useState(false);
  const [actionSheet, setActionSheet] = useState(null);

  // useEffect(() => {
  //   props.getMyHouseList() // 获取本人的房源
  // }, []);
  useFocusEffect(
    useCallback(() => {
      props.getMyHouseList()
    }, [props.route])
  )

  useEffect(() => {
    // 获取本人的房源
    if (props.myHouseList && props.myHouseList.data) {
      let { data } = props.myHouseList
      setHouseList(data)
      let result = data[0]
      if (props.featureHouse) {
        let res = data.filter((item) => item.houseId == props.featureHouse)
        res.length && (result = res[0])
      }
      setSelectHouse(result)
    }
    setLoading(false);
  }, [props.myHouseList])

  useEffect(() => {
    let user = props.userInfo && props.userInfo.data && props.userInfo.data.status === 'audit_pass'
    setUser(user)
  }, [props.userInfo])
  useEffect(() => {
    let hasHouse = props.myHouseList && props.myHouseList.data && props.myHouseList.data.length
    setHasHouse(hasHouse)
  }, [props.myHouseList])
  const renderSpinner = () => {
    if (!user) {
      // let { status } = props.userInfo.data
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text>您还未进行实名认证，请先</Text>
          <TouchableOpacity transparent onPress={() => NavigatorService.navigate(AppRoute.AUTHENTICATION)}>
            <Text style={{ color: Theme.primary, marginTop: 10 }}>实名认证</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (!hasHouse) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text>您还未添加房源，请先</Text>
          <TouchableOpacity onPress={() => NavigatorService.navigate(AppRoute.RECORD)} transparent>
            <Text style={{ color: Theme.primary, marginTop: 10 }}>添加房源</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        renderContent()
      )
    }
  }

  function onClick(menu) {
    let RouteName;
    switch (menu) {
      case MORE_MENU.HouseDetail:
        NavigatorService.navigate(AppRoute.HOUSEDETAIL, {
          id: selectHouse.houseId,
          role: selectHouse.houseRole
        });
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
        NavigatorService.navigate(AppRoute.COMPONENTTEST);
        break;
    }
  }
  function getItem(menu) {
    return ViewUtil.getMenuItem(() => onClick(menu), menu);
  }
  // 展示房源选择
  function showList() {
    let array = [];
    if (houseList.length) {
      array = houseList.map(item => {
        item.text = item.address;
        return item;
      });
    }
    array.push({ text: 'Cancel' });
    if (actionSheet !== null) {
      actionSheet._root.showActionSheet(
        {
          options: array,
          cancelButtonIndex: array.length - 1,
          title: '请选择房源',
        },
        buttonIndex => {
          if (houseList[buttonIndex]) {
            props.setFeatureHouse(houseList[buttonIndex].houseId)
            setSelectHouse(houseList[buttonIndex]);
          }
        },
      );
    }
  }
  const renderContent = () => {
    return (<View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={[styles.flex, styles.topBox]}>
          <Text style={styles.topTitle}>功能</Text>
          <AntDesign
            name="bells"
            style={{
              fontSize: $screen.scaleSize(20),
              color: '#fff',
            }}
          />
        </View>
        <TouchableOpacity onPress={() => showList()}>
          <View style={[styles.flex, styles.InfoBox]}>
            <Entypo size={20} color={'#f9f9f9'} name="location-pin" />
            <Text style={{ fontSize: $screen.scaleSize(18), color: '#f9f9f9' }}>
              {/* {selectHouse.regionFullName && selectHouse.regionFullName.replace(/\//g, '') || '暂无房源'} */}
              {selectHouse.address || '暂无房源'}
            </Text>
            <AntDesign name="caretdown" color={'#f9f9f9'} size={14} />
          </View>
        </TouchableOpacity>
        <ActionSheet ref={(c) => { setActionSheet(c) }} />
      </View>
      <ScrollView style={styles.myContent}>
        <View style={{ marginHorizontal: 16, paddingTop: 15 }}>
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
    </View>)
  }
  return (
    <View>
      {loading ? <Spinner  style={STYLES.spinner} color="#5C8BFF"/> : renderSpinner()}
    </View>
  );
}
// reducer获取
function mapStateToProps(state) {
  return {
    myHouseList: state.myHouseList,
    userInfo: state.userInfo,
    featureHouse: state.featureHouse
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getMyHouseList, setFeatureHouse }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(FeaturePage);
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
    height: parseInt(screenHeight * 0.28),
    marginHorizontal: 16,
  },
  myContent: {
    backgroundColor: '#fff',
    height: parseInt(screenHeight * 0.72),
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
    marginTop: 30,
  },
  line: {
    height: 1,
    backgroundColor: '#E9E9E9',
  },
});
