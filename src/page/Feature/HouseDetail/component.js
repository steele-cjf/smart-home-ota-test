/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Header,
  Button,
  Title,
  Text,
  Left,
  Right,
  Icon,
  Body,
  Spinner,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import HouseBaseInfo from '../../Component/houseBaseInfo';
import { AppRoute } from '../../../navigator/AppRoutes';
import { Divider } from 'react-native-elements';
import Theme from '../../../style/colors';
import showToast from '../../../util/toast';
import { useFocusEffect } from '@react-navigation/native';
function HouseDetail(props) {
  const [loading, setLoading] = useState(true);
  const [houseInfo, setHouseInfo] = useState({
    status: '',
    rentStatus: '',
    houseLayout: {},
    houseHolder: {},
  });
  const [rooms, setRooms] = useState([]);
  const [tenantList, setTenantList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      init()
    }, [props.route])
  )

  const init = () => {
    const { params } = props.route;
    props.getHouseDetail(params.id, res => {
      if (!res.code) {
        if (res.data) {
          setHouseInfo(res.data);
          setLoading(false);
        }
      }
    });
    props.getHouseTenantList(params.id, res => {
      setTenantList(res.data);
    })
    props.getRoomList({ houseId: params.id }, res => {
      setRooms(res.data);
    });
  };

  const alertDeleteModal = () => {
    Alert.alert('确定删除？', '', [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
      },
      { text: '确定', onPress: () => handlerDelete() },
      {
        // cancelable and onDismiss only work on Android.
        cancelable: true,
        onDismiss: () =>
          console.log(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    ]);
  };
  const handlerDelete = () => {
    props.deleteHouse({ id: props.route.params.id }, res => {
      console.log('res', res);
      if (!res.code) {
        showToast('删除成功');
        props.route.params.refresh();
        props.navigation.goBack();
      } else {
        showToast(res.message);
      }
    });
  };

  const handleToPage = () => {
    props.navigation.navigate(AppRoute.RECORD, {
      id: houseInfo.id,
    });
  };
  const handleToRoomPage = () => {
    NavigatorService.navigate(AppRoute.ROOM, {
      id: houseInfo.id
    });
  };
  // 渲染住户
  const renderTenantList = () => {
    const { params } = props.route;
    let result = tenantList.length && tenantList.map(item => {
      console.log('item', item)
      return (<View style={styles.listBox} key={item.userId}>
        <View style={[styles.leftContent, styles.flex]}>
          <Text style={[styles.labelTitle, styles.mainColor, styles.fontSize14]}>
            {item.username || '--'}
          </Text>
        </View>
        <TouchableOpacity style={styles.rightContent} onPress={() => {
          NavigatorService.navigate(AppRoute.TENANTLIST, {
            houseId: params.houseId,
            tenantId: item.userId,
            roomNames: item.rooms
          });
        }}>
          <Text
            style={styles.rightText}>
            {(item.tenantCount || 0) + '位住户'}
          </Text>
          <AntDesign
            name="right"
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      </View>)
    })
    return result || null
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner color="#5C8BFF" />
      ) : (
          <ScrollView>
            <Header transparent>
              <Left>
                <Button transparent>
                  <Icon
                    name="arrow-back"
                    onPress={() => props.navigation.goBack()}
                  />
                </Button>
              </Left>
              <Body>
                <Title>房屋详情</Title>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => handleToPage()}
                  style={{
                    display: houseInfo.status === 'audit_pass' ? 'none' : 'flex',
                  }}>
                  <Text>修改</Text>
                </Button>
              </Right>
            </Header>
            <Divider />
            <View style={styles.padding}>
              {houseInfo.status === 'audit_pending' ? (
                <View style={[styles.statusContent, styles.checkingColor]}>
                  <Text style={styles.statusTitle}>房源审核中</Text>
                  <Text style={styles.statusDesc}>约两个工作日内完成审核</Text>
                </View>
              ) : houseInfo.status === 'audit_fail' ? (
                <View style={[styles.statusContent, styles.failColor]}>
                  <Text style={styles.statusTitle}>房源审核失败</Text>
                  <Text style={styles.statusDesc}>
                    房产证与本人不符，请修改{houseInfo.auditOpinions}
                  </Text>
                </View>
              ) : null}
              {/*  房源信息 */}
              <View style={styles.listBox}>
                <View style={styles.leftContent}>
                  <Text
                    style={[
                      styles.labelTitle,
                      styles.secColor,
                      styles.fontSize14,
                    ]}>
                    房屋地址
                </Text>
                </View>
                <View style={styles.rightContent}>
                  <Text
                    style={[
                      styles.textAlignR,
                      styles.mainColor,
                      styles.fontSize14,
                    ]}>
                    {houseInfo.regionFullName}
                  </Text>
                  <Text
                    style={[
                      styles.textAlignR,
                      styles.mainColor,
                      styles.fontSize14,
                    ]}>
                    {houseInfo.address}
                  </Text>
                </View>
              </View>
              <View style={styles.listBox}>
                <View style={styles.leftContent}>
                  <Text
                    style={[
                      styles.labelTitle,
                      styles.secColor,
                      styles.fontSize14,
                    ]}>
                    房屋所有人
                </Text>
                </View>
                <View style={styles.rightContent}>
                  <Text
                    style={[
                      styles.textAlignR,
                      styles.mainColor,
                      styles.fontSize14,
                    ]}>
                    {houseInfo.houseHolder.holderName}
                  </Text>
                </View>
              </View>
              <View style={styles.listBox}>
                <View style={styles.leftContent}>
                  <Text
                    style={[
                      styles.labelTitle,
                      styles.secColor,
                      styles.fontSize14,
                    ]}>
                    房产证及授权文件
                </Text>
                </View>
                <View style={styles.rightContent}>
                  <Text
                    style={{
                      color: Theme.textLink,
                      paddingRight: 20,
                      fontSize: 14,
                    }}>
                    查看
                </Text>
                  <AntDesign
                    name="right"
                    style={{
                      fontSize: 14,
                      color: Theme.textLink,
                      position: 'absolute',
                      right: 0,
                      top: 2,
                    }}
                  />
                </View>
              </View>
              <Divider style={{ marginTop: 16 }} />
              <View style={styles.listBox}>
                <View style={styles.leftContent}>
                  <Text
                    style={[
                      styles.labelTitle,
                      styles.secColor,
                      styles.fontSize14,
                    ]}>
                    建筑面积
                </Text>
                </View>
                <View style={styles.rightContent}>
                  <Text
                    style={[
                      styles.textAlignR,
                      styles.mainColor,
                      styles.fontSize14,
                    ]}>
                    {houseInfo.houseLayout.area}㎡
                </Text>
                </View>
              </View>
              <View style={styles.listBox}>
                <View style={styles.leftContent}>
                  <Text
                    style={[
                      styles.labelTitle,
                      styles.secColor,
                      styles.fontSize14,
                    ]}>
                    楼层
                </Text>
                </View>
                <View style={styles.rightContent}>
                  <Text
                    style={[
                      styles.textAlignR,
                      styles.mainColor,
                      styles.fontSize14,
                    ]}>
                    第{houseInfo.houseLayout.floor}层&nbsp;共
                  {houseInfo.houseLayout.floorCount}层&nbsp;
                  {houseInfo.houseLayout.hasElevator ? '电梯房' : ''}
                  </Text>
                </View>
              </View>
              <View style={styles.listBox}>
                <View style={styles.leftContent}>
                  <Text
                    style={[
                      styles.labelTitle,
                      styles.secColor,
                      styles.fontSize14,
                    ]}>
                    户型
                </Text>
                </View>
                <View style={styles.rightContent}>
                  <Text
                    style={[
                      styles.textAlignR,
                      styles.mainColor,
                      styles.fontSize14,
                    ]}>
                    {houseInfo.houseLayout.roomCount}室
                  {houseInfo.houseLayout.hallCount}厅
                  {houseInfo.houseLayout.toiletCount}卫
                </Text>
                </View>
              </View>
              <View
                style={{
                  display: houseInfo.status === 'audit_pass' ? 'flex' : 'none',
                }}>
                <Divider style={{ marginTop: 16 }} />
                {/* 状态 */}
                <View style={styles.listBox}>
                  <View style={styles.leftContent}>
                    <Text
                      style={[
                        styles.labelTitle,
                        styles.secColor,
                        styles.fontSize14,
                      ]}>
                      房源状态
                  </Text>
                  </View>
                  <View style={styles.rightContent}>
                    <Text
                      style={[
                        styles.textAlignR,
                        styles.mainColor,
                        styles.fontSize14,
                      ]}>
                      审核通过
                  </Text>
                  </View>
                </View>
                <View style={styles.listBox}>
                  <View style={styles.leftContent}>
                    <Text
                      style={[
                        styles.labelTitle,
                        styles.secColor,
                        styles.fontSize14,
                      ]}>
                      出租状态
                  </Text>
                  </View>
                  <View style={styles.rightContent}>
                    <Text
                      style={[
                        styles.textAlignR,
                        styles.mainColor,
                        styles.fontSize14,
                      ]}>
                      {houseInfo.rentStatus === 'rent_pending'
                        ? '未出租'
                        : '已出租'}
                    </Text>
                  </View>
                </View>
                <Divider style={{ marginTop: 16 }} />
                {/* 发布 */}
                <TouchableOpacity
                  onPress={() =>
                    NavigatorService.navigate(AppRoute.PUBLISHLISE, {
                      id: houseInfo.id,
                    })
                  }>
                  <View style={styles.listBox}>
                    <View style={[styles.leftContent, styles.flex]}>
                      <AntDesign
                        name="tag"
                        style={{
                          fontSize: 14,
                          color: Theme.textLink,
                          paddingRight: 15,
                        }}
                      />
                      <Text
                        style={[
                          styles.labelTitle,
                          styles.mainColor,
                          styles.fontSize14,
                        ]}>
                        发布情况
                    </Text>
                    </View>
                    <View style={styles.rightContent}>
                      <Text
                        style={styles.rightText}>
                        {houseInfo.publishStatus === 'publish_pending'
                          ? '未发布'
                          : '已发布'}
                      </Text>
                      <AntDesign
                        name="right"
                        style={styles.rightIcon}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <Divider style={{ marginTop: 16 }} />
                {/* 房间 */}
                <TouchableOpacity onPress={() => handleToRoomPage()}>
                  <View style={styles.listBox}>
                    <View style={[styles.leftContent, styles.flex]}>
                      <AntDesign
                        name="home"
                        style={{
                          fontSize: 14,
                          color: Theme.textLink,
                          paddingRight: 15,
                        }}
                      />
                      <Text
                        style={[
                          styles.labelTitle,
                          styles.mainColor,
                          styles.fontSize14,
                        ]}>
                        房间管理
                    </Text>
                    </View>
                    <View style={styles.rightContent}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Theme.textSecondary,
                          paddingRight: 20,
                        }}>
                        {rooms.length}间房间
                    </Text>
                      <AntDesign
                        name="right"
                        style={{
                          fontSize: 14,
                          color: Theme.textSecondary,
                          position: 'absolute',
                          right: 0,
                          top: 2,
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                {/* 住户信息 */}
                <View style={[styles.listBox, styles.paddingTop15]}>
                  <View style={styles.leftContent}>
                    <Text
                      style={[
                        styles.labelTitle,
                        styles.mainColor,
                        styles.fontSize14,
                      ]}>
                      住户信息
                  </Text>
                  </View>
                  <View style={(styles.rightContent, styles.flex)}>
                    <Ionicons
                      name="add"
                      style={{
                        fontSize: 14,
                        color: Theme.textLink,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        NavigatorService.navigate(AppRoute.ADDTENANT, {
                          id: houseInfo.id
                        })
                      }>
                      <Text style={{ fontSize: 14, color: Theme.textLink }}>
                        新增住户
                    </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {renderTenantList()}
              </View>
              <Button
                full
                rounded
                onPress={() => alertDeleteModal()}
                style={{ backgroundColor: '#E7263E', marginTop: 50, height: 40 }}>
                <Text style={{ fontSize: 16 }}>删除房源</Text>
              </Button>
            </View>
          </ScrollView>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  paddingTop15: {
    paddingTop: 15,
  },
  fontSize14: {
    fontSize: 14,
  },
  flex: {
    flexDirection: 'row',
  },
  textAlignR: {
    textAlign: 'right',
  },
  mainColor: {
    color: Theme.textDefault,
  },
  secColor: {
    color: Theme.textSecondary,
  },
  statusContent: {
    borderRadius: 4,
    padding: 12,
  },
  checkingColor: {
    backgroundColor: '#ECF2FF',
  },
  failColor: {
    backgroundColor: '#FFECEC',
  },
  statusTitle: {
    fontSize: 16,
    color: Theme.textDefault,
    marginBottom: 4,
  },
  statusDesc: {
    fontSize: 14,
    color: Theme.textSecondary,
  },
  padding: {
    padding: 16,
  },
  listBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  rightContent: {},
  item_content: {
    padding: 10,
    paddingTop: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text_style: {
    fontSize: 16,
    color: '#555',
  },
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  blue: {
    fontSize: 16,
    color: '#0d86ff',
  },
  title: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
  },
  rightText: {
    color: Theme.textSecondary,
    paddingRight: 20,
    fontSize: 14,
  },
  rightIcon: {
    fontSize: 14,
    color: Theme.textSecondary,
    position: 'absolute',
    right: 0,
    top: 2,
  }
});
export default HouseDetail;
