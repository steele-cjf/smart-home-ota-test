/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  Platform
} from 'react-native';
import {
  Button,
  Text,
  Spinner,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppRoute } from '../../../navigator/AppRoutes';
import { Divider } from 'react-native-elements';
import Theme from '../../../style/colors';
import showToast from '../../../util/toast';
import { useFocusEffect } from '@react-navigation/native';
import HeaderCommon from '../../Component/HeaderCommon'
import ImageViewer from 'react-native-image-zoom-viewer';

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
  const [showImage, setShowImage] = useState(false);
  const [imageList, setImageList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      init()
    }, [props.route])
  )
  // 初始化
  const init = () => {
    const { params } = props.route;
    props.getHouseDetail(params.id, res => {
      if (!res.code) {
        if (res.data) {
          setHouseInfo(res.data);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
    props.getHouseTenantList(params.id, res => {
      setTenantList(res.data);
    })
    props.getRoomList({ houseId: params.id }, res => {
      setRooms(res.data);
    });
  };
  // 删除操作
  const alertDeleteModal = () => {
    Alert.alert('确定删除？', '', [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
      },
      { text: '确定', onPress: () => handlerDelete() },
      {
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
      if (!res.code) {
        showToast('删除成功');
        props.navigation.goBack();
      } else {
        showToast(res.message);
      }
    });
  };
  // 跳转到修改房源页面
  const handleToPage = () => {
    props.navigation.navigate(AppRoute.RECORD, {
      id: houseInfo.id,
    });
  };
  const checkImgLength = () => {
    const arr = [{ url: houseInfo.housePropertyCertificateImageUrl }, { url: houseInfo.houseHolder.certificateFileUrl }, { url: houseInfo.houseHolder.idCardFileUrl }];
    // if (imageList.length) {
    //   setShowImage(true)
    //   return
    // }
    const images = []
    setLoading(true)
    let imgArr = []
    // 过滤url:null的情况
    arr.map(ArrItem => {
      if (ArrItem.url) {
        imgArr.push(ArrItem)
      }
    })
    // 转换image到本地
    imgArr.map((item) => {
      $getImage(item.url, function (res) {
        images.push({ url: res.uri })
        setImageList(images);
        setTimeout(() => {
          if (images.length >= imgArr.length) {
            setLoading(false)
            setShowImage(true)
          }
        })
      }, true)
    })
    if (!imgArr.length) {
      showToast('房东未上传证件照!')
      return
    }
  }
  // 跳转房间管理
  const handleToRoomPage = () => {
    NavigatorService.navigate(AppRoute.ROOM, {
      id: houseInfo.id
    });
  };
  // 添加住户
  const handlerAddTenant = () => {
    props.checkHouseIsEmpty(houseInfo.id, res => {
      console.log('check', res)
      if (!res.code) {
        if (!res.data) {
          NavigatorService.navigate(AppRoute.ADDTENANT, {
            id: houseInfo.id
          })
        } else {
          showToast('您的房间已全部住满，请添加房间或先删除住户。')
        }
      } else {
        showToast(res.message)
      }
    })
  }
  // 渲染住户
  const renderTenantList = () => {
    const { params } = props.route;
    let result = tenantList && tenantList.length && tenantList.map(item => {
      const rooms = item.rooms.map(item => { return item.name });
      return (<TouchableOpacity style={styles.listBox} key={item.userId} onPress={() => {
        NavigatorService.navigate(AppRoute.TENANTLIST, {
          houseId: params.id,
          tenantId: item.userId,
          roomNames: rooms
        });
      }}>
        <View style={[styles.leftContent, styles.flex]}>
          <Text style={[styles.labelTitle, styles.mainColor, styles.fontSize14]}>
            {item.username || '--'}
          </Text>
        </View>
        <View style={styles.rightContent}>
          <Text
            style={styles.rightText}>
            {(item.tenantCount || 0) + '位住户'}
          </Text>
          <AntDesign
            name="right"
            style={styles.rightIcon}
          />
        </View>
      </TouchableOpacity>)
    })
    return result || null
  }
  // 租户和房东渲染不同菜单
  const renderRolePage = () => {
    const { params } = props.route;
    if (params.role === 'holder') {
      return (
        <View>
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
                      fontSize: $screen.scaleSize(14),
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
                      fontSize: $screen.scaleSize(14),
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
                      fontSize: $screen.scaleSize(14),
                      color: Theme.textSecondary,
                      paddingRight: 20,
                    }}>
                    {rooms.length}间房间
                </Text>
                  <AntDesign
                    name="right"
                    style={{
                      fontSize: $screen.scaleSize(14),
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
            <TouchableOpacity style={[styles.listBox, styles.paddingTop15]} onPress={() =>
              NavigatorService.navigate(AppRoute.ADDTENANT, {
                id: houseInfo.id
              })
            }>
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
              <View
                style={(styles.rightContent, styles.flex)}>
                <Ionicons
                  name="add"
                  style={{
                    fontSize: $screen.scaleSize(14),
                    color: Theme.textLink
                  }}
                />
                <Text style={{ fontSize: $screen.scaleSize(14), color: Theme.textLink }}>
                  新增住户
                </Text>
              </View>
            </TouchableOpacity>
            {renderTenantList()}
          </View>
          <Button
            full
            rounded
            onPress={() => alertDeleteModal()}
            style={{ backgroundColor: '#E7263E', marginTop: 50, height: 40 }}>
            <Text style={{ fontSize: $screen.scaleSize(16) }}>删除房源</Text>
          </Button>
        </View>
      )
    } else {
      return null
    }
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner style={STYLES.spinner} color="#5C8BFF" />
      ) : (
          <ScrollView>
            <HeaderCommon
              options={{
                backTitle: '返回',
                title: '房屋详情',
                rightShow: houseInfo.status === 'audit_pass' || props.route.params.role !== 'holder' ? 'none' : 'flex',
                rightTitle: '修改',
                rightPress: () => handleToPage()
              }}
            />
            <Divider />
            <View style={styles.padding}>
              {houseInfo.status === 'audit_pending' ? (
                <View style={[styles.statusContent, styles.checkingColor]}>
                  <Text style={styles.statusTitle}>房源审核中</Text>
                  <Text style={styles.statusDesc}>约两个工作日内完成审核</Text>
                </View>
              ) : houseInfo.status === 'audit_reject' ? (
                <View style={[styles.statusContent, styles.failColor]}>
                  <Text style={styles.statusTitle}>房源审核失败</Text>
                  <Text style={styles.statusDesc}>
                    {houseInfo.auditOpinions}
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
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={2}
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
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} onPress={() => checkImgLength()}>
                    <Text
                      style={{
                        color: Theme.textLink,
                        fontSize: $screen.scaleSize(14),
                      }}>
                      查看
                    </Text>
                    <AntDesign
                      name="right"
                      style={{
                        fontSize: $screen.scaleSize(14),
                        color: Theme.textLink,
                      }}
                    />
                  </TouchableOpacity>
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
              {/* 状态管理 */}
              {renderRolePage()}
            </View>
          </ScrollView>
        )}
      <Modal style={{ flex: 1 }}
        onPress={() => { console.log('111111111') }}
        onClick={() => { console.log('11222222') }}

        visible={showImage} transparent={true}
        onRequestClose={() => Alert.alert("Modal has been closed.")}>
        <ImageViewer imageUrls={imageList} />
        <TouchableOpacity style={styles.closeBox} onPress={() => setShowImage(false)}>
          {/* <Text style={styles.closeBtn}>X</Text> */}
          <AntDesign
              name="closecircle"
              style={{ fontSize: $screen.scaleSize(24), color: '#ED4B4B',}}
            />
        </TouchableOpacity>
      </Modal>
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
    fontSize: $screen.scaleSize(14),
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
    fontSize: $screen.scaleSize(16),
    color: Theme.textDefault,
    marginBottom: 4,
  },
  statusDesc: {
    fontSize: $screen.scaleSize(14),
    color: Theme.textSecondary,
  },
  padding: {
    padding: 16,
  },
  listBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  rightContent: {
    // flex: 1,
  },
  item_content: {
    padding: 10,
    paddingTop: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text_style: {
    fontSize: $screen.scaleSize(16),
    color: '#555',
  },
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  blue: {
    fontSize: $screen.scaleSize(16),
    color: '#0d86ff',
  },
  title: {
    fontSize: $screen.scaleSize(18),
    marginTop: 30,
    marginBottom: 20,
  },
  rightText: {
    color: Theme.textSecondary,
    paddingRight: 20,
    fontSize: $screen.scaleSize(14),
  },
  rightIcon: {
    fontSize: $screen.scaleSize(14),
    color: Theme.textSecondary,
    position: 'absolute',
    right: 0,
    top: 2,
  },
  closeBox: {
    position: 'absolute',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    right: 10,
    top: 40
  },
});
export default HouseDetail;
