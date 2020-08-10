import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getUserInfo, getMyHouseList } from '../../store/home/index';
import { Button, ActionSheet, Root } from 'native-base'
import { AppRoute } from '../../navigator/AppRoutes';
import showToast from '../../util/toast';
import Swiper from '../Component/Swiper'
import StatusCard from './Component/statusCard'
import HouseListComponent from '../Component/housingList/list';

const imgList = [ // 暂时写死
  require('../../assets/images/mock/home1.jpg'),
  require('../../assets/images/mock/home2.jpg'),
  require('../../assets/images/mock/home3.jpg'),
  require('../../assets/images/mock/home4.jpg')]

function HomePage(props) {
  const [userInfo, setUserInfo] = useState({});
  const [houseList, setHouseList] = useState({});

  // 可以理解为componentDidMount
  useEffect(() => {
    props.getMyHouseList() // 获取本人的房源
    props.getUserInfo(); // 获取个人信息
  }, [])

  // 获取用户信息
  useEffect(() => {
    const Info = props.userInfo;
    console.log(Info)
    if (Info && !Info.code) {
      storage.set('info', Info.data);
      setUserInfo(Info.data)
    }
  }, [props.userInfo]);

  useEffect(() => {
    // 获取本人的房源
    setHouseList(props.myHouseList)
  }, [props.myHouseList])

  // 展示房源选择
  const showList = () => {

    let array = []
    if (houseList.length) {
      array = houseList.map((item) => {
        item.text = item.name
        return item
      })
    }
    array.push({ text: "Cancel" })
    ActionSheet.show(
      {
        options: array,
        cancelButtonIndex: array.length - 1,
        title: "请选择房源"
      },
      buttonIndex => {
        console.log(buttonIndex)
      }
    )
  }
  return (
    <Root>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>首页</Text>
          <View style={styles.SwiperBox} >
            <Swiper items={imgList} />
          </View>
          <StatusCard items={houseList} status={userInfo && userInfo.status} showList={() => showList()} />
        </View>
        <View style={styles.listContent}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.listTitle}>房源推荐</Text>
            <Text style={styles.listMore}>查看更多</Text>
          </View>
          <HouseListComponent nav={props.navigation}/>
        </View>
      </ScrollView>
    </Root>
  );
}

// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    myHouseList: state.myHouseList
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfo, getMyHouseList }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(HomePage);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#527BDF',
    flex: 1
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 48
  },
  title: {
    color: '#fff',
    marginBottom: 16,
    fontSize: 48
  },
  SwiperBox: {
    marginBottom: 28,
    height: 150,
    borderRadius: 10
  },
  listContent: {
    backgroundColor: '#fff',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16
  },
  listTitle: {
    fontSize: 24,
    color: '#282828'
  },
  listMore: {
    position: 'absolute',
    color: '#527BDF',
    right: 0,
    top: 10
  }
});
