import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet } from 'react-native';
import { getUserInfo } from '../../store/home/index';
import { H2 } from 'native-base'
import { Avatar } from 'react-native-elements';
import { AppRoute } from '../../navigator/AppRoutes';
import showToast from '../../util/toast';
import Swiper from '../Component/Swiper'
import StatusCard from './Component/statusCard'
const imgList= [
  require('../../assets/images/mock/home1.jpg'),
  require('../../assets/images/mock/home2.jpg'),
  require('../../assets/images/mock/home3.jpg'),
  require('../../assets/images/mock/home4.jpg')]
function HomePage(props) {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    if (!props.userInfo) {
      props.getUserInfo();
      return;
    }
    const Info = props.userInfo;
    if (!Info.code) {
      storage.set('info', Info.data);
      setUserInfo(Info.data)
    } else {
      showToast(Info.message);
      // props.navigation.navigate(AppRoute.RECORD);
      // props.navigation.navigate(AppRoute.LOGIN);
    }
  }, [props, props.userInfo]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H2 style={styles.title}>首页</H2>
        <View  style={styles.SwiperBox} >
          <Swiper items={imgList}/>
        </View>
        <StatusCard/>
      </View>
      <View>
        <H2>首页</H2>
      </View>
      {/* <Button
        title="进入房源登记"
        onPress={() => props.navigation.navigate(AppRoute.RECORD)}
      />
      <Button
        title="地图搜素"
        onPress={() => props.navigation.navigate(AppRoute.MAPHOUSE, { item: 11111 })}
      /> */}
      {/* <Text
        style={styles.buttonTextStyle}
        onPress={() => props.navigation.navigate(AppRoute.AUTHENTICATION)}>
        实名认证
      </Text>
      {!userInfo.verifyStatus ? (
        <Text style={styles.textFont}>
          <Text>您还未</Text>
          <Text
            style={styles.buttonTextStyle}
            onPress={() => props.navigation.navigate(AppRoute.AUTHENTICATION)}>
            实名认证
          </Text>
        </Text>
      ) : (
          <Text style={styles.textFont}>您的实名信息正在审核中</Text>
        )}
      <Text style={styles.secondaryText}>更多操作需要实名认证</Text> */}
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
  return bindActionCreators({ getUserInfo }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(HomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    backgroundColor: '#527BDF',
    paddingHorizontal: 16,
    paddingVertical: 48
  },
  title: {
    color: '#fff',
    marginBottom: 16
  },
  SwiperBox: {
    marginBottom: 28,
    height: 150
  }
});
