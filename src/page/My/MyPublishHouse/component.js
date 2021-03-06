/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, FlatList, Text, Image } from 'react-native';
import {
  Root,
  Spinner,
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import ActionSheet from 'react-native-custom-actionsheet'
import { AppRoute } from '../../../navigator/AppRoutes';
import Theme from '../../../style/colors';
import { Divider } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import showToast from '../../../util/toast';
import HeaderCommon from '../../Component/HeaderCommon';
import BlankPage from '../../Component/BlankPage';

function MyPublishList(props) {
  const [loading, setLoading] = useState(true);
  const [houseId, setHouseId] = useState('');
  const [houseInfo, setHouseInfo] = useState({});
  const [houseList, setHouseList] = useState([]);
  const [mappings, setMappings] = useState({});
  const ActionSheetRef = useRef(null);
  const [ActionSheetConfig, setActionSheetConfig] = useState({
    options: ['取消'],
    item: {},
    CANCEL_INDEX: 0
  })

  useFocusEffect(
    useCallback(() => {
      init()
    }, [props.route])
  )

  const init = () => {
    const { params } = props.route;
    setHouseId(params.id);
    props.getMyPublishList(
      { houseId: params.id, pageNum: 1, pageSize: 100 },
      res => {
        console.log('houseList', res.data.list);
        if (!res.code) {
          if (res.data) {
            const list = res.data.list;
            setHouseList(list);
            setLoading(false);
          }
        }
      },
    );
    setHouseInfo(props.houseDetail.data);
    console.log('detail', props.houseDetail);
  };

  useEffect(() => {
    storage.get('dictionaryMappings').then(res => {
      console.log('res', res);
      setMappings(res);
    });
  }, []);
  
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
      return (<BlankPage errorMsg='没有房源可发布，请先新增发布' />)
    }
  }
  const goPublishHousePage = () => {
    NavigatorService.navigate(AppRoute.PUBLISH, {
      id: houseId,
      refresh: function () {
        init();
      },
    });
  };
  const handlerOffShelf = id => {
    setLoading(true);
    props.offShelf({ id: id }, res => {
      console.log('off', res);
      if (!res.code) {
        showToast('已下架');
        init();
      } else {
        showToast(res.message);
      }
    });
  };
  const handlerRepublish = id => {
    setLoading(true);
    props.republish({ id: id }, res => {
      console.log('pub', res);
      if (!res.code) {
        showToast('已重新发布');
        init();
      } else {
        showToast(res.message);
      }
    });
  };
  const openSettings = item => {
    console.log('map', mappings.publish_status);
    let options = [];
    const CANCEL_INDEX = 2;
    if (item.status === 'published') {
      options = ['下架', '编辑', '取消'];
    } else {
      options = ['发布', '编辑', '取消'];
    }
    
    setActionSheetConfig({
      CANCEL_INDEX: CANCEL_INDEX,
      options,
      item
    })
    setTimeout(() => {
      ActionSheetRef.current.show()
    })

    // ActionSheet.show(
    //   {
    //     options: BUTTONS,
    //     cancelButtonIndex: CANCEL_INDEX,
    //     // destructiveButtonIndex: this.DESTRUCTIVE_INDEX,
    //     // title: i18n.t("settings")
    //   },
    //   buttonIndex => {
    //     if (buttonIndex === CANCEL_INDEX) {
    //       return;
    //     }
    //     if (!buttonIndex) {
    //       if (item.status === 'published') {
    //         handlerOffShelf(item.id);
    //       } else {
    //         handlerRepublish(item.id);
    //       }
    //     } else {
    //       NavigatorService.navigate(AppRoute.PUBLISH, {
    //         publishId: item.id,
    //       });
    //     }
    //   },
    // );
  };
  const renderRooms = (list) => {
    return (
      list.map(item => {
      return <Text>{item.name} {' '}</Text>
      })
    )
  }
  const _houseItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            style={{
              width: 75,
              height: 75,
              backgroundColor: '#ccc',
              marginRight: 16,
            }}
            source={{ uri: item.imgUrl || '' }}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.houseName} numberOfLines={1}>
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <Text style={styles.houseInfo}>
              {item.area || '--'}㎡ - {item.roomCount || 0}室
              {item.hallCount || 0}厅{item.toiletCount || 0}卫 -{' '}
              {mappings.house_direction[item.direction] || '--'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[styles.rentPrice, styles.highColor, { flex: 1 }]}>
              {mappings.publishinfo_status[item.status]} |{' '}
              {!item.rooms.length ? '整租' : renderRooms(item.rooms)}
            </Text>
            <Feather
              name={'more-horizontal'}
              color="#666"
              size={24}
              onPress={() => openSettings(item)}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <Root>
      {loading ? (
        <Spinner style={STYLES.spinner} color="#5C8BFF" />
      ) : (
          <View style={{flex: 1}}>
            <HeaderCommon
              options={{
                backTitle: '返回',
                title: '发布情况',
                rightShow: 'flex',
                rightTitle: '新增发布',
                rightPress: () => goPublishHousePage()
              }}
            />
            <View style={styles.house_address}>
              <View style={{ width: 70 }}>
                <Text style={{ color: '#7C7C7C' }}>房屋地址</Text>
              </View>
              <View style={{flex:1, alignItems: 'flex-end' }}>
                <Text style={[styles.main_color, styles.MT_5]}>
                  {houseInfo.regionFullName}
                </Text>
                <Text style={[styles.main_color]} numberOfLines={1}>
                  {houseInfo.address.split(houseInfo.regionFullName)[1]}
                </Text>
              </View>
            </View>
            <Divider style={{ marginHorizontal: 15, backgroundColor: '#E9E9E9' }} />
            {renderContent()}
          </View>
        )}
      <ActionSheet
        ref={ActionSheetRef}
        options={ActionSheetConfig.options}
        cancelButtonIndex={ActionSheetConfig.CANCEL_INDEX}
        onPress={(buttonIndex) => {
          if (buttonIndex === ActionSheetConfig.CANCEL_INDEX) {
            return;
          }
          if (!buttonIndex) {
            if (ActionSheetConfig.item.status === 'published') {
              handlerOffShelf(ActionSheetConfig.item.id);
            } else {
              handlerRepublish(ActionSheetConfig.item.id);
            }
          } else {
            NavigatorService.navigate(AppRoute.PUBLISH, {
              publishId: ActionSheetConfig.item.id,
            });
          }
        }}
      />
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
    borderBottomColor: '#E9E9E9',
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
export default MyPublishList;
