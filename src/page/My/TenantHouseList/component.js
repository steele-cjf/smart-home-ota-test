/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {Root, Spinner, ActionSheet} from 'native-base';
import {AppRoute} from '../../../navigator/AppRoutes';
import Theme from '../../../style/colors';
import Feather from 'react-native-vector-icons/Feather';
import HeaderCommon from '../../Component/HeaderCommon';
import BlankPage from '../../Component/BlankPage';

function TenantHouseList(props) {
  const [loading, setLoading] = useState(true);
  const [houseList, setHouseList] = useState([]);
  useEffect(() => {
    init();
  }, [init]);

  const init = useCallback(() => {
    props.getTenantHouseList({pageNum: 1, pageSize: 100}, res => {
      console.log('houseList', res.data.list);
      if (!res.code) {
        if (res.data) {
          const list = res.data.list;
          setHouseList(list);
          setLoading(false);
        }
      }
    });
  });
  const renderContent = () => {
    if (houseList.length) {
      return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <FlatList
            data={houseList}
            // 唯一 ID
            keyExtractor={item => item.id}
            renderItem={_houseItem}
          />
        </View>
      )
    } else {
      return (<BlankPage errorMsg='没有已入住的房源，请找房东申请入住' />)
    }
  }
  const openSettings = item => {
    const CANCEL_INDEX = 2;
    const BUTTONS = ['家庭成员', '临时钥匙', '取消'];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        // destructiveButtonIndex: this.DESTRUCTIVE_INDEX,
        // title: i18n.t("settings")
      },
      buttonIndex => {
        if (buttonIndex === CANCEL_INDEX) {
          return;
        }
        if (buttonIndex === 0) {
          props.navigation.navigate(AppRoute.TENANTLIST, {
            houseId: item.houseId,
            tenantId: item.tenantUserId,
            roomNames: item.roomNames
          });
        }
      },
    );
  };
  const handleToDetailPage = item => {
    NavigatorService.navigate(AppRoute.HOUSEDETAIL, { id: item.houseId, role: 'tenant' });
  };
  const _houseItem = ({item, index}) => {
    return (
      <View key={index} style={styles.container}>
        <TouchableOpacity style={styles.rightContainer} onPress={() => handleToDetailPage(item)}>
          <Text style={styles.houseName} numberOfLines={1}>
            {item.regionFullName}
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
              {props.dictionaryMappings.house_direction[
                item.houseLayout.direction
              ] || '--'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[styles.rentPrice, styles.highColor, {flex: 1}]}>
              {item.status ? '已退租' : '正在入住'}
            </Text>
            <Feather
              name={'more-horizontal'}
              color="#666"
              size={24}
              style={{display: item.status ? 'none' : 'flex'}}
              onPress={() => openSettings(item)}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Root>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '我是租户',
        }}
      />
      {loading ? (
        <Spinner  style={STYLES.spinner} color="#5C8BFF" />
      ) : (
        renderContent()
      )}
    </Root>
  );
}
const styles = StyleSheet.create({
  fontSize14: {
    fontSize: $screen.scaleSize(14),
  },
  house_address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  MT_5: {
    marginBottom: 5,
  },
  main_color: {
    color: Theme.textDefault,
  },
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
export default TenantHouseList;
