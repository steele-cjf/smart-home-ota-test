/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {Header, Left, Right, Body, Icon, Button, Title} from 'native-base';
import {AppRoute} from '../../../navigator/AppRoutes';
import Theme from '../../../style/colors';

function MyHouseList(props) {
  const [houseList, setHouseList] = useState([
    {
      address: '深圳市南山区沿山社区网谷科技大厦501',
      area: 50,
      roomCount: 2,
      hallCount: 1,
      toiletCount: 1,
      direction: '南',
      hasElevator: false,
      status: '待入住',
    },
    {
      address: '深圳市南山区沿山社区网谷科技大厦501',
      area: 20,
      roomCount: 2,
      hallCount: 1,
      toiletCount: 1,
      direction: '南',
      hasElevator: true,
      status: '待审核',
    },
    {
      address: '深圳市南山区沿山社区网谷科技大厦501',
      area: 30,
      roomCount: 2,
      hallCount: 1,
      toiletCount: 1,
      direction: '南',
      hasElevator: true,
      status: '待发布',
    },
  ]);
  useEffect(() => {
    props.getMyHouseList(res => {
      console.log('houselist', res);
      if (!res.code) {
        if (res.data) {
          setHouseList(res.data);
        }
      }
    });
  }, [props]);
  const _houseItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.container}
        onPress={() => props.navigation.navigate(AppRoute.HOUSEDETAIL)}>
        <View style={styles.rightContainer}>
          <Text style={styles.houseName} numberOfLines={1}>
            {item.address}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <Text style={styles.houseInfo}>
              {item.area}㎡ - {item.roomCount}室{item.hallCount}厅
              {item.toiletCount}卫 - {item.direction} -{' '}
              {item.hasElevator ? '电梯房' : ''}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={[styles.rentPrice, styles.highColor]}>
              {item.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" onPress={() => props.navigation.goBack()} />
          </Button>
        </Left>
        <Body>
          <Title>房源列表</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => props.navigation.navigate(AppRoute.RECORD)}>
            <Text style={{color: Theme.textLink}}>新增房源</Text>
          </Button>
        </Right>
      </Header>
      <FlatList
        data={houseList}
        // 唯一 ID
        keyExtractor={item => item.id}
        renderItem={_houseItem}
      />
    </View>
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
export default MyHouseList;
