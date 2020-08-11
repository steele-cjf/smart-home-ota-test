import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Image, Card } from 'react-native-elements';
import { Button, Item, Label, Input, Picker } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppRoute } from '../../../navigator/AppRoutes';
import tenant_form from '../config/tenant'

const image = require('../../../assets/images/scan.png')
const data = {
  houseId: '',
  houseType: '0',
  roomIds: [],
  userId: '',
  authType: 'id'
}
export default function AddTenant(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cameraOptions, setCameraOptions] = useState(null)
  const [roomList, setRoomList] = useState(props.roomList)
  const [house, setHouse] = useState({})
  const [houseTypeList, setHouseTypeList] = useState([])
  const [room, selectRoom] = useState({})

  const [form, setForm] = useState(data)

  function updateIndex(index) {
    setSelectedIndex(index);
  }
  // hose详情获取
  useEffect(() => {
    storage.get('code').then(res => {
      setHouseTypeList(res.house_type);
    });
    props.openCamera({ open: false, result: null })
    setHouse(props.houseDetail.data)
  }, [props.houseDetail])

  // 扫描结果获取
  useEffect(() => {
    setCameraOptions(props.cameraOpt)
  }, [props.cameraOpt])

  // 获取房间列表
  useEffect(() => {
    !roomList && props.getRoomList({ houseId: '488400405136433152' })
    setRoomList(props.roomList)
  }, [props.roomList])

  //保存
  const saveTenant = () => {
    NavigatorService.navigate(AppRoute.HOUSEDETAIL)
  }
  const onValueChange = (type, data) => {
    console.log(type, data)
    let obj = Object.assign({}, form)
    obj[type] = data
    setForm(obj)
  }

  const renderScanContent = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={image}
          style={{ width: 115, height: 115 }}
        />
        <Button rounded full style={styles.scanBtn} onPress={() => { props.openCamera({ open: true }) }}>
          <Text style={{ color: '#fff' }}>扫码添加住户</Text>
        </Button>
        <TouchableOpacity onPress={() => updateIndex(1)}>
          <Text style={styles.scanText}>没有二维码？手动添加住户并实名</Text>
        </TouchableOpacity>
      </View>)
  }


  const renderCameraContent = () => {
    if (cameraOptions && cameraOptions.result) {
      let { data } = cameraOptions.result
      if (cameraOptions.result.error || !data) {
        return (
          <TouchableOpacity onPress={() => { props.openCamera({ open: true }) }} style={styles.errorDes}>
            <Text style={styles.errorColor}> {(cameraOptions.result && cameraOptions.result.error) || '无该用户，点击重新扫描'}</Text>
          </TouchableOpacity>)
      }
      return (
        <View>
          <Card>
            <ListItem
              leftElement={<Text style={styles.dec}>姓名</Text>}
              rightElement={<Text>{(data && data.name) || '--'}</Text>}
              bottomDivider
            />
            <ListItem
              leftElement={<Text style={styles.dec}>手机号码</Text>}
              rightElement={<Text>{(data && data.mobile) || '--'}</Text>}
            />
          </Card>
          <View style={{ alignItems: 'center', paddingBottom: 60 }}>
            <Button rounded full style={styles.scanBtn} onPress={() => saveTenant()}>
              <Text style={{ color: '#fff' }}>添加成员</Text>
            </Button>
            <TouchableOpacity onPress={() => updateIndex(0)}>
              <Text style={styles.scanText}>重新扫描</Text>
            </TouchableOpacity>
          </View>
        </View>)
    }
    return renderScanContent()
  }

  const renderRightContext = () => {
    return (<Text style={styles.dec}>{house && house.regionFullName || '--'}</Text>)
  }
  const renderRightPicker = () => {
    return (<Picker
      iosHeader="房屋类型"
      mode="dropdown"
      placeholder='请选择房屋类型'
      selectedValue={form.houseType}
      onValueChange={(val) => onValueChange('houseType', val)}>
      {houseTypeList.map((item) => {
        return <Picker.Item label={item.value} key={item.code} value={item.code} />;
      })}
    </Picker>)
  }

  const renderRoomList = () => {
    if (roomList && roomList.data && roomList.data.length) {
      let result = roomList.data.map((item) => {
        let active = item.id === room && styles.activeColor
        return (<Button
          style={[styles.roomList, active]}
          onPress={() => selectRoom(item.id)}
          key={item.id}
          bordered
        ><Text style={[styles.btnColor, active]}>{item.name}</Text></Button>)
      })
      return (<View style={styles.roomListBox}>{result}</View>)
    } else {
      return (<Text style={styles.dec, { textAlign: 'center' }}>暂无房间</Text>)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>房屋信息</Text>
        <ListItem
          leftElement={<Text>房屋地址</Text>}
          rightElement={renderRightContext()}
          bottomDivider
        />
        <ListItem
          leftElement={<Text>房屋类型</Text>}
          rightElement={renderRightPicker()}
        />
        {form.houseType == 'co_rent' && renderRoomList()}
        <View
          style={
            ({ paddingHorizontal: 10 }, selectedIndex ? { display: 'none' } : '')
          }>
          <Text style={[styles.title, { marginTop: 20 }]}>住户信息</Text>
          {renderCameraContent()}
        </View>
        <View style={selectedIndex !== 1 ? { display: 'none' } : ''}>
          <Text style={[styles.title, { marginTop: 20 }]}>住户信息</Text>
          {tenant_form.map((item, index) => {
            if ((item.key === 'id' && form.authType === 'notId')
              || (item.key === 'notId' && form.authType === 'id')) return
            return (
              <Item style={styles.marginLeft0} inlineLabel picker>
                <Label style={[styles.labelTitle, styles.defaultSize, item.type === 'SELECT' && { flex: 1 }]}>
                  {item.name}
                </Label>
                {
                  item.type === 'SELECT' ? (
                    <Picker
                      iosHeader={item.name}
                      mode="dropdown"
                      style={{ textAlign: 'right' }}
                      selectedValue={form.authType}
                      iosIcon={
                        <AntDesign
                          name="right"
                          style={{ fontSize: 12, color: Theme.textSecondary }}
                        />
                      }
                      onValueChange={(val) => onValueChange('authType', val)}>
                      <Item label="身份证" value="id" />
                      <Item label="护照" value="notId" />
                    </Picker>) :
                    <Input
                      // value={houseRatePlan[item.key]}
                      // onChange={e => {
                      //   setData(item.key, e.nativeEvent.text, 'houseRatePlan');
                      // }}
                      placeholder={item.desc}
                      style={[styles.defaultSize, styles.textAlignR]}
                    />
                }
              </Item>
            );
          })}
          <View style={{ alignItems: 'center', paddingBottom: 60 }}>
            <Button rounded full style={styles.scanBtn} onPress={() => saveTenant()}>
              <Text style={{ color: '#fff' }}>添加住户并开始实名</Text>
            </Button>
            <TouchableOpacity onPress={() => updateIndex(0)}>
              <Text style={styles.scanText}>已实名？扫码立即添加</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
    flexDirection: 'column'
  },
  title: {
    fontSize: 16,
    marginBottom: 20
  },
  label: {
    color: '#999',
    fontSize: 16,
  },
  dec: {
    color: '#7C7C7C'
  },
  scanText: {
    color: '#527BDF',
    fontSize: 14,
    marginTop: 16
  },
  submit: {
    paddingHorizontal: 10,
    height: 60
  },
  errorDes: {
    alignItems: 'center',
    paddingVertical: 60
  },
  errorColor: {
    color: 'red'
  },
  scanText: {
    color: '#7C7C7C',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  scanBtn: {
    borderRadius: 30,
    backgroundColor: '#5C8BFF',
    marginVertical: 30
  },
  roomListBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTopColor: '#E9E9E9',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    paddingTop: 16
  },
  activeColor: {
    color: '#527BDF',
    borderColor: '#527BDF'
  },
  btnColor: {
    color: '#C7C7C7'
  },
  roomList: {
    paddingHorizontal: 28,
    paddingVertical: 6,
    marginBottom: 15,
    borderColor: '#C7C7C7'
  },
  defaultSize: {
    fontSize: 14,
  },
  marginLeft0: {
    marginLeft: 0,
  },
  labelTitle: {
    color: Theme.textDefault,
  },
  textAlignR: {
    textAlign: 'right',
  }
});
