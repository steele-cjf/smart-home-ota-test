/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  Picker,
  CheckBox,
} from 'native-base';
import storage from '../../../util/storage';
import Theme from '../../../style/colors';
import ImageUpload from '../../Component/imageUpload';
import {AppRoute} from '../../../navigator/AppRoutes';
import RegionPicker from '../../Component/citySelect';
import {TouchableOpacity} from 'react-native-gesture-handler';

function RecordHouse(props) {
  const [selfList, setSelfList] = useState([]);
  const [houseDirectionList, setHouseDirection] = useState([]);
  const [hasElevator, setHasElevator] = useState(false);
  const toggleSwitch = () => setHasElevator(previousState => !previousState);

  const [address, setAddress] = useState('');
  const [houseHolder, setHouseHolder] = useState({});
  const [houseLayout, setHouseLayout] = useState({});
  const [
    housePropertyCertificateImage,
    setHousePropertyCertificateImage,
  ] = useState([]);
  const [certificateFilesImg, setCertificateFilesImg] = useState([]);
  const [tabs, setTabs] = useState([{name: '请选择', id: 0}]);
  const [regionName, setRegionName] = useState('');
  const [regionId, setRegionId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    storage.get('code').then(res => {
      console.log('res', res.house_direction);
      setSelfList(res.house_holder);
      setHouseDirection(res.house_direction);
    });
  }, []);

  function handleFunc(flag, data) {
    setModalVisible(flag);
    setRegionId(data);
    let name = tabs.map(item => {
      if (item.id) {
        return item.name;
      }
    });
    setRegionName(name.join(''));
  }

  function handlerAudit() {
    let result = new FormData();

    objToFormData('houseHolder', houseHolder, result);
    objToFormData('houseLayout', houseLayout, result);
    // 是否有电梯 hasElevator
    result.append('houseLayout.hasElevator', hasElevator);
    for (let c = 0; c < certificateFilesImg.length; c++) {
      result.append('houseHolder.certificateFiles', certificateFilesImg[c]);
    }
    result.append(
      'housePropertyCertificateImage',
      housePropertyCertificateImage[0],
    );

    result.append('regionId', regionId);
    result.append('address', address);
    console.log('result', result);
    props.addHouse(result, res => {
      console.log('res', res);
      props.navigation.navigate(AppRoute.AUDIT);
    });
  }

  const objToFormData = (key, data, result) => {
    for (let d in data) {
      result.append(key + '.' + d, data[d]);
    }
  };

  const setImageForm = (key, obj, type) => {
    let data;
    if (type === 'cert') {
      data = Object.assign([], housePropertyCertificateImage);
      setHousePropertyCertificateImage(data);
      data[key] = obj;
    } else {
      data = Object.assign([], certificateFilesImg);
      data[key] = obj;
      setCertificateFilesImg(data);
    }
  };

  // 表单变化触发
  const setData = (key, value, type) => {
    if (type === 'houseHolder') {
      let data = Object.assign({}, houseHolder);
      data[key] = value;
      setHouseHolder(data);
    } else {
      let data = Object.assign({}, houseLayout);
      data[key] = value;
      setHouseLayout(data);
    }
  };

  return (
    <View style={{backgroundColor: Theme.background}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.publishTitle, styles.specialPadding]}>
            房源资料
          </Text>
          <Form>
            <Item style={styles.marginLeft0} inlineLabel>
              <Label
                style={[styles.labelTitle, styles.defaultSize, styles.flex1]}>
                所在地区
              </Label>
              <TouchableOpacity
                style={{paddingRight: 20}}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Input
                  value={regionName}
                  disabled={true}
                  onChangeText={setRegionId}
                  placeholder="请选择 - 省 - 市 - 区"
                  placeholderTextColor={Theme.textMuted}
                  style={[{fontSize: 14}, styles.textAlignR]}
                />
                <AntDesign
                  name="right"
                  style={{
                    fontSize: 12,
                    color: Theme.textSecondary,
                    position: 'absolute',
                    right: 0,
                    top: 20,
                  }}
                />
              </TouchableOpacity>
            </Item>
            <Item style={styles.marginLeft0} inlineLabel>
              <Label style={[styles.labelTitle, styles.defaultSize]}>
                详细地址
              </Label>
              <Input
                value={address}
                onChangeText={setAddress}
                placeholder="街道、小区、楼与门牌号"
                placeholderTextColor={Theme.textMuted}
                style={[styles.defaultSize, styles.textAlignR]}
              />
            </Item>
            <Item picker>
              <Label
                style={[styles.labelTitle, styles.defaultSize, styles.flex1]}>
                房屋所有者
              </Label>
              <Picker
                mode="dropdown"
                selectedValue={houseHolder.self}
                onValueChange={value => setHouseHolder({self: value})}
                iosIcon={
                  <AntDesign
                    name="right"
                    style={{fontSize: 12, color: Theme.textSecondary}}
                  />
                }>
                {selfList.map((item, index) => {
                  return <Picker.Item label={item.value} value={item.code} />;
                })}
              </Picker>
            </Item>

            {/*  非本人 */}
            <View
              style={houseHolder.self === 'others' ? '' : {display: 'none'}}>
              <Item style={styles.marginLeft0} inlineLabel>
                <Label style={[styles.labelTitle, styles.defaultSize]}>
                  所有者姓名
                </Label>
                <Input
                  value={houseHolder.holderName}
                  onChange={e => {
                    setData('holderName', e.nativeEvent.text, 'houseHolder');
                  }}
                  style={[styles.defaultSize, styles.textAlignR]}
                />
              </Item>
              <Item style={styles.marginLeft0} inlineLabel>
                <Label style={[styles.labelTitle, styles.defaultSize]}>
                  所有者身份证号/护照号
                </Label>
                <Input
                  value={houseHolder.holderIdCardNumber}
                  onChange={e => {
                    setData(
                      'holderIdCardNumber',
                      e.nativeEvent.text,
                      'houseHolder',
                    );
                  }}
                  style={[styles.defaultSize, styles.textAlignR]}
                />
              </Item>
              <Text style={[styles.publishTitle]}>授权文件</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <ImageUpload
                  setImageForm={obj => setImageForm(0, obj, 'files')}
                />
                <ImageUpload
                  setImageForm={obj => setImageForm(1, obj, 'files')}
                />
              </View>
            </View>
            <Text style={[styles.publishTitle]}>房产证照片</Text>
            <ImageUpload setImageForm={obj => setImageForm(0, obj, 'cert')} />
            <Text style={[styles.publishTitle]}>建筑信息</Text>
            <Item style={styles.marginLeft0} inlineLabel>
              <Label style={[styles.labelTitle, styles.defaultSize]}>
                建筑面积
              </Label>
              <Input
                value={houseLayout.area}
                onChange={e => {
                  setData('area', e.nativeEvent.text, 'houseLayout');
                }}
                style={[styles.defaultSize, styles.textAlignR]}
              />
              <Text style={[styles.labelTitle, styles.defaultSize]}>㎡</Text>
            </Item>
            <Item style={styles.marginLeft0} inlineLabel>
              <Label
                style={[
                  styles.labelTitle,
                  styles.defaultSize,
                  styles.width100,
                ]}>
                楼层
              </Label>
              <Text style={[styles.labelTitle, styles.defaultSize]}>共</Text>
              <Input
                value={houseLayout.floorCount}
                onChange={e => {
                  setData('floorCount', e.nativeEvent.text, 'houseLayout');
                }}
                style={[styles.defaultSize, styles.textAlignC, styles.width100]}
              />
              <Text style={[styles.labelTitle, styles.defaultSize]}>
                层 / 第
              </Text>
              <Input
                value={houseLayout.floor}
                onChange={e => {
                  setData('floor', e.nativeEvent.text, 'houseLayout');
                }}
                style={[styles.defaultSize, styles.textAlignC]}
              />
              <Text style={[styles.labelTitle, styles.defaultSize]}>层</Text>
              <CheckBox
                // center
                title="电梯"
                containerStyle={styles.checkbox_style}
                checked={hasElevator}
                onPress={toggleSwitch}
              />
              <Text>电梯大幅度发</Text>
            </Item>
            <Item style={styles.marginLeft0} inlineLabel>
              <Label
                style={[styles.labelTitle, styles.defaultSize, styles.flex1]}>
                户型
              </Label>
              <Input
                value={houseLayout.roomCount}
                onChange={e => {
                  setData('roomCount', e.nativeEvent.text, 'houseLayout');
                }}
                style={[styles.defaultSize, styles.textAlignR, styles.width100]}
              />
              <Text style={[styles.labelTitle, styles.defaultSize]}>室</Text>
              <Input
                value={houseLayout.hallCount}
                onChange={e => {
                  setData('hallCount', e.nativeEvent.text, 'houseLayout');
                }}
                style={[styles.defaultSize, styles.textAlignR]}
              />
              <Text style={[styles.labelTitle, styles.defaultSize]}>厅</Text>
              <Input
                value={houseLayout.toiletCount}
                onChange={e => {
                  setData('toiletCount', e.nativeEvent.text, 'houseLayout');
                }}
                style={[styles.defaultSize, styles.textAlignR]}
              />
              <Text style={[styles.labelTitle, styles.defaultSize]}>卫</Text>
            </Item>
            <Item picker style={{marginBottom: 15}}>
              <Label
                style={[styles.labelTitle, styles.defaultSize, styles.flex1]}>
                房屋朝向
              </Label>
              <Picker
                mode="dropdown"
                selectedValue={houseLayout.direction}
                onValueChange={value => setHouseLayout({direction: value})}
                iosIcon={
                  <AntDesign
                    name="right"
                    style={{fontSize: 12, color: Theme.textSecondary}}
                  />
                }>
                {houseDirectionList.map((item, index) => {
                  return <Picker.Item label={item.value} value={item.code} />;
                })}
              </Picker>
            </Item>
          </Form>
          <Button
            full
            onPress={() => handlerAudit()}
            style={{borderRadius: 40, marginVertical: 36}}>
            <Text>提交审核</Text>
          </Button>
        </View>
      </ScrollView>

      <RegionPicker
        visible={modalVisible}
        tabs={tabs}
        setTabs={data => setTabs(data)}
        close={(flag, data) => handleFunc(flag, data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textAlignR: {
    textAlign: 'right',
  },
  textAlignC: {
    textAlign: 'center',
  },
  width100: {
    width: 80,
  },
  flex1: {
    flex: 1,
  },
  defaultSize: {
    fontSize: 14,
  },
  marginLeft0: {
    marginLeft: 0,
  },
  publishTitle: {
    fontSize: 16,
    color: Theme.textTitle,
    paddingBottom: 24,
    paddingTop: 32,
  },
  specialPadding: {
    paddingTop: 16,
    paddingBottom: 14,
  },
  ImgTitle: {
    fontSize: 16,
    color: Theme.textTitle,
    paddingTop: 32,
    paddingBottom: 5,
  },
  imgDec: {
    fontSize: 12,
    color: Theme.textSecondary,
  },
  labelTitle: {
    color: Theme.textDefault,
  },
  container: {
    flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    marginHorizontal: 15,
  },
  label_content: {
    marginTop: 15,
  },
});

export default RecordHouse;
