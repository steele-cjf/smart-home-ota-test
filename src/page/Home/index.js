import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { getUserInfo, getMyHouseList } from '../../store/home/index';
import { getRecommandList } from '../../store/map/index';
import { Button, ActionSheet, Root, Spinner } from 'native-base'
import { AppRoute } from '../../navigator/AppRoutes';
import Swiper from '../Component/Swiper'
import StatusCard from './Component/statusCard'
import HouseListComponent from '../Component/housingList/list';
import Theme from '../../style/colors';
import { useFocusEffect } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import StickyHeader from 'react-native-stickyheader';
const imgList = [ // 暂时写死
  require('../../assets/images/mock/home1.jpg'),
  require('../../assets/images/mock/home2.jpg'),
  require('../../assets/images/mock/home3.jpg'),
  require('../../assets/images/mock/home4.jpg')]

function HomePage(props) {
  const [scrollY] = useState(new Animated.Value(0))
  const [headHeight] = useState(-1)

  const [userInfo, setUserInfo] = useState({});
  const [houseList, setHouseList] = useState({});
  const [selectHouse, setSelectHouse] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [actionSheet, setActionSheet] = useState(null);
  const [recommandList, setRecommandList] = useState(null);

  // 可以理解为componentDidMount
  useFocusEffect(
    useCallback(() => {
      props.getUserInfo(); // 获取个人信息
      initRemmcondList(); // 获取房源推荐
    }, [props.route])
  )
  const initRemmcondList = () => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true
    });
    Geolocation.requestAuthorization();
    console.log('get location start:')
    Geolocation.getCurrentPosition(
      position => {
        console.log('position: ' + JSON.stringify(position))
        if (position.coords) {
          props.getRecommandList(position.coords, res => {
            console.log('home', res.data);
            setRecommandList(res.data)
          })
        }
      },
      error => showToast('Error', JSON.stringify(error))
    )
  }

  // 获取用户信息
  useEffect(() => {
    const Info = props.userInfo;
    console.log('user', Info)

    if (Info && !Info.code) {
      storage.set('info', Info.data);
      setUserInfo(Info.data)
      if (Info.data && Info.data.status === 'audit_pass') {
        props.getMyHouseList() // 获取本人的房源
      } else {
        setLoadingStatus(false)
      }
    }
  }, [props.userInfo]);

  useEffect(() => {
    // 获取本人的房源
    if (props.myHouseList && props.myHouseList.data) {
      let { data } = props.myHouseList
      setHouseList(data)
      data.length && setSelectHouse(data[0])
    }
    setLoadingStatus(false)
  }, [props.myHouseList])


  // 展示房源选择
  const showList = () => {
    let array = []
    if (houseList.length) {
      array = houseList.map((item) => {
        item.text = item.regionFullName.replace(/\//g, '')
        return item
      })
    }
    array.push({ text: "Cancel" })
    if (actionSheet !== null) {
      // fix cannot read property '_root' of null
      actionSheet._root.showActionSheet(
        {
          options: array,
          cancelButtonIndex: array.length - 1,
          title: "请选择房源"
        },
        buttonIndex => {
          if (houseList[buttonIndex]) {
            setSelectHouse(houseList[buttonIndex])
          }
        }
      )
    }
  }
  return (
    <Root style={styles.container}>
      <View style={styles.container}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          onScroll={
            Animated.event(
              [{
                nativeEvent: { contentOffset: { y: scrollY } } // 记录滑动距离
              }],
              { useNativeDriver: true }) // 使用原生动画驱动
          }
          scrollEventThrottle={1}
        >
          <View style={styles.header}>
            <Text style={styles.title}>首页</Text>
            <View style={styles.SwiperBox} >
              <Swiper items={imgList} />
            </View>
            {
              loadingStatus ?
                <Spinner></Spinner> :
                <StatusCard item={selectHouse} status={userInfo && userInfo.status} showList={() => showList()} />
            }
          </View>
          <ActionSheet ref={(c) => { setActionSheet(c) }} />
          <StickyHeader
            stickyHeaderY={headHeight} // 把头部高度传入
            stickyScrollY={scrollY}  // 把滑动距离传入
          >
            <View style={styles.listContent}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.listTitle}>房源推荐</Text>
                <Button transparent style={styles.listMore} onPress={() => NavigatorService.navigate(AppRoute.HOUSELIST)}>
                  <Text style={{ color: Theme.textLink }} >查看更多</Text>
                </Button>
              </View>

            </View>
          </StickyHeader>
          <View style={{ backgroundColor: '#fff' }}>
            <HouseListComponent list={recommandList} />
          </View>
        </Animated.ScrollView>
      </View>
    </Root>
  );
}

// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    myHouseList: state.myHouseList,
    webSocketInfo: state.webSocketInfo
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfo, getMyHouseList, getRecommandList }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(HomePage);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#527BDF',
    flex: 1,
    flexDirection: 'column'
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    flex: 1,
    flexDirection: 'column'
  },
  listTitle: {
    fontSize: 24,
    color: '#282828',
    paddingBottom: 10
  },
  listMore: {
    position: 'absolute',
    right: 0,
    top: -10
  }
});
