/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, Text, Image} from 'react-native';
import {
  Header,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Title,
  Root,
  Spinner,
  ActionSheet,
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import {AppRoute} from '../../../navigator/AppRoutes';
import Theme from '../../../style/colors';
import {Divider} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import showToast from '../../../util/toast';

function MyPublishList(props) {
  const [loading, setLoading] = useState(true);
  const [houseId, setHouseId] = useState('');
  const [houseInfo, setHouseInfo] = useState({});
  const [houseList, setHouseList] = useState([]);
  const [mappings, setMappings] = useState({});
  // useEffect(() => {
  //   init();
  // }, [init]);

  useFocusEffect(
    useCallback(() => {
      console.log('@@@@@@@@@@@@@')
      init()
    }, [props.route])
  )

  const init = () => {
    const {params} = props.route;
    setHouseId(params.id);
    props.getMyPublishList(
      {houseId: params.id, pageNum: 1, pageSize: 100},
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

  const goPublishHousePage = () => {
    NavigatorService.navigate(AppRoute.PUBLISH, {
      id: houseId,
      refresh: function() {
        init();
      },
    });
  };
  const handlerOffShelf = id => {
    setLoading(true);
    props.offShelf({id: id}, res => {
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
    props.republish({id: id}, res => {
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
    let BUTTONS = [];
    const CANCEL_INDEX = 2;
    if (item.status === 'published') {
      BUTTONS = ['下架', '编辑', '取消'];
    } else {
      BUTTONS = ['发布', '编辑', '取消'];
    }
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
        if (!buttonIndex) {
          if (item.status === 'published') {
            handlerOffShelf(item.id);
          } else {
            handlerRepublish(item.id);
          }
        } else {
          NavigatorService.navigate(AppRoute.PUBLISH, {
            publishId: item.id,
          });
        }
      },
    );
  };
  const _houseItem = ({item, index}) => {
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
            source={{uri: item.imgUrl}}
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
              {item.area || '--'}㎡ - {item.roomCount || '--'}室
              {item.hallCount || '--'}厅{item.toiletCount || '--'}卫 -{' '}
              {mappings.house_direction[item.direction] || '--'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[styles.rentPrice, styles.highColor, {flex: 1}]}>
              {mappings.publishinfo_status[item.status]} |{' '}
              {!item.roomNames.length ? '整租' : item.roomNames[0]}
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
        <Spinner color="#5C8BFF" />
      ) : (
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <Header style={{backgroundColor: '#fff'}}>
            <Left>
              <Button transparent>
                <Icon
                  name="arrow-back"
                  onPress={() => NavigatorService.goBack()}
                />
              </Button>
            </Left>
            <Body>
              <Title>发布情况</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => goPublishHousePage()}>
                <Text style={{color: Theme.textLink}}>新增发布</Text>
              </Button>
            </Right>
          </Header>
          <View style={styles.house_address}>
            <View style={{width: 70}}>
              <Text style={{color: '#7C7C7C'}}>房屋地址</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={[styles.main_color, styles.MT_5]}>
                {houseInfo.regionFullName}
              </Text>
              <Text style={styles.main_color}>{houseInfo.address}</Text>
            </View>
          </View>
          <Divider style={{marginHorizontal: 15}} />
          <FlatList
            data={houseList}
            // 唯一 ID
            keyExtractor={item => item.id}
            renderItem={_houseItem}
          />
        </View>
      )}
    </Root>
  );
}
const styles = StyleSheet.create({
  fontSize14: {
    fontSize: 14,
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
    fontSize: 16,
    color: '#282828',
  },
  houseInfo: {
    fontSize: 12,
    color: '#7c7c7c',
  },
  rentPrice: {
    fontSize: 14,
  },
  miniSize: {
    fontSize: 12,
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
