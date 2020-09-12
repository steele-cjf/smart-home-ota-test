/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, Text, Image, Dimensions, TouchableOpacity, Alert} from 'react-native';
import {
  Spinner,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppRoute } from '../../../navigator/AppRoutes';
import HeaderCommon from '../../Component/HeaderCommon';
import BlankPage from '../../Component/BlankPage';

function HouseCollectionList(props) {
  const [loading, setLoading] = useState(true);
  const [houseList, setHouseList] = useState([]);
  useEffect(() => {
    init();
  }, [init]);

  const init = useCallback(() => {
    props.getHouseCollectionList({pageNum: 1, pageSize: 100}, res => {
      console.log('collection', res.data.list);
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
          style={{paddingTop: 16}}
          data={houseList}
          // 唯一 ID
          keyExtractor={item => item.id}
          renderItem={_houseItem}
        />
      )
    } else {
      return (<BlankPage errorMsg='您还没有收藏记录' />)
    }
  }
  const changeCollection = (item) => {
    props.publishSetCollection({
        publishInfoId: item.publishInfoId,
        add: false
    }, (res) => {
      if (!res.code) {
          showToast('操作成功')
          init()
      } else {
          showToast(res.message || '操作失败')
      }
    })
  }

  const handleToDetailPage = item => {
    if (!item.houseDeleted) {
      NavigatorService.navigate(AppRoute.PUBLISHOUSEDETAIL, { id: item.publishInfoId });
    } else {
      Alert.alert('是否删除此收藏？', '', [
        {
          text: '取消',
          onPress: () => console.log('Cancel Pressed'),
        },
        { text: '确定', onPress: () => changeCollection(item) },
        {
          cancelable: true,
          onDismiss: () =>
            console.log(
              'This alert was dismissed by tapping outside of the alert dialog.',
            ),
        },
      ]);
    }
  };
  const handlerDelete = () => {
    console.log('hah')
  }
  const _houseItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.container}
        onPress={() => handleToDetailPage(item)}>
        <View>
          <View style={styles.img_box}>
            <Image source={{uri: item.imgUrl || ''}} style={{width: screenWidth - 32, height: 214}}></Image>
            {
              item.houseDeleted ? (
                <Text style={styles.mask}>房源已失效</Text>
              ) : (null)
            }
            <AntDesign style={[styles.rightBtn]}
              onPress={() => { changeCollection(item) }}
              name={'heart'}></AntDesign>
          </View>
          <Text style={styles.houseName} numberOfLines={1}>
            {/* {item.regionFullName} */}
            {item.address}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              paddingVertical: 8,
            }}>
            <Text style={[styles.rentPrice, styles.highColor]}>{item.rentPrice}</Text>
            <Text style={[styles.highColor, styles.miniSize]}>元/月</Text>
            <Text style={styles.houseInfo}>
              {item.area || '--'}㎡ -{' '}
              {item.roomCount || '--'}室
              {item.hallCount || '--'}厅
              {item.toiletCount || '--'}卫 -{' '}
              {props.dictionaryMappings.house_direction[item.direction] || '--'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '房源收藏',
        }}
      />
      {loading ? (
        <Spinner  style={STYLES.spinner} color="#5C8BFF" />
      ) : (
        renderContent()
      )}
    </View>
  );
}

const {width, height} = Dimensions.get('window');
const screenWidth = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    paddingBottom: 27,
  },
  houseName: {
    fontSize: $screen.scaleSize(16),
    color: '#282828',
  },
  houseInfo: {
    fontSize: $screen.scaleSize(12),
    color: '#7c7c7c',
    marginLeft: 5,
  },
  img_box: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  rentPrice: {
    fontSize: $screen.scaleSize(20),
  },
  miniSize: {
    fontSize: $screen.scaleSize(12),
  },
  highColor: {
    color: '#5C8BFF',
  },
  rightBtn: {
    position: 'absolute',
    right: 16,
    fontSize: $screen.scaleSize(20),
    color: '#ED4B4B',
    top: 10
  },
  mask: {
    position: 'absolute',
    backgroundColor: 'rgba(40, 40, 40, 0.7)',
    color: '#fff',
    height: 218,
    textAlign: 'center',
    lineHeight: 218,
    width: screenWidth - 32,
    zIndex: 3
  }
});
export default HouseCollectionList;
