/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CheckBox } from 'react-native-elements';
import { Form, Item, Input, Label, Text, Button, Root, Body, Spinner } from 'native-base';
import storage from '../../../util/storage';
import Theme from '../../../style/colors';
import ImageUpload from '../../Component/imageUpload';
import { AppRoute } from '../../../navigator/AppRoutes';
import RegionPicker from '../../Component/citySelect';
import { TouchableOpacity } from 'react-native-gesture-handler';
import showToast from '../../../util/toast';
import HeaderCommon from '../../Component/HeaderCommon'
import ActionSheet from 'react-native-custom-actionsheet'

function RecordHouse(props) {
  const [loading, setLoading] = useState();
  const [houseId, setHouseId] = useState('');
  const [selfList, setSelfList] = useState([]);
  const [selectedSelfValue, setSelectedSelfValue] = useState('本人');
  const [houseDirectionList, setHouseDirection] = useState([]);
  const [selectedDirectionValue, setSelectedDirectionValue] = useState('');
  const refMobile = useRef(null);
  const [hasElevator, setHasElevator] = useState(false);
  const ActionSheetRef = useRef(null);
  const [ActionSheetConfig, setActionSheetConfig] = useState({
    options: ['取消'],
    TYPE: '',
    CANCEL_INDEX: 0
  })

  const [certificateImage, setCertificateImage] = useState('')
  const [idCardImage, setIdCardImage] = useState('')
  const [image, setImage] = useState('')
  const [address, setAddress] = useState('');
  const [houseHolder, setHouseHolder] = useState({ self: 'self' });
  const [houseLayout, setHouseLayout] = useState({
    hasElevator: false,
  });
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
      setLoading(false);
      if (!res.code) {
        if (res.data) {
          console.log('detail', res.data);
          const info = res.data;
          setAddress(info.address.slice(info.regionFullName.length || 0));
          setHouseLayout(info.houseLayout);
          setCertificateFilesImg(info.houseHolder.certificateFileUrls || []);
          setRegionId(info.regionId);

          setRegionName(info.regionFullName);
          setHasElevator(info.houseLayout.hasElevator);
          setSelectedSelfValue(obj.house_holder[info.houseHolder.self]);
          setSelectedDirectionValue(obj.house_direction[info.houseLayout.direction]);
          setTabs(res.data.regions.concat(initTabs))

          if (info.houseHolder.self === 'self') {
            info.houseHolder.holderName = ''
            info.houseHolder.holderIdCardNumber = ''
          } else {
            $getImage(info.houseHolder.certificateFileUrl, res => {
              setCertificateFilesImg([res])
              setCertificateImage(res.uri);
            }, true)
            $getImage(info.houseHolder.idCardFileUrl, res => {
              setIdCardFile([res])
              setIdCardImage(res.uri);
            }, true)
          }
          setHouseHolder(info.houseHolder);

          $getImage(info.housePropertyCertificateImageUrl, async res => {
            await setHousePropertyCertificateImage([res])
            setImage(res.uri);
            // setLoading(false);
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
    list.push({ text: '取消', value: '取消' });
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
    setLoading(true);
    let result = new FormData();
    objToFormData('houseHolder', houseHolder, result);
    objToFormData('houseLayout', houseLayout, result);
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
      console.log('houseHolder', houseLayout);
      console.log('houseLayout.id', result)
      props.updateHouse(houseId, result, res => {
        console.log('update', res);
        if (!res.code) {
          setLoading(false);
          showToast('修改成功');
          props.navigation.navigate(AppRoute.HOUSEDETAIL, {
            id: houseId,
          });
        } else {
          setLoading(false);
          showToast(res.message);
        }
      });
    } else {
      console.log('result123', result)
      props.addHouse(result, res => {
        if (!res.code) {
          setLoading(false);
          showToast('房源添加成功');
          props.navigation.goBack();
        } else {
          setLoading(false);
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
    console.log('obj', obj);
    let data;
    if (type === 'houseCert') {
      data = Object.assign([], housePropertyCertificateImage);
      data[key] = obj;
      setHousePropertyCertificateImage(data);
      if (obj) {
        setImage(data[0].uri);
      } else {
        setImage('')
      }
    } else if (type === 'cert') {
      data = Object.assign([], certificateFilesImg);
      data[key] = obj;
      setCertificateFilesImg(data);
      if (obj) {
        setCertificateImage(data[0].uri)
      } else {
        setCertificateImage('')
      }
    } else {
      data = Object.assign([], idCardFile);
      data[key] = obj;
      setIdCardFile(data);
      if (obj) {
        setIdCardImage(data[0].uri)
      } else {
        setIdCardImage('')
      }
    }
  };

  const openSettings = (BUTTONS, cancelIndex, TYPE) => {

    const options = BUTTONS.map((item) => {
      return item.text
    })
    setActionSheetConfig({
      CANCEL_INDEX:cancelIndex,
      TYPE,
      options
    })
    setTimeout(() => {
      ActionSheetRef.current.show()
    })
  };
  const handleSetValue = (index, type) => {
    switch (type) {
      case 'self':
        setHouseHolder({ ...houseHolder, ...{ self: selfList[index].value } });
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
  const changeSwitch = () => {
    setHasElevator(value => !value);
    setData('hasElevator', !hasElevator, 'houseLayout');
  }

  return (
    <Root>
      {loading ? (
        <Spinner style={STYLES.spinner} color="#5C8BFF" />
      ) : (
          <View style={{ flex: 1 }}>
            <HeaderCommon
              options={{
                backTitle: '返回',
                title: houseId && '修改房源' || '添加房源'
              }}
            />
            <ScrollView bounces={false} style={{ flex: 1 }}>
              <View style={styles.container}>
                <Text style={[styles.publishTitle, styles.specialPadding]}>
                  房源资料
              </Text>
                <Form>
                  <Item style={[styles.marginLeft0, styles.flex1]} inlineLabel>
                    <Label
                      style={[
                        styles.labelTitle,
                        styles.defaultSize,
                        // styles.flex1,
                      ]}>
                      所在地区
                    </Label>
                    <View style={styles.flex1}>
                      <TouchableOpacity
                        style={[styles.input_item]}
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
                    </View>
                  </Item>
                  <Item style={styles.marginLeft0} inlineLabel>
                    <Label style={[styles.labelTitle, styles.defaultSize]}>
                      详细地址
                  </Label>
                    <Input
                      value={address}
                      onChangeText={setAddress}
                      allowFontScaling={false}
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
                    <View style={styles.flex1}>
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
                    </View>
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
                      <View style={{ alignItems: 'center', marginRight: 40 }}>
                        <ImageUpload
                          imgUrl={certificateImage}
                          setImageForm={obj => setImageForm(0, obj, 'cert')}
                        />
                        <Text style={{ color: '#c7c7c7' }}>授权文件</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <ImageUpload
                          imgUrl={idCardImage}
                          setImageForm={obj => setImageForm(0, obj, 'idCard')}
                        />
                        <Text style={{ color: '#c7c7c7' }}>房主身份证</Text>
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
                        { flex: 1 },
                      ]}>
                      楼层
                    </Label>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flex: 3
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
                          const newText = e.nativeEvent.text.replace(/[^\d]+/, '');
                          setData(
                            'floorCount',
                            newText,
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
                          const newText = e.nativeEvent.text.replace(/[^\d]+/, '');
                          setData('floor', newText, 'houseLayout');
                        }}
                        style={[styles.defaultSize, styles.textAlignC]}
                      />
                      <Text style={[styles.labelTitle, styles.defaultSize]}>
                        层
                      </Text>
                      <CheckBox
                        containerStyle={styles.checkBoxContainer}
                        titleStyle={styles.checkBoxTitle}
                        title="电梯"
                        checkedColor={Theme.primary}
                        uncheckedColor={Theme.primary}
                        checked={hasElevator}
                        onPress={changeSwitch}
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
                        houseLayout.roomCount || houseLayout.roomCount == 0
                          ? '' + houseLayout.roomCount
                          : houseLayout.roomCount
                      }
                      onChange={e => {
                        const newText = e.nativeEvent.text.replace(/[^\d]+/, '');
                        setData('roomCount', newText, 'houseLayout');
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
                      ref={refMobile}
                      keyboardType="numeric"
                      value={
                        houseLayout.hallCount || houseLayout.hallCount == 0
                          ? '' + houseLayout.hallCount
                          : houseLayout.hallCount
                      }
                      onChange={e => {
                        const newText = e.nativeEvent.text.replace(/[^\d]+/, '');
                        setData('hallCount', newText, 'houseLayout');
                      }}
                      onSubmitEditing={() => refMobile.current.focus()}
                      style={[styles.defaultSize, styles.textAlignR]}
                    />
                    <Text style={[styles.labelTitle, styles.defaultSize]}>
                      厅
                    </Text>
                    <Input
                      keyboardType="numeric"
                      value={
                        houseLayout.toiletCount || houseLayout.toiletCount == 0
                          ? '' + houseLayout.toiletCount
                          : houseLayout.toiletCount
                      }
                      onChange={e => {
                        const newText = e.nativeEvent.text.replace(/[^\d]+/, '');
                        setData('toiletCount', newText, 'houseLayout');
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
                    <View style={styles.flex1}>
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
                    </View>
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

      <ActionSheet
        ref={ActionSheetRef}
        options={ActionSheetConfig.options}
        cancelButtonIndex={ActionSheetConfig.CANCEL_INDEX}
        onPress={(index) => {
          console.log(index, ActionSheetConfig.options[index])
          if (index < ActionSheetConfig.CANCEL_INDEX) { handleSetValue(index, ActionSheetConfig.TYPE) }
        }}
      />
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
    justifyContent: 'flex-end',
  },
  checkBoxContainer: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0
  },
  checkBoxTitle: {
    fontSize: $screen.scaleSize(14),
    color: Theme.textDefault,
  },
});

export default RecordHouse;
