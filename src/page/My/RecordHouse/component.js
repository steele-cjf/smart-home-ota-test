/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CheckBox } from 'react-native-elements';
import { Form, Item, Input, Label, Text, Button, Root, ActionSheet, Body, Spinner } from 'native-base';
import storage from '../../../util/storage';
import Theme from '../../../style/colors';
import ImageUpload from '../../Component/imageUpload';
import { AppRoute } from '../../../navigator/AppRoutes';
import RegionPicker from '../../Component/citySelect';
import { TouchableOpacity } from 'react-native-gesture-handler';
import showToast from '../../../util/toast';
import HeaderCommon from '../../Component/HeaderCommon'

function RecordHouse(props) {
  const [loading, setLoading] = useState();
  const [houseId, setHouseId] = useState('');
  const [selfList, setSelfList] = useState([]);
  const [selectedSelfValue, setSelectedSelfValue] = useState('');
  const [houseDirectionList, setHouseDirection] = useState([]);
  const [selectedDirectionValue, setSelectedDirectionValue] = useState('');
  const [hasElevator, setHasElevator] = useState(false);
  const toggleSwitch = () => setHasElevator(previousState => !previousState);

  const [certificateImage, setCertificateImage] = useState('')
  const [idCardImage, setIdCardImage] = useState('')
  const [image, setImage] = useState('')
  const [address, setAddress] = useState('');
  const [houseHolder, setHouseHolder] = useState({});
  const [houseLayout, setHouseLayout] = useState({});
  const [
    housePropertyCertificateImage,
    setHousePropertyCertificateImage,
  ] = useState([]);
  const [certificateFilesImg, setCertificateFilesImg] = useState([]);
  const initTabs = { name: '请选择', id: 0 }
  // const [certificateFile, setCertificateFile] = useState([]);
  const [idCardFile, setIdCardFile] = useState([]);

  const [tabs, setTabs] = useState([initTabs]);
  const [regionName, setRegionName] = useState('');
  const [regionId, setRegionId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    storage.get('code').then(res => {
      setSelfList(handlerOptions(res.house_holder));
      setHouseDirection(handlerOptions(res.house_direction));
    });
    const { params } = props.route;
    if (params && params.id) {
      setLoading(true);
      setHouseId(params.id);
      storage.get('dictionaryMappings').then(res => {
        getDetail(res, params.id);
      });
    }
  }, [getDetail, props]);

  const getDetail = useCallback((obj, id) => {
    props.getHouseDetail(id, res => {
      if (!res.code) {
        setLoading(false)
        if (res.data) {
          const info = res.data;
          let initAddress = info.address.split(info.formattedAddress)
          setAddress(initAddress[1] || initAddress[0]);
          setHouseHolder(info.houseHolder);
          console.log('houseHolder123', houseHolder);
          setHouseLayout(info.houseLayout);
          setCertificateFilesImg(info.houseHolder.certificateFileUrls || []);
          setRegionId(info.regionId);

          setRegionName(info.formattedAddress);
          setHasElevator(info.houseLayout.hasElevator);
          setSelectedSelfValue(obj.house_holder[info.houseHolder.self]);
          setSelectedDirectionValue(obj.house_direction[info.houseLayout.direction]);

          setLoading(false);
          setTabs(res.data.regions.concat(initTabs))
          
          
          $getImage(info.housePropertyCertificateImageUrl, res => {
            setHousePropertyCertificateImage([res])
            setImage(res.uri);
          }, true)
          $getImage(info.houseHolder.certificateFileUrl, res => {
            setCertificateFilesImg([res])
            setCertificateImage(res.uri);
          }, true)
          $getImage(info.houseHolder.idCardFileUrl, res => {
            setIdCardFile([res])
            setIdCardImage(res.uri);
          }, true)
        }
      }
    });
  });

  const handlerOptions = list => {
    list = list.map(item => {
      return {
        text: item.value,
        value: item.code,
      };
    });
    list.push({ text: '取消', value: 'cancel' });
    return list;
  };

  const handleFunc = (flag, data) => {
    setModalVisible(flag);
    setRegionId(data);
    let name = tabs.map(item => {
      if (item.id) {
        return item.name;
      }
    });
    setRegionName(name.join(''));
  };

  const handlerAudit = () => {
    let result = new FormData();
    objToFormData('houseHolder', houseHolder, result);
    objToFormData('houseLayout', houseLayout, result);
    // 是否有电梯 hasElevator
    result.append('houseLayout.hasElevator', hasElevator);
    if (houseHolder.self === 'others') { // 如果非本人
      if (certificateFilesImg && certificateFilesImg[0]) {
        result.append(
          'houseHolder.certificateFile',
          certificateFilesImg[0],
        );
      }
      if (idCardFile && idCardFile[0]) {
        result.append(
          'houseHolder.idCardFile',
          idCardFile[0],
        );
      }
    }
    if (housePropertyCertificateImage && housePropertyCertificateImage[0]) {
      result.append(
        'housePropertyCertificateImage',
        housePropertyCertificateImage[0],
      );
    }
    // result.append('regions', tabs)
    result.append('regionId', regionId);
    result.append('address', regionName + address);

    if (houseId) {
      console.log('houseHolder', houseHolder);
      result.append('id', houseId);
      console.log('houseLayout.id', result)
      props.updateHouse(houseId, result, res => {
        console.log('update', res);
        if (!res.code) {
          props.navigation.navigate(AppRoute.HOUSEDETAIL, {
            id: houseId,
          });
        } else {
          showToast(res.message);
        }
      });
    } else {
      console.log('result123', result)
      props.addHouse(result, res => {
        if (!res.code) {
          props.navigation.goBack();
        } else {
          showToast(res.message);
        }
      });
    }
  };

  const objToFormData = (key, data, result) => {
    for (let d in data) {
      result.append(key + '.' + d, data[d]);
    }
  };

  const setImageForm = (key, obj, type) => {
    let data;
    if (type === 'houseCert') {
      data = Object.assign([], housePropertyCertificateImage);
      setHousePropertyCertificateImage(data);
      data[key] = obj;
      console.log('houseI', housePropertyCertificateImage)
    } else if (type === 'cert') {
      data = Object.assign([], certificateFilesImg);
      data[key] = obj;
      setCertificateFilesImg(data);
      console.log('cert', certificateFilesImg)
    } else {
      data = Object.assign([], idCardFile);
      data[key] = obj;
      setIdCardFile(data);
      console.log('idCard', idCardFile)
    }
  };

  const openSettings = (BUTTONS, CANCEL_INDEX, TYPE) => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        // destructiveButtonIndex: this.DESTRUCTIVE_INDEX,
        // title: i18n.t("settings")
      },
      buttonIndex => {
        if (buttonIndex === CANCEL_INDEX) {
          return;
        }
        handleSetValue(buttonIndex, TYPE);
        console.log('Logout was clicked ' + BUTTONS[buttonIndex]);
      },
    );
  };
  const handleSetValue = (index, type) => {
    switch (type) {
      case 'self':
        setHouseHolder({...houseHolder, ...{ self: selfList[index].value }});
        setSelectedSelfValue(selfList[index].text);
        break;
      case 'direction':
        // setHouseLayout({direction: houseDirectionList[index].value}); 存在数据重置的bug
        setData('direction', houseDirectionList[index].value, 'houseLayout');
        setSelectedDirectionValue(houseDirectionList[index].text);
        break;
    }
  };
  // 表单变化触发
  const setData = (key, value, type) => {
    console.log('ddf', key);
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
    <Root>
      {loading ? (
        <Spinner color="#5C8BFF" />
      ) : (
          <View style={{ flex: 1 }}>
            <HeaderCommon
              options={{
                backTitle: '返回',
                title: houseId && '修改房源' || '添加房源'
              }}
            />
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.container}>
                <Text style={[styles.publishTitle, styles.specialPadding]}>
                  房源资料
              </Text>
                <Form>
                  <Item style={styles.marginLeft0} inlineLabel>
                    <Label
                      style={[
                        styles.labelTitle,
                        styles.defaultSize,
                        styles.flex1,
                      ]}>
                      所在地区
                  </Label>
                    <TouchableOpacity
                      style={styles.input_item}
                      onPress={() => {
                        setModalVisible(true);
                      }}>
                      <Text
                        numberOfLines={1}
                        style={[
                          { fontSize: $screen.scaleSize(14), paddingRight: 10 },
                          styles.textAlignR,
                        ]}>
                        {regionName}
                      </Text>
                      <AntDesign
                        name="right"
                        style={{
                          fontSize: $screen.scaleSize(12),
                          color: Theme.textSecondary,
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
                  <Item style={styles.marginLeft0} inlineLabel>
                    <Label
                      style={[
                        styles.labelTitle,
                        styles.defaultSize,
                        styles.flex1,
                      ]}>
                      房屋所有者
                  </Label>
                    <TouchableOpacity
                      style={styles.input_item}
                      onPress={() => openSettings(selfList, 2, 'self')}>
                      <Text
                        style={[
                          { fontSize: $screen.scaleSize(14), paddingRight: 10 },
                          styles.textAlignR,
                        ]}>
                        {selectedSelfValue}
                      </Text>
                      <AntDesign
                        name="right"
                        style={{
                          fontSize: $screen.scaleSize(12),
                          color: Theme.textSecondary,
                        }}
                      />
                    </TouchableOpacity>
                  </Item>
                  {/*  非本人 */}
                  <View
                    style={
                      houseHolder.self === 'others' ? '' : { display: 'none' }
                    }>
                    <Item style={styles.marginLeft0} inlineLabel>
                      <Label style={[styles.labelTitle, styles.defaultSize]}>
                        所有者姓名
                    </Label>
                      <Input
                        value={houseHolder.holderName}
                        onChange={e => {
                          setData(
                            'holderName',
                            e.nativeEvent.text,
                            'houseHolder',
                          );
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
                        justifyContent: 'flex-start',
                      }}>
                      <View style={{alignItems: 'center', marginRight: 40}}>
                        <ImageUpload
                          imgUrl={certificateImage}
                          setImageForm={obj => setImageForm(0, obj, 'cert')}
                        />
                        <Text style={{color: '#c7c7c7'}}>授权文件</Text>
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <ImageUpload
                          imgUrl={idCardImage}
                          setImageForm={obj => setImageForm(0, obj, 'idCard')}
                        />
                        <Text style={{color: '#c7c7c7'}}>房主身份证</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={[styles.publishTitle]}>房产证照片</Text>
                  <ImageUpload
                    imgUrl={image}
                    setImageForm={obj => setImageForm(0, obj, 'houseCert')}
                  />
                  <Text style={[styles.publishTitle]}>建筑信息</Text>
                  <Item style={styles.marginLeft0} inlineLabel>
                    <Label style={[styles.labelTitle, styles.defaultSize]}>
                      建筑面积
                  </Label>
                    <Input
                      keyboardType="numeric"
                      value={
                        houseLayout.area
                          ? '' + houseLayout.area
                          : houseLayout.area
                      }
                      onChange={e => {
                        setData('area', e.nativeEvent.text, 'houseLayout');
                      }}
                      style={[styles.defaultSize, styles.textAlignR]}
                    />
                    <Text style={[styles.labelTitle, styles.defaultSize]}>
                      ㎡
                  </Text>
                  </Item>
                  <Item
                    style={[
                      styles.marginLeft0,
                      { flexDirection: 'row', alignItems: 'center' },
                    ]}
                    inlineLabel>
                    <Label
                      style={[
                        styles.labelTitle,
                        styles.defaultSize,
                        styles.width100,
                        { flex: 3 },
                      ]}>
                      楼层
                  </Label>
                    <View
                      style={{
                        flex: 4,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={[styles.labelTitle, styles.defaultSize]}>
                        共
                    </Text>
                      <Input
                        keyboardType="numeric"
                        value={
                          houseLayout.floorCount
                            ? '' + houseLayout.floorCount
                            : houseLayout.floorCount
                        }
                        onChange={e => {
                          setData(
                            'floorCount',
                            e.nativeEvent.text,
                            'houseLayout',
                          );
                        }}
                        style={[
                          styles.defaultSize,
                          styles.textAlignC,
                          styles.width100,
                        ]}
                      />
                      <Text style={[styles.labelTitle, styles.defaultSize]}>
                        层 / 第
                      </Text>
                      <Input
                        keyboardType="numeric"
                        value={
                          houseLayout.floor
                            ? '' + houseLayout.floor
                            : houseLayout.floor
                        }
                        onChange={e => {
                          setData('floor', e.nativeEvent.text, 'houseLayout');
                        }}
                        style={[styles.defaultSize, styles.textAlignC]}
                      />
                      <Text style={[styles.labelTitle, styles.defaultSize]}>
                        层
                    </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        flexDirection: 'row',
                      }}>
                      <CheckBox
                        containerStyle={styles.checkBoxContainer}
                        titleStyle={styles.checkBoxTitle}
                        title="电梯"
                        checkedColor={Theme.primary}
                        uncheckedColor={Theme.primary}
                        checked={hasElevator}
                        onPress={toggleSwitch}
                      />
                    </View>
                  </Item>
                  <Item style={styles.marginLeft0} inlineLabel>
                    <Label
                      style={[
                        styles.labelTitle,
                        styles.defaultSize,
                        styles.flex1,
                      ]}>
                      户型
                  </Label>
                    <Input
                      keyboardType="numeric"
                      value={
                        houseLayout.roomCount
                          ? '' + houseLayout.roomCount
                          : houseLayout.roomCount
                      }
                      onChange={e => {
                        setData('roomCount', e.nativeEvent.text, 'houseLayout');
                      }}
                      style={[
                        styles.defaultSize,
                        styles.textAlignR,
                        styles.width100,
                      ]}
                    />
                    <Text style={[styles.labelTitle, styles.defaultSize]}>
                      室
                  </Text>
                    <Input
                      keyboardType="numeric"
                      value={
                        houseLayout.hallCount
                          ? '' + houseLayout.hallCount
                          : houseLayout.hallCount
                      }
                      onChange={e => {
                        setData('hallCount', e.nativeEvent.text, 'houseLayout');
                      }}
                      style={[styles.defaultSize, styles.textAlignR]}
                    />
                    <Text style={[styles.labelTitle, styles.defaultSize]}>
                      厅
                  </Text>
                    <Input
                      keyboardType="numeric"
                      value={
                        houseLayout.toiletCount
                          ? '' + houseLayout.toiletCount
                          : houseLayout.toiletCount
                      }
                      onChange={e => {
                        setData('toiletCount', e.nativeEvent.text, 'houseLayout');
                      }}
                      style={[styles.defaultSize, styles.textAlignR]}
                    />
                    <Text style={[styles.labelTitle, styles.defaultSize]}>
                      卫
                  </Text>
                  </Item>
                  <Item picker style={{ marginBottom: 15 }}>
                    <Label
                      style={[
                        styles.labelTitle,
                        styles.defaultSize,
                        styles.flex1,
                      ]}>
                      房屋朝向
                  </Label>
                    <TouchableOpacity
                      style={styles.input_item}
                      onPress={() =>
                        openSettings(houseDirectionList, 4, 'direction')
                      }>
                      <Text
                        style={[
                          { fontSize: $screen.scaleSize(14), paddingRight: 10 },
                          styles.textAlignR,
                        ]}>
                        {selectedDirectionValue}
                      </Text>
                      <AntDesign
                        name="right"
                        style={{
                          fontSize: $screen.scaleSize(12),
                          color: Theme.textSecondary,
                        }}
                      />
                    </TouchableOpacity>
                  </Item>
                </Form>
                <Button
                  full
                  onPress={() => handlerAudit()}
                  style={{ borderRadius: 40, marginVertical: 36 }}>
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
        )}
    </Root>
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
    fontSize: $screen.scaleSize(14),
  },
  marginLeft0: {
    marginLeft: 0,
  },
  publishTitle: {
    fontSize: $screen.scaleSize(16),
    color: Theme.textTitle,
    paddingBottom: 24,
    paddingTop: 32,
  },
  specialPadding: {
    paddingTop: 16,
    paddingBottom: 14,
  },
  ImgTitle: {
    fontSize: $screen.scaleSize(16),
    color: Theme.textTitle,
    paddingTop: 32,
    paddingBottom: 5,
  },
  imgDec: {
    fontSize: $screen.scaleSize(12),
    color: Theme.textSecondary,
  },
  labelTitle: {
    color: Theme.textDefault,
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  label_content: {
    marginTop: 15,
  },
  input_item: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  checkBoxTitle: {
    fontSize: $screen.scaleSize(14),
    color: Theme.textDefault,
  },
});

export default RecordHouse;
