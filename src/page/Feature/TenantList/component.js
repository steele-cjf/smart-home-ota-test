/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Text,
  Spinner,
} from 'native-base';
import Theme from '../../../style/colors';
import { AppRoute } from '../../../navigator/AppRoutes';
import HeaderCommon from '../../Component/HeaderCommon'

export default function TenantList(props) {
  const [loading, setLoading] = useState(true);
  const [tenantList, setTenantList] = useState([]);
  const [houseId, setHouseId] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [houseInfo, setHouseInfo] = useState({});

  useFocusEffect(
    useCallback(() => {
      init()
    }, [props.route])
  )

  const init = () => {
    const { params } = props.route;
    console.log('params', params);
    setHouseId(params.houseId);
    setTenantId(params.tenantId);

    props.getHouseDetail(params.houseId, res => {
      if (!res.code) {
        if (res.data) {
          setHouseInfo(res.data);
          setLoading(false);
        }
      }
    });
    props.getTenantList({ houseId: params.houseId, tenantUserId: params.tenantId }, res => {
      console.log('tenant', res)
      if (!res.code) {
        console.log('tenant', res.data)
        setTenantList(res.data);
        setLoading(false);
      }
    });
  };
  const renderRoomName = () => {
    const nameList = props.route.params.roomNames;
    console.log('rooms', nameList);
    if (nameList && nameList.length) {
      return nameList.map(item => {
                return (
                  <Text style={[styles.main_color, styles.MT_5, {fontSize: $screen.scaleSize(14)}]}>{item}</Text>
                )
              })
    } else {
      return <Text style={[styles.main_color, {fontSize: $screen.scaleSize(14)}]}>整租</Text>
    }
  }
  const goDetailPage = (item) => {
    if (item.status === 'audit_pass') {
      NavigatorService.navigate(AppRoute.USERPASSED, {userId: item.userId, tenantUserId: tenantId, houseId: houseId, familyMember: item.familyMember});
    } else {
      NavigatorService.navigate(AppRoute.VERDETAILS, {userId: item.userId, tenantUserId: tenantId, houseId: houseId, familyMember: item.familyMember});
    }
  }

  const _renderItem = ({item}) => {
    
    return (
      <TouchableOpacity style={styles.room_item_style} onPress={() => goDetailPage(item)}>
        <View style={styles.left_content}>
          <Text style={[styles.main_color, {fontSize: $screen.scaleSize(14)}]}>{item.userName}</Text>
        </View>
        <View style={styles.icon_content}>
          <Text style={[styles.status_style, item.status === 'audit_reject' && styles.status_style_reject]}>{props.dictionaryMappings.tenant_status[item.status]}</Text>
          <AntDesign
            name="right"
            size={12}
            style={{
              alignSelf: 'center',
              color: '#7C7C7C',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '家庭成员',
          rightShow: 'flex',
          rightTitle: '新增成员',
          rightPress: () => NavigatorService.navigate(AppRoute.ADDTENANT, { id: houseId, type: 'member', tenantId: tenantId })
        }}
      />
      {loading ? (
        <Spinner  style={STYLES.spinner} color="#5C8BFF"/>
      ) : (
        <ScrollView bounces={false} style={{ flex: 1 }}>
          <View style={styles.room_wrapper}>
            <View style={[styles.house_address, styles.line]}>
              <View style={{ width: 70 }}>
                <Text style={{ color: '#7C7C7C', fontSize: $screen.scaleSize(14), }}>房屋地址</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.main_color, styles.MT_5, {fontSize: $screen.scaleSize(14)}]}>
                  {houseInfo.regionFullName}
                </Text>
                <Text style={[styles.main_color, {fontSize: $screen.scaleSize(14)}]}>{houseInfo.address && houseInfo.address.split(houseInfo.regionFullName)[1]}</Text>
              </View>
            </View>
            <View style={styles.house_address}>
              <View style={{ width: 70 }}>
                <Text style={{ color: '#7C7C7C', fontSize: $screen.scaleSize(14) }}>所属房间</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                {renderRoomName()}
              </View>
            </View>
            {/* <Divider /> */}
            <FlatList
              showsVerticalScrollIndicator={false}
              data={tenantList}
              renderItem={_renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </ScrollView>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  room_wrapper: {
    padding: 15,
    paddingTop: 0,
  },
  house_address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  line: {
    borderBottomColor: Theme.textMuted,
    borderBottomWidth: 0.5,
  },
  MT_5: {
    marginBottom: 5,
  },
  main_color: {
    color: Theme.textDefault,
  },
  room_item_style: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopColor: Theme.textMuted,
    borderTopWidth: 0.5,
  },
  left_content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon_content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status_style: {
    color: '#9C9C9C',
    fontSize: $screen.scaleSize(14),
    paddingRight: 5,
  },
  status_style_reject: {
    color: '#E7263E',
  }
});
