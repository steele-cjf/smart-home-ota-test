/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Text, CheckBox} from 'react-native-elements';
import ImageUpload from '../../Component/imageUpload';
import {AppRoute} from '../../../navigator/AppRoutes';
import RegionPicker from '../../Component/citySelect';
import {TouchableOpacity} from 'react-native-gesture-handler';

function RecordHouse(props) {
  const [isSelf, setIsSelf] = useState(true);
  const [hasElevator, setHasElevator] = useState(false);
  const toggleSwitch = () => setHasElevator(previousState => !previousState);
  const toggleSelfSwitch = () => setIsSelf(previousState => !previousState);

  const [address, setAddress] = useState('');
  const [houseHolder, setHouseHolder] = useState({});
  const [houseLayout, setHouseLayout] = useState({});
  // const [
  //   housePropertyCertificateImageUrl,
  //   setHousePropertyCertificateImageUrl,
  // ] = useState('');
  const [formImage, setFormImage] = useState([]);
  const [tabs, setTabs] = useState([{name: '请选择', id: 0}]);
  const [regionId, setRegionId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  function handleFunc(flag, data) {
    console.log('tasss');
    console.log(flag, data);
    setModalVisible(flag);
    setRegionId(data);
  }

  function handlerAudit() {
    console.log(houseHolder);
    console.log(houseLayout);
    console.log(regionId);
    let result = new FormData();
    result.append('housePropertyCertificateImageUrl', formImage[0]);
    result.append('houseLayout', houseLayout);
    result.append('regionId', regionId);
    result.append('address', address);

    console.log('result', result);

    props.addHouse(result, res => {
      console.log('res', res);
      props.navigation.navigate(AppRoute.AUDIT);
    });
  }

  const setImageForm = (type, obj) => {
    let data = Object.assign([], formImage);
    data[type] = obj;
    console.log('data', data);
    setFormImage(data);
  };

  // 表单变化触发
  const setData = (key, value) => {
    let data = Object.assign({}, houseHolder);
    let houseData = Object.assign({}, houseLayout);
    data[key] = value;
    setHouseHolder(data);
    setHouseLayout(houseData);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>房源资料</Text>
        {/* <Input label="所在地区" placeholder="请选择地址" /> */}
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Input
            placeholder="请选择地址"
            value={regionId}
            disabled={true}
            inputStyle={styles.input_content}
            onChangeText={setRegionId}
            leftIcon={<Text style={styles.label}>所在地区</Text>}
          />
        </TouchableOpacity>
        <RegionPicker
          visible={modalVisible}
          tabs={tabs}
          close={(flag, data) => handleFunc(flag, data)}
        />
        <Input
          value={address}
          placeholder="街道、小区、楼与门牌号"
          inputStyle={styles.input_content}
          leftIcon={<Text style={styles.label}>详细地址</Text>}
          onChangeText={setAddress}
        />
        <View style={styles.flex_box}>
          <View>
            <Text style={styles.label}>房屋所有者</Text>
          </View>
          <View>
            <CheckBox
              center
              title="是否本人"
              containerStyle={styles.checkbox_style}
              checked={isSelf}
              onPress={toggleSelfSwitch}
            />
          </View>
        </View>
        <View style={isSelf ? {display: 'none'} : ''}>
          <Input
            value={houseHolder.holderName}
            placeholder="请输入所有者姓名"
            inputStyle={styles.input_content}
            // onChangeText={setHouseHolder}
            onChange={e => {
              setData('holderName', e.nativeEvent.text);
            }}
            leftIcon={<Text style={styles.label}>姓名</Text>}
          />
          <Input
            value={houseHolder.holderIdCardNumber}
            placeholder="请输入所有者身份证号"
            inputStyle={styles.input_content}
            // onChangeText={setHouseHolder}
            onChange={e => {
              setData('holderIdCardNumber', e.nativeEvent.text);
            }}
            leftIcon={<Text style={styles.label}>身份证号(护照)</Text>}
          />
          <Text style={styles.title}>授权文件</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <ImageUpload />
            <ImageUpload />
          </View>
        </View>
        <Text style={styles.title}>房产证照片</Text>
        <ImageUpload setImageForm={obj => setImageForm(0, obj)} />
        <Text style={styles.title}>建筑信息</Text>
        <Input
          value={houseLayout.area}
          placeholder="㎡"
          inputStyle={styles.input_content}
          leftIcon={<Text style={styles.label}>建筑面积</Text>}
          // onChangeText={setHouseLayout}
          onChange={e => {
            setData('area', e.nativeEvent.text);
          }}
        />
        <View style={styles.flex_box}>
          <Text style={styles.label}>楼层</Text>
          <View style={{width: 100}}>
            <Input
              value={houseLayout.floor}
              placeholder="第几层"
              inputStyle={styles.input_content}
              onChange={e => {
                setData('floor', e.nativeEvent.text);
              }}
            />
          </View>
          <View style={{width: 100}}>
            <Input
              value={houseLayout.floorCount}
              placeholder="共几层"
              inputStyle={styles.input_content}
              onChange={e => {
                setData('floorCount', e.nativeEvent.text);
              }}
            />
          </View>
          <View>
            <CheckBox
              center
              title="电梯"
              containerStyle={styles.checkbox_style}
              checked={hasElevator}
              onPress={toggleSwitch}
            />
          </View>
        </View>
        <View style={styles.flex_box}>
          <Text style={styles.label}>户型</Text>
          <View style={{width: 70}}>
            <Input
              value={houseLayout.roomCount}
              placeholder="几室"
              inputStyle={styles.input_content}
              onChange={e => {
                setData('roomCount', e.nativeEvent.text);
              }}
            />
          </View>
          <View style={{width: 70}}>
            <Input
              value={houseLayout.hallCount}
              placeholder="几厅"
              inputStyle={styles.input_content}
              onChange={e => {
                setData('hallCount', e.nativeEvent.text);
              }}
            />
          </View>
          <View style={{width: 70}}>
            <Input
              value={houseLayout.toiletCount}
              placeholder="几卫"
              inputStyle={styles.input_content}
              onChange={e => {
                setData('toiletCount', e.nativeEvent.text);
              }}
            />
          </View>
          <View style={{width: 70}}>
            <Input
              value={houseLayout.direction}
              placeholder="朝向"
              inputStyle={styles.input_content}
              onChange={e => {
                setData('direction', e.nativeEvent.text);
              }}
            />
          </View>
        </View>
        <Button
          title="提交审核"
          style={{paddingVertical: 20}}
          onPress={() => handlerAudit()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  flex_box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#86939e',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    paddingRight: 20,
  },
  input_content: {
    fontSize: 14,
    minHeight: 30,
  },
  checkbox_style: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  modal_content: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 150,
  },
});
export default RecordHouse;
