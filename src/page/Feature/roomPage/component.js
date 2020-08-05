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
} from 'native-base';
import DialogInput from '../../Component/dialogInput';
import Theme from '../../../style/colors';

export default function RoomPage(props) {
  const [RoomList, setRoomList] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({});

  useEffect(() => {
    fetchRoomList('488400405136433152');
  }, [fetchRoomList, props]);

  const fetchRoomList = useCallback(id => {
    props.getRoomList({houseId: id}, res => {
      if (!res.code) {
        setRoomList(res.data);
      }
    });
  });

  const handlerDelete = (item, index) => {
    console.log(item, index);
    const list = RoomList.splice(index, 1);
    setRoomList(list);
  };
  const createTwoButtonAlert = (item, index) =>
    Alert.alert('确定删除？', '', [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
      },
      {text: '确定', onPress: () => handlerDelete(item, index)},
      {
        // cancelable and onDismiss only work on Android.
        cancelable: true,
        onDismiss: () =>
          console.log(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    ]);
  const editRoom = item => {
    setSelectItem(item);
    setIsDialogVisible(true);
  };
  const addRoom = () => {
    setSelectItem({});
    setIsDialogVisible(true);
  };
  const addRoomFunc = data => {
    props.addRoom(data, res => {
      console.log(res);
      if (!res.code) {
        setIsDialogVisible(false);
        fetchRoomList('488400405136433152');
      } else {
        showToast(res.message);
      }
    });
  };
  const editRoomFunc = (id, name) => {
    props.updateRoomName(id, name, res => {
      console.log(res);
      if (!res.code) {
        setIsDialogVisible(false);
        fetchRoomList('488400405136433152');
      } else {
        showToast(res.message);
      }
    });
  };
  const sendInput = value => {
    console.log('vale', value);
    console.log(selectItem.name);
    if (!value && selectItem.name) {
      // eslint-disable-next-line no-undef
      showToast('请输入你要更改的房间名');
      return;
    }
    if (!value) {
      // eslint-disable-next-line no-undef
      showToast('请输入房间名');
      return;
    }
    if (selectItem.name) {
      editRoomFunc(selectItem.id, value);
    } else {
      const data = {
        houseId: '488400405136433152',
        name: value,
      };
      addRoomFunc(data);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.room_item_style}>
        <View style={styles.left_content}>
          <Text style={styles.main_color}>{item.name}</Text>
          {/* <Input value={item.name} /> */}
          <Text style={styles.status_color}>
            {item.tenantCount > 0 ? '已入住' : '未入住'}
          </Text>
        </View>
        <View style={styles.divider_style} />
        <View style={styles.icon_content}>
          <AntDesign
            name="edit"
            size={14}
            color="#666666"
            onPress={() => editRoom(item)}
          />
          {item.tenantCount === 0 ? (
            <AntDesign
              name="delete"
              size={14}
              color="#E7263E"
              onPress={() => createTwoButtonAlert(item, index)}
            />
          ) : (
            <AntDesign name="delete" size={14} color="#c7c7c7" />
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.room_content}>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" onPress={() => props.navigation.goBack()} />
          </Button>
        </Left>
        <Body>
          <Title>房间管理</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => addRoom()}>
            <Text>新增房屋</Text>
          </Button>
        </Right>
      </Header>
      <View style={styles.room_wrapper}>
        <View style={styles.house_address}>
          <View style={{width: 70}}>
            <Text style={{color: '#7C7C7C'}}>房屋地址</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[styles.main_color, styles.MT_5]}>
              广东省深圳市南山区
            </Text>
            <Text style={styles.main_color}>南海大道1057号科技大厦二期A座</Text>
          </View>
        </View>
        {/* <Divider /> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={RoomList}
          renderItem={_renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <DialogInput
        isDialogVisible={isDialogVisible}
        title={'房间名'}
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
    padding: 10,
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
    padding: 15,
    borderColor: Theme.textMuted,
    borderWidth: 0.5,
    borderRadius: 4,
    marginTop: 15,
  },
  left_content: {
    flex: 85,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider_style: {
    width: 1,
    height: 18,
    backgroundColor: Theme.textMuted,
    marginHorizontal: 20,
  },
  icon_content: {
    flex: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
