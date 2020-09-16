/**
 * @page home
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Animated, Platform, TouchableOpacity } from 'react-native';
import { getUserInfo, getMyHouseList } from '../../store/home/index';
import { getAllData, getDictionaryMapping } from '../../store/login/index';
import { getRecommandList } from '../../store/map/index';
import { setHomeHouse, setCodeInfo, setDictionaryMappings } from '../../store/common/index'
import { ActionSheet, Root, Spinner } from 'native-base'
import { AppRoute } from '../../navigator/AppRoutes';
import Swiper from '../Component/Swiper'
import StatusCard from './Component/statusCard'
import HouseListComponent from '../Component/housingList/list';
import BlankPage from '../Component/BlankPage';
import Theme from '../../style/colors';
import { useFocusEffect } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import StickyHeader from 'react-native-stickyheader';
import { STYLES } from '../../style/styles';
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
  const [loading, setLoading] = useState(true)
  const [actionSheet, setActionSheet] = useState(null);
  const [recommandList, setRecommandList] = useState(null);
  const handleAppStateChange = () => {
    props.getUserInfo((res) => {
      if (res.code !== 0) {
        NavigatorService.reset(AppRoute.LOGIN)
      } else {
        setLoading(false)
        storageDataDictionary();
        storageMappingDictionary();
        initRemmcondList(); // 获取房源推荐
      }
    }); // 获取个人信息
  }
  // 可以理解为componentDidMount
  useFocusEffect(
    useCallback(() => {
      handleAppStateChange()
    }, [props.route])
  )
  const initRemmcondList = () => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true
    });
    if (Platform.OS == 'ios') {
      Geolocation.requestAuthorization()
    }
    console.log('get location start:')
    Geolocation.getCurrentPosition(
      position => {
        console.log('position: ' + JSON.stringify(position))
        if (position.coords) {
          props.getRecommandList(position.coords, res => { // 获取推荐列表
            setRecommandList(res.data)
          })
        }
      },
      error => {
        props.getRecommandList({}, res => { // 获取推荐列表
          setRecommandList(res.data)
        })
      }
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
      console.log('props', props.homeHouse);
      setHouseList(data)
      let result = data[0]
      if (props.homeHouse) {
        let res = data.filter((item) => item.houseId == props.homeHouse)
        res.length && (result = res[0])
      }
      setSelectHouse(result)
    }
    setLoadingStatus(false)
  }, [props.myHouseList])

  const renderContent = () => {
    // if (recommandList && recommandList.length) {
    //   return (
    //     <HouseListComponent list={recommandList} />
    //   )
    // } else {
    //   return (<View style={{ top: 50 }}><BlankPage errorMsg='暂无房源' /></View>)
    // }
  }
  // 数据字典
  function storageDataDictionary() {
    props.getAllData(res => {
      let result = {};
      res.data.forEach(item => {
        result[item.name] = item.dictionaries;
      });
      props.setCodeInfo(result);
      storage.set('code', result);
    });
  }

  function storageMappingDictionary() {
    props.getDictionaryMapping(res => {
      props.setDictionaryMappings(res.data);
      storage.set('dictionaryMappings', res.data);
    });
  }

  // 展示房源选择
  const showList = () => {
    let array = []
    if (houseList.length) {
      array = houseList.map((item) => {
        item.text = item.address
        return item
      })
    }
    // console.log(99999, houseList)
    array.push({ text: "取消" })
    if (actionSheet !== null) {
      actionSheet._root.showActionSheet(
        {
          options: array,
          cancelButtonIndex: array.length - 1,
          title: "请选择房源"
        },
        buttonIndex => {
          if (houseList[buttonIndex]) {
            props.setHomeHouse(houseList[buttonIndex].houseId)
            setSelectHouse(houseList[buttonIndex])
          }
        }
      )
    }
  }
  return (
    <Root>
      {loading ? (<Spinner style={STYLES.spinner} color="#5C8BFF" />) :
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
                <Swiper items={imgList} imgStyle={{ borderRadius: 10 }} />
              </View>
              {
                loadingStatus ?
                  <Spinner style={STYLES.spinner} color="#5C8BFF" /> :
                  <StatusCard item={selectHouse} status={userInfo && userInfo.status} showList={() => showList()} />
              }
            </View>
            <ActionSheet ref={(c) => { setActionSheet(c) }} />
            <StickyHeader
              style={{ backgroundColor: '#527BDF', padding: 0, }}
              stickyHeaderY={headHeight} // 把头部高度传入
              stickyScrollY={scrollY}  // 把滑动距离传入
            >
              <View style={styles.listContent}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.listTitle}>房源推荐</Text>
                  <TouchableOpacity style={styles.listMore} onPress={() => NavigatorService.navigate(AppRoute.HOUSELIST)}>
                    <Text style={{ color: Theme.textLink, fontSize: $screen.scaleSize(14) }} >查看更多</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </StickyHeader>
            <View style={{ flex: 1 }}>
              {renderContent()}
            </View>
          </Animated.ScrollView>
        </View>
      }
    </Root>
  );
}

// reducer获取
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    myHouseList: state.myHouseList,
    webSocketInfo: state.webSocketInfo,
    homeHouse: state.homeHouse
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfo, getMyHouseList, getRecommandList, setHomeHouse, setDictionaryMappings, setCodeInfo, getDictionaryMapping, getAllData }, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(HomePage);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    backgroundColor: '#527BDF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8
  },
  title: {
    color: '#fff',
    marginBottom: 16,
    fontSize: $screen.scaleSize(24)
  },
  SwiperBox: {
    marginBottom: 16,
    height: 150,
    borderRadius: 10
  },
  listContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    flex: 1,
    flexDirection: 'column'
  },
  listTitle: {
    fontSize: $screen.scaleSize(24),
    color: '#282828'
  },
  listMore: {
  }
});
