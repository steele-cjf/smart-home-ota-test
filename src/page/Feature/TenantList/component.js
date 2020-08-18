/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Spinner,
} from 'native-base';
import Theme from '../../../style/colors';
import showToast from '../../../util/toast';

export default function TenantList(props) {
  const [loading, setLoading] = useState(false);
  const [tenantList, setTenantList] = useState([
    {gender: '女', status: '待审核', userName: 'xiaoming', userId: '3'},
    {gender: '男', status: '审核失败', userName: 'xiaoming', userId: '2'},
    {gender: '女', status: '待审核', userName: 'xiaoming', userId: '5'},
  ]);
  const [houseId, setHouseId] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [houseInfo, setHouseInfo] = useState({});

  useEffect(() => {
    init();
  }, [init]);

  const init = useCallback(() => {
    const {params} = props.route;
    setHouseId(params.houseId);
    setTenantId(params.tenantId);
    
    // props.getHouseDetail(params.houseId, res => {
    //     if (!res.code) {
    //       if (res.data) {
    //         setHouseInfo(res.data);
    //         setLoading(false);
    //       }
    //     }
    //   });
    // props.getTenantList({houseId: params.id, tenantUserId: params.tenantId}, res => {
    //   if (!res.code) {
    //     setTenantList(res.data);
    //     setLoading(false);
    //   }
    // });
  });

  const handlerDelete = item => {
    setLoading(true);
    console.log('ddd', item.id);
    props.deleteRoom(item.id, res => {
      if (!res.code) {
        showToast('删除成功');
        fetchRoomList();
      } else {
        showToast(res.message);
        setLoading(false);
      }
    });
  };
  const createTwoButtonAlert = (item, index) =>
    Alert.alert('确定删除？', '', [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
      },
      {text: '确定', onPress: () => handlerDelete(item)},
      {
        // cancelable and onDismiss only work on Android.
        cancelable: true,
        onDismiss: () =>
          console.log(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    ]);
  const goToPage = () => {
    props.navigation.goBack();
  };
  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.room_item_style}>
        <View style={styles.left_content}>
          <Text style={styles.main_color}>{item.userName}- {item.gender}</Text>
        </View>
        <View style={styles.icon_content}>
          <Text style={styles.status_style}>{item.status}</Text>
          <AntDesign
          name="right"
          size={12}
          style={{
              alignSelf: 'center',
              color: '#7C7C7C',
          }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.room_content}>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" onPress={() => goToPage()} />
          </Button>
        </Left>
        <Body>
          <Title>家庭成员</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => addRoom()}>
            <Text>新增成员</Text>
          </Button>
        </Right>
      </Header>
      {loading ? (
        <Spinner color="#5C8BFF" />
      ) : (
        <View style={styles.room_wrapper}>
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
          {/* <Divider /> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={tenantList}
            renderItem={_renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  room_content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  room_wrapper: {
    padding: 15,
    paddingTop: 0,
  },
  house_address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
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
    fontSize: 14,
    paddingRight: 5,
  }
});
