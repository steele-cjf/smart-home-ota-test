/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import {
  Root,
  Spinner,
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { AppRoute } from '../../../navigator/AppRoutes';
import Theme from '../../../style/colors';
import HeaderCommon from '../../Component/HeaderCommon';
import BlankPage from '../../Component/BlankPage';

function MyHouseList(props) {
  const statusColor = {
    audit_pending: '#5C8BFF',
    audit_reject: '#FF7373',
  };
  const [loading, setLoading] = useState(true);
  const [houseList, setHouseList] = useState([]);
  const [mappings, setMappings] = useState({});
  // useEffect(() => {
  //   init();
  // }, [init]);

  useFocusEffect(
    useCallback(() => {
      init();
    }, [props.route])
  )

  useEffect(() => {
    storage.get('dictionaryMappings').then(res => {
      console.log('res', res);
      setMappings(res);
    });
  }, []);
  const init = useCallback(() => {
    props.getHouseListByHolder({ pageNum: 1, pageSize: 100 }, res => {
      console.log('refresh', res.data.list);
      if (!res.code) {
        if (res.data) {
          setHouseList(res.data.list);
          setLoading(false);
        }
      }
    });
  });

  const renderContent = () => {
    if (houseList.length) {
      return (
        <FlatList
          data={houseList}
          // 唯一 ID
          keyExtractor={item => item.id}
          renderItem={_houseItem}
        />
      )
    } else {
      return (<BlankPage errorMsg='没有已登记的房源，请先新增房源' />)
    }
  }
  const handleToDetailPage = item => {
    NavigatorService.navigate(AppRoute.HOUSEDETAIL, {
      id: item.id,
      role: 'holder',
      refresh: function () {
        init();
      },
    });
  };
  const goAddHousePage = () => {
    NavigatorService.navigate(AppRoute.RECORD);
  };

  const _houseItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.container}
        onPress={() => handleToDetailPage(item)}>
        <View style={styles.rightContainer}>
          <Text style={styles.houseName} numberOfLines={1}>
            {/* {item.regionFullName} */}
            {item.address}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <Text style={styles.houseInfo}>
              {item.houseLayout.area || '--'}㎡ -{' '}
              {item.houseLayout.roomCount || '--'}室
              {item.houseLayout.hallCount || '--'}厅
              {item.houseLayout.toiletCount || '--'}卫 -{' '}
              {mappings.house_direction[item.houseLayout.direction] || '--'}
              {item.houseLayout.hasElevator ? ' - 电梯房' : ''}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            {item.status === 'audit_pass' ? (
              <Text style={[styles.rentPrice, styles.highColor]}>
                {mappings.rent_status[item.rentStatus]} |{' '}
                {mappings.publish_status[item.publishStatus]}
              </Text>
            ) : (
                <Text
                  style={[styles.rentPrice, { color: statusColor[item.status] }]}>
                  {mappings.house_status[item.status]}
                </Text>
              )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Root>
      {loading ? (
        <Spinner  style={STYLES.spinner} color="#5C8BFF" />
      ) : (
        <View style={{flex: 1}}>
          <HeaderCommon
            options={{
              backTitle: '返回',
              title: '房源列表',
              rightShow: 'flex',
              rightTitle: '新增房源',
              rightPress: () => goAddHousePage()
            }}
          />
          {renderContent()}
        </View>
        )}
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'darkgray',
    marginLeft: 16,
    marginRight: 16,
    paddingVertical: 15,
  },
  houseName: {
    fontSize: $screen.scaleSize(16),
    color: '#282828',
  },
  houseInfo: {
    fontSize: $screen.scaleSize(12),
    color: '#7c7c7c',
  },
  rentPrice: {
    fontSize: $screen.scaleSize(14),
  },
  miniSize: {
    fontSize: $screen.scaleSize(12),
  },
  highColor: {
    color: '#5C8BFF',
  },
  rightContainer: {
    flex: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
export default MyHouseList;
