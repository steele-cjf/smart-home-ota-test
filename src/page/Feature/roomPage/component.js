/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
//import AntDesign from 'react-native-vector-icons/AntDesign';
import Icomoon from '../../../common/Icomoon';
import {
  Text,
  Spinner,
} from 'native-base';
import DialogInput from '../../Component/InputDialog';
import Theme from '../../../style/colors';
import showToast from '../../../util/toast';
import HeaderCommon from '../../Component/HeaderCommon';
import BlankPage from '../../Component/BlankPage';

export default function RoomPage(props) {
  const [loading, setLoading] = useState(true);
  const [RoomList, setRoomList] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const [houseId, setHouseId] = useState('');
  const [houseInfo, setHouseInfo] = useState({});

  useEffect(() => {
    fetchRoomList();
  }, [fetchRoomList]);

  const fetchRoomList = useCallback(() => {
    const { params } = props.route;
    setHouseId(params.id);
    props.getRoomList({ houseId: params.id }, res => {
      if (!res.code) {
        setRoomList(res.data);
        setLoading(false);
      }
    });
    setHouseInfo(props.houseDetail.data);
  });
  const renderContent = () => {
    if (RoomList.length) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={RoomList}
          renderItem={_renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      )
    } else {
      return (<BlankPage errorMsg='没有合租的房间，请先新增房间' />)
    }
  }
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
  const createTwoButtonAlert = (item, index) => {
    var options = [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
      },
      { text: '确定', onPress: () => handlerDelete(item) },
      {
        // cancelable and onDismiss only work on Android.
        cancelable: true,
        onDismiss: () =>
          console.log(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    ]
    if (Platform.OS === 'android') {
      options.splice(1, 0, {})
    }
    Alert.alert('确定删除？', '', options);
  }
  const editRoom = item => {
    setSelectItem(item);
    setIsDialogVisible(true);
  };
  const addRoom = () => {
    setSelectItem({});
    setIsDialogVisible(true);
    console.log('selectItem', selectItem.name)
  };
  const addRoomFunc = data => {
    props.addRoom(data, res => {
      if (!res.code) {
        setIsDialogVisible(false);
        fetchRoomList();
      } else {
        showToast(res.message);
      }
    });
  };
  const editRoomFunc = (id, name) => {
    props.updateRoomName(id, name, res => {
      if (!res.code) {
        setIsDialogVisible(false);
        fetchRoomList();
      } else {
        showToast(res.message);
      }
    });
  };
  const sendInput = value => {
    if (value === selectItem.name) {
      showToast('请输入你要更改的房间名');
      return;
    }
    if (!value) {
      showToast('请输入房间名');
      return;
    }
    if (selectItem.name) {
      editRoomFunc(selectItem.id, value);
    } else {
      const data = {
        houseId: houseId,
        name: value,
      };
      addRoomFunc(data);
    }
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.room_item_style}>
        <View style={styles.left_content}>
          <Text style={[styles.main_color, { flex: 1, fontSize: 14 }]}>{item.name}</Text>
          {/* <Input value={item.name} /> */}
          <Text style={[styles.status_color, { fontSize: 14 }]}>
            {item.tenantCount > 0 ? '已入住' : '未入住'}
          </Text>
        </View>
        <View style={styles.divider_style} />
        <View style={styles.icon_content}>
          <Icomoon
            name="bianji"
            size={14}
            color="#666666"
            onPress={() => editRoom(item)}
          />
          {item.tenantCount === 0 ? (
            <Icomoon
              name="shanchu"
              size={14}
              color="#E7263E"
              onPress={() => createTwoButtonAlert(item, index)}
            />
          ) : (
              <Icomoon name="shanchu" size={14} color="#c7c7c7" />
            )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.room_content}>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '房间管理',
          rightShow: 'flex',
          rightTitle: '新增房间',
          rightPress: () => addRoom()
        }} />
      {loading ? (
        <Spinner style={STYLES.spinner} color="#5C8BFF" />
      ) : (
        <ScrollView bounces={false} style={{ flex: 1 }}>
          <View style={styles.room_wrapper}>
            <View style={styles.house_address}>
              <View style={{ width: 70 }}>
                <Text style={{ color: '#7C7C7C', fontSize: 14 }}>房屋地址</Text>
              </View>
              <View style={{flex:1, alignItems: 'flex-end' }}>
                <Text style={[styles.main_color, styles.MT_5, { fontSize: 14 }]}>
                  {houseInfo.regionFullName}
                </Text>
                <Text style={[styles.main_color, { fontSize: 14 }]} numberOfLines={1}>
                  {houseInfo.address && houseInfo.address.split(houseInfo.regionFullName)[1]}
                </Text>
              </View>
            </View>
            {renderContent()}
          </View>
          </ScrollView>
        )}
      <DialogInput
        isDialogVisible={isDialogVisible}
        title={'房间名'}
        textInputProps={{ maxLength: 20 }}
        initValueTextInput={selectItem.name}
        hintInput={'请输入房间名'}
        submitInput={inputText => {
          sendInput(inputText);
        }}
        closeDialog={() => setIsDialogVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  room_content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  room_wrapper: {
    flex: 1,
    padding: 16,
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
  status_color: {
    color: Theme.textMuted,
  },
  room_item_style: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderColor: Theme.textMuted,
    borderWidth: 0.5,
    borderRadius: 4,
    marginTop: 15,
  },
  left_content: {
    flex: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider_style: {
    width: 1,
    height: 18,
    backgroundColor: Theme.textMuted,
    marginHorizontal: 20,
  },
  icon_content: {
    flex: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
