import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Image, Card } from 'react-native-elements';
import { Button, Item, Label, Input, ActionSheet } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderCommon from '../../Component/HeaderCommon';

const ID_CARD = 'id_card'
const FULL_RENT = 'full_rent'

const identificationTypeList = [{ text: '身份证', value: ID_CARD }, { text: '护照', value: 'passport' }, { text: '取消', value: 'cancel' }]
const image = require('../../../assets/images/scan.png')

const data = {
  houseType: FULL_RENT,
  roomIds: [],
  identificationType: ID_CARD,
  identificationNo: '',
  mobile: '',
  name: ''
}
export default function AddTenant(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cameraOptions, setCameraOptions] = useState(null)
  const [roomList, setRoomList] = useState([])
  const [house, setHouse] = useState({})
  const [houseTypeList, setHouseTypeList] = useState([])
  const [form, setForm] = useState(data)
  const [actionSheet, setActionSheet] = useState(null);
  const [type, setType] = useState('');

  function updateIndex(index) {
    setSelectedIndex(index);
  }
  useEffect(() => {
    const { params } = props.route;
    if (params.type === 'member') {
      setType(params.type)
      return
    }
    props.getRoomList({ houseId: params.id }, (res) => {
      setRoomList(res.data)
    })
  }, [props.route.params])
  // hose详情获取
  useEffect(() => {
    setHouseTypeList(props.codeInfo.house_type);
    props.openCamera({ open: false, result: null })
    setHouse(props.houseDetail.data)
    let type = props.houseDetail.data.type
    if (type) {
      handleSetValue('houseType', type)
    }
  }, [props.houseDetail])

  // 扫描结果获取
  useEffect(() => {
    setCameraOptions(props.cameraOpt)
  }, [props.cameraOpt])

  //保存
  const saveTenant = () => {
    let result = {}
    const { params } = props.route;
    let { houseType, roomIds, identificationType, identificationNo, mobile, name } = form
    let houseId = params.id
    let tenantUserId = params.tenantId
    if (selectedIndex == 0) { // 扫码
      let { code, data } = cameraOptions.result
      if (!code) {
        let url = '/tenant/family/qrcode'
        let formData = {
          houseId,
          userId: data.id,
          tenantUserId
        }
        if (type !== 'member') {
          formData['houseType'] = houseType
          formData['roomIds'] = houseType !== FULL_RENT && roomIds || []
          url = '/tenant/qrcode'
        }
        props.scanAddTenant(url, formData, res => requestCalBack(res))
      } else {
        showToast('请先扫描二维码')
      }
    } else { // 手动
      // 租客或家庭成员
      if (type === 'member') {
        result = {
          houseId,
          identificationType,
          identificationNo,
          mobile,
          name,
          tenantUserId
        }
        console.log('addResult', result);
        props.addFamilyForm(result, (res) => requestCalBack(res))
      } else {
        result = {
          houseId,
          houseType,
          identificationType,
          identificationNo,
          roomIds: houseType !== FULL_RENT && roomIds || [],
          mobile,
          name
        }
        props.addTenantForm(result, (res) => requestCalBack(res))
      }
    }
  }
  const requestCalBack = (res) => {
    if (!res.code) {
      showToast('添加成功')
      NavigatorService.goBack();
    } else {
      showToast(res.message)
    }
  }

  // 未扫码展示
  const renderScanContent = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={image}
          style={{ width: 115, height: 115 }}
        />
        <Button rounded full style={styles.scanBtn} onPress={() => { props.openCamera({ open: true, result: null }) }}>
          <Text style={{ color: '#fff' }}>扫码添加住户</Text>
        </Button>
        <TouchableOpacity onPress={() => updateIndex(1)}>
          <Text style={styles.scanText}>没有二维码？手动添加住户并实名</Text>
        </TouchableOpacity>
      </View>)
  }

  // 扫码后展示的内容
  const renderCameraContent = () => {
    if (cameraOptions && cameraOptions.result) {
      let { data } = cameraOptions.result
      if (cameraOptions.result.error || !data) {
        return (
          <TouchableOpacity onPress={() => { props.openCamera({ open: true }) }} style={styles.errorDes}>
            <Text style={styles.errorColor}>{(cameraOptions.result && cameraOptions.result.error) || '无该用户，点击重新扫描'}</Text>
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
            <TouchableOpacity onPress={() => props.openCamera({ open: true })}>
              <Text style={styles.scanText}>重新扫描</Text>
            </TouchableOpacity>
          </View>
        </View>)
    }
    return renderScanContent()
  }
  // 房屋类型选择
  const renderRightPicker = () => {
    let cancel = { text: '取消', value: 'cancel' },
      array = []

    houseTypeList.forEach((val) => {
      array.push({
        text: val.value,
        value: val.code
      })
    })
    array.push(cancel)
    if (house.type) {
      return (
        <Text style={styles.dec}>{house.type === FULL_RENT ? '整租' : '合租'}</Text>)
    }
    return (
      <Button transparent onPress={() => { showActionSheet(array, 'houseType') }}>
        <Text>{form.houseType === FULL_RENT ? '整租' : '合租'}</Text>
        <AntDesign name="right" style={{ fontSize: 12, color: Theme.textSecondary, paddingLeft: 10 }} />
      </Button>
    )
  }
  // 房间渲染
  const renderRoomList = () => {
    if (roomList && roomList.length) {
      let result = roomList.map((item) => {
        let active = form.roomIds && form.roomIds.indexOf(item.id) > -1 && styles.activeColor
        return (<Button
          style={[styles.roomList, active]}
          onPress={() => selectRoom(item.id)}
          key={item.id}
          bordered
          disabled={item.tenantCount > 0 ? true : null}
        ><Text style={[styles.btnColor, active]}>{item.name}{(item.tenantCount > 0 ? '(已租)' : '')}</Text></Button>)
      })
      return (<View style={styles.roomListBox}>{result}</View>)
    } else {
      return (<View style={[styles.topViewFail]}>
                <Text style={styles.topTextStyle1}>对不起，您尚未添加合租房间</Text>
                <Text style={styles.topTextStyle2}>请设置完毕合租房间后，再添加合租住户</Text>
              </View> )
    }
  }
  const selectRoom = (id) => {
    let array = Object.assign([], form.roomIds)
    let index = array.indexOf(id)
    if (index > -1) {
      array.splice(index, 1)
    } else {
      array.push(id)
    }
    handleSetValue('roomIds', array)
  }
  // 证件类型选择
  const showActionSheet = (BUTTONS, TYPE) => {
    let CANCEL_INDEX = BUTTONS.length - 1
    if (actionSheet !== null) {
      actionSheet._root.showActionSheet(
        {
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX,
          title: "请选择证件类型"
        },
        buttonIndex => {
          if (buttonIndex !== CANCEL_INDEX) {
            let val = BUTTONS[buttonIndex].value
            handleSetValue(TYPE, val);
          }

        }
      )
    }
  }
  // 修改form表单
  const handleSetValue = (key, val) => {
    let result = Object.assign({}, form)
    result[key] = val
    setForm(result)
  }

  return (
    <View>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: props.route.params.type === 'member' ? '添加家庭成员' : '添加住户',
        }}
      />
      <View style={styles.container}>
        <ActionSheet ref={(c) => { setActionSheet(c) }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>房屋信息</Text>
          <Item style={styles.marginLeft0} inlineLabel picker>
            <Label style={[styles.labelTitle, styles.defaultSize]}>
              房屋地址
            </Label>
            <Input
              value={house.regionFullName || '--'}
              disabled={true}
              style={[styles.defaultSize, styles.textAlignR]}
            />
          </Item>
          <Item style={[styles.marginLeft0, { paddingVertical: 14, display: props.route.params.type === 'member' ? 'none' : 'flex' }]} inlineLabel picker>
            <Label style={[styles.labelTitle, styles.defaultSize]}>
              房屋类型
            </Label>
            {renderRightPicker()}
          </Item>
          {/* <ListItem
            leftElement={<Text>房屋地址</Text>}
            rightElement={<Text style={styles.dec}>{house.regionFullName || '--'}</Text>}
            bottomDivider
          /> */}
          {/* <ListItem
            leftElement={<Text>房屋类型</Text>}
            rightElement={renderRightPicker()}
          /> */}
          {form.houseType !== FULL_RENT && props.route.params.type !== 'member' && renderRoomList()}
          <View
            style={
              ({ paddingHorizontal: 10 }, selectedIndex ? { display: 'none' } : '')
            }>
            <Text style={[styles.title, { marginTop: 20 }]}>住户信息</Text>
            {renderCameraContent()}
          </View>
          <View style={selectedIndex !== 1 ? { display: 'none' } : ''}>
            <Text style={[styles.title, { marginTop: 20 }]}>住户信息</Text>
            <Item style={styles.marginLeft0} inlineLabel picker>
              <Label style={[styles.labelTitle, styles.defaultSize]}>
                真实姓名
              </Label>
              <Input
                placeholder="输入真实姓名"
                value={form.name}
                onChangeText={(val) => { handleSetValue('name', val) }}
                style={[styles.defaultSize, styles.textAlignR]}
              />
            </Item>
            <Item style={styles.marginLeft0} inlineLabel picker>
              <Label style={[styles.labelTitle, styles.defaultSize, { flex: 1 }]}>
                证件类型
              </Label>
              <Button transparent onPress={() => { showActionSheet(identificationTypeList, 'identificationType') }}>
                <Text>{form.identificationType === ID_CARD ? '身份证' : '护照'}</Text>
                <AntDesign name="right" style={{ fontSize: 12, color: Theme.textSecondary, paddingLeft: 10 }} />
              </Button>
            </Item>
            {form.identificationType === ID_CARD ? <Item style={styles.marginLeft0} inlineLabel picker>
              <Label style={[styles.labelTitle, styles.defaultSize]}>
                身份证号
              </Label>
              <Input
                placeholder="输入身份证号"
                onChangeText={(val) => { handleSetValue('identificationNo', val) }}
                value={form.identificationNo}
                style={[styles.defaultSize, styles.textAlignR]}
              />
            </Item> :
              <Item style={styles.marginLeft0} inlineLabel picker>
                <Label style={[styles.labelTitle, styles.defaultSize]}>
                  护照号
              </Label>
                <Input
                  value={form.identificationNo}
                  onChangeText={(val) => { handleSetValue('identificationNo', val) }}
                  placeholder="输入护照号"
                  style={[styles.defaultSize, styles.textAlignR]}
                />
              </Item>}
            <Item style={styles.marginLeft0} inlineLabel picker>
              <Label style={[styles.labelTitle, styles.defaultSize]}>
                手机号
              </Label>
              <Input
                placeholder="输入手机号"
                value={form.mobile}
                onChangeText={(val) => { handleSetValue('mobile', val) }}
                style={[styles.defaultSize, styles.textAlignR]}
              />
            </Item>
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
    paddingHorizontal: 16,
    height: 34,
    marginBottom: 15,
    borderColor: '#C7C7C7',
    marginRight: 10
  },
  defaultSize: {
    fontSize: 14,
  },
  marginLeft0: {
    marginLeft: 0,
  },
  labelTitle: {
    color: Theme.textDefault,
    flex: 1,
  },
  textAlignR: {
    textAlign: 'right',
  },
  topViewFail: {
    height: 70, 
    padding: 12,
    borderRadius: 4,
    marginVertical: 10,
    backgroundColor: '#FFECEC',
  },
  topTextStyle1: {
    fontSize: 16,
    color: Theme.textDefault,
  },
  topTextStyle2: {
    fontSize: 14,
    color: Theme.textSecondary,
    marginTop: 10,
  },
});
