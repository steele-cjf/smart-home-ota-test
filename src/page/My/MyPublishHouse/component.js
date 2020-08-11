/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
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
} from 'native-base';
import {AppRoute} from '../../../navigator/AppRoutes';
import Theme from '../../../style/colors';
import HouseList from '../../Home/HouseList';

function MyPublishList(props) {
  const statusColor = {
    audit_pending: '#5C8BFF',
    audit_reject: '#FF7373',
  };
  const [loading, setLoading] = useState(true);
  const [houseId, setHouseId] = useState('');
  const [houseList, setHouseList] = useState([]);
  const [mappings, setMappings] = useState({});
  useEffect(() => {
    init();
  }, [init]);

  const init = useCallback(() => {
    const {params} = props.route;
    setHouseId(params.id);
    props.getMyPublishList(
      {houseId: params.id, pageNum: 1, pageSize: 100},
      res => {
        console.log('res', res);
        if (!res.code) {
          if (res.data) {
            setHouseList(res.data.list);
            setLoading(false);
          }
        }
      },
    );
  });

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

  const _houseItem = ({item, index}) => {
    return (
      <TouchableOpacity key={index} style={styles.container}>
        <View style={styles.leftContainer}>
          <Image style={{width: 75, height: 75}} />
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
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={[styles.rentPrice, styles.highColor]}>
              {mappings.rent_status[item.rentStatus]} |{' '}
              {mappings.publish_status[item.status]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
          <View style={styles.listBox}>
            <View style={styles.leftContent}>
              <Text
                style={[styles.labelTitle, styles.secColor, styles.fontSize14]}>
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
                {/* {houseList[0].regionFullName} */}
              </Text>
              <Text
                style={[
                  styles.textAlignR,
                  styles.mainColor,
                  styles.fontSize14,
                ]}>
                {/* {houseList[0].address} */}
              </Text>
            </View>
          </View>
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
