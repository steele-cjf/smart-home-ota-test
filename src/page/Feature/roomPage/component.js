/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
// import {Button, Text, Input, Divider, Icon} from 'react-native-elements';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Input,
} from 'native-base';
import DialogInput from '../../Component/dialogInput';

export default function RoomPage(props) {
  const [RoomList, setRoomList] = useState([
    {id: 1, name: '整租', status: '整租可选'},
    {id: 1, name: '主卧', status: '已入住'},
    {id: 1, name: '次卧2', status: '未入住'},
    // {id: 1, name: '次卧3', status: '已入住'},
  ]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
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
  const sendInput = value => {
    console.log('ve', value);
    const data = {
      houseId: '483710797791371264',
      name: value,
    };
    props.addRoom(data, res => {
      console.log(res);
      if (!res.code) {
        setIsDialogVisible(false);
        setRoomList([...RoomList, {id: 5, name: value, status: '未入住'}]);
      }
    });
  };
  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.room_item_style}>
        <View style={styles.left_content}>
          <Text style={styles.main_color}>{item.name}</Text>
          {/* <Input value={item.name} /> */}
          <Text style={styles.status_color}>{item.status}</Text>
        </View>
        <View style={styles.divider_style} />
        <View style={styles.icon_content}>
          <Icon name="edit" color="#666666" />
          {item.status === '未入住' ? (
            <Icon
              name="delete"
              color="#E7263E"
              onPress={() => createTwoButtonAlert(item, index)}
            />
          ) : (
            <Icon name="delete" color="#c7c7c7" />
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
          <Button transparent onPress={() => setIsDialogVisible(true)}>
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
        // message={'请输入房间名'}
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
    color: '#282828',
  },
  status_color: {
    color: '#C7C7C7',
  },
  room_item_style: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderColor: '#C7C7C7',
    borderWidth: 0.5,
    borderRadius: 4,
    marginTop: 15,
  },
  left_content: {
    flex: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider_style: {
    width: 1,
    height: 20,
    backgroundColor: '#c7c7c7',
    marginHorizontal: 10,
  },
  icon_content: {
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
