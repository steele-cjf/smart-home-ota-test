/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  Textarea,
  Spinner
} from 'native-base';
import ImageUpload from '../../Component/imageUpload';
import LabelSelect from '../../Component/labelSelect';
import Theme from '../../../style/colors';
import houseFeeList from '../config/houseFee';
import showToast from '../../../util/toast';
import HeaderCommon from '../../Component/HeaderCommon';
import ActionSheet from 'react-native-custom-actionsheet'

export default function PublishHouse(props) {
  const [loading, setLoading] = useState();
  const [houseItem, setHouseItem] = useState([]);
  const [houseSpots, setHouseSpots] = useState([]);
  const [rentRequirements, setRentRequirements] = useState([]);
  const [houseTypeList, setHouseTypeList] = useState([]);
  const [houseDecorator, setHouseDecorator] = useState([]);
  const [houseImages, setHouseImages] = useState([{uri: ''}]);
  const [rooms, setRooms] = useState([]);
  const [selectedTypeValue, setSelectedTypeValue] = useState('合租');
  const [selectedDecoratorValue, setSelectedDecoratorValue] = useState('简单装修');
  const ActionSheetRef = useRef(null);
  const [ActionSheetConfig, setActionSheetConfig] = useState({
    options: ['cancel'],
    TYPE: '',
    CANCEL_INDEX: 0
  })
  // 后台请求参数
  const [publishId, setPublishId] = useState('');
  const [houseId, setHouseId] = useState('');
  const [title, setTitle] = useState('');
  const [houseType, setHouseType] = useState('co_rent');
  const [houseRatePlan, setHouseRatePlan] = useState({
    electricityFeeUnitPrice: 0,
    gasFeeUnitPrice: 0,
    heatingFeeUnitPrice: 0,
    managementFeeUnitPrice: 0,
    networkFeeUnitPrice: 0,
    waterFeeUnitPrice: 0,
    rentPrice: 0,
    deposit: null,
    payment: 0,
  });
  const [houseAddition, setHouseAddition] = useState({});
  const [houseAmenity, setHouseAmenity] = useState({
    decoration: 'simple',
    items: [],
  });

  useEffect(() => {
    init()
  }, []);

  const init = useCallback(
    () => {
      if (props.route.params.id) {
        setHouseId(props.route.params.id);
        setSelectedPros(props.codeInfo.house_item, 'houseItem');
        setSelectedPros(props.codeInfo.house_spots, 'houseSpots');
        setSelectedPros(props.codeInfo.rent_requirements, 'rentReq');
        setRooms(props.roomList.data, 'rooms');
      } else if (props.route.params.publishId) {
        console.log('edit');
        console.log('hahha', props.roomList.data)
        setPublishId(props.route.params.publishId)
        getDetail(props.route.params.publishId);
      }
      setHouseTypeList(handlerOptions(props.codeInfo.house_type));
      setHouseDecorator(handlerOptions(props.codeInfo.house_decorator));
    }
  );

  const getDetail = (id) => {
    setLoading(true);
    props.getPublishHouseDetail(id, res => {
      if (!res.code) {
        console.log('publishDetail', res.data);
        const info = res.data;
        setTitle(info.title);
        setHouseRatePlan(info.houseRatePlan);
        setSelectedPros(props.roomList.data, 'rooms', info.roomIds);
        if (info.houseAddition.description) {
          setHouseAddition({description: info.houseAddition.description});
        }
        setSelectedPros(props.codeInfo.house_item, 'houseItem', info.houseAmenity.items);
        setSelectedPros(props.codeInfo.house_spots, 'houseSpots', info.houseAddition.spots);
        setSelectedPros(props.codeInfo.rent_requirements, 'rentReq', info.houseAddition.requirements);
        // setHouseImages(info.houseAddition.images || []);
        const imgArr = info.houseAddition.images
        let setArr = imgArr.map(item => {
          return {uri: item}
        })
        let arr = setArr.concat([{uri: ''}]);
        setHouseImages(arr);
        console.log('img', houseImages);
        setHouseType(info.houseType);
        setSelectedTypeValue(props.dictionaryMappings.house_type[info.houseType]);
        setSelectedDecoratorValue(props.dictionaryMappings.house_decorator[info.houseAmenity.decoration]);
        setLoading(false);
      } else {
        showToast(res.message);
      }
    })
  }

  const setSelectedPros = (list, type, selectList) => {
    list.map(item => {
      item.selected = false;
    });
    if (selectList) {
      list.map(item => {
        selectList.map(set => {
          if (item.code === set || item.id === set) {
            item.selected = true
          }
        })
      })
    }
    switch (type) {
      case 'houseItem':
        setHouseItem(list);
        break;
      case 'houseSpots':
        setHouseSpots(list);
        break;
      case 'rentReq':
        setRentRequirements(list);
        break;
      case 'rooms':
        setRooms(list);
        break;
    }
  }
  // actionSheet下拉选项
  const handlerOptions = list => {
    list = list.map(item => {
      return {
        text: item.value,
        value: item.code,
      };
    });
    list.push({text: '取消', value: '取消'});
    return list;
  };
  const openSettings = (BUTTONS, CANCEL_INDEX, TYPE) => {
    const options = BUTTONS.map((item) => {
      return item.text
    })
    setActionSheetConfig({
      CANCEL_INDEX: CANCEL_INDEX,
      TYPE,
      options
    })
    setTimeout(() => {
      ActionSheetRef.current.show()
    })
    // ActionSheet.show(
    //   {
    //     options: BUTTONS,
    //     cancelButtonIndex: CANCEL_INDEX,
    //     // destructiveButtonIndex: this.DESTRUCTIVE_INDEX,
    //     // title: i18n.t("settings")
    //   },
    //   buttonIndex => {
    //     if (buttonIndex === CANCEL_INDEX) {
    //       return;
    //     }
    //     handleSetValue(buttonIndex, TYPE);
    //     console.log('Logout was clicked ' + BUTTONS[buttonIndex]);
    //   },
    // );
  };
  const handleSetValue = (index, type) => {
    switch (type) {
      case 'houseType':
        setHouseType(houseTypeList[index].value);
        setSelectedTypeValue(houseTypeList[index].text);
        break;
      case 'decorator':
        setHouseAmenity({decoration: houseDecorator[index].value});
        setSelectedDecoratorValue(houseDecorator[index].text);
        break;
    }
  };
  // 点击label
  const changeHouseItem = (item, i) => {
    const newList = Object.assign([], houseItem);
    newList[i].selected = !item.selected;
    setHouseItem(newList);
  }
  const changeHouseSpots = (item, i) => {
    const newList = Object.assign([], houseSpots);
    newList[i].selected = !item.selected;
    setHouseSpots(newList);
  }
  const changeRentReq = (item, i) => {
    const newList = Object.assign([], rentRequirements);
    newList[i].selected = !item.selected;
    setRentRequirements(newList);
  }
  const changeRooms = (item, i) => {
    const newList = Object.assign([], rooms);
    newList[i].selected = !item.selected;
    setRooms(newList);
  }
  // 获取选中的label options
  const getSelectedItem = (list) => {
    return list
      .filter(item => item.selected === true)
      .map((value, index) => {
        return value.code || value.id;
      });
  }
  // 提交发布
  const handlerPublish = () => {
    let titleReg = /^.{1,50}$/;
    console.log('titleReg.test(title)', titleReg.test(title))
    if (!title) {
      showToast('请输入标题')
      return
    } else if (!titleReg.test(title)) {
      showToast('请输入50个字符以内的标题')
      return
    }

    if (!houseRatePlan.rentPrice) {
      showToast('请填写房租')
      return
    }
    if (!houseRatePlan.deposit && houseRatePlan.deposit !== 0) {
      showToast('请填写押金月数')
      return
    }
    if (!houseRatePlan.payment) {
      showToast('请填写付款月数')
      return
    }
    if (!houseImages[0].uri) {
      showToast('请至少添加1张图片')
      return
    }
    setLoading(true);
    const items = getSelectedItem(houseItem);
    const spots = getSelectedItem(houseSpots);
    const requirements = getSelectedItem(rentRequirements);
    const roomIds = getSelectedItem(rooms);

    let result = new FormData();

    objToFormData('houseRatePlan', houseRatePlan, result);

    objToFormData('houseAddition', houseAddition, result);
    // 出租要求,亮点
    result.append('title', title);
    result.append('houseType', houseType);
    result.append('houseAmenity.decoration', houseAmenity.decoration);

    for (let c = 0; c < requirements.length; c++) {
      result.append('houseAddition.requirements', requirements[c]);
    }
    for (let c = 0; c < spots.length; c++) {
      result.append('houseAddition.spots', spots[c]);
    }
    for (let c = 0; c < items.length; c++) {
      result.append('houseAmenity.items', items[c]);
    }
    for (let c = 0; c < roomIds.length; c++) {
      result.append('roomIds', roomIds[c]);
    }

    let resultImg = Object.assign([], houseImages);
    resultImg = resultImg.map(item => {
      return {
        uri: item.uri,
        name: 'upload.jpg',
        type: 'image/jpeg'
      }
    })
    for (let c = 0; c < resultImg.length; c++) {
      if (resultImg[resultImg.length - 1].uri === '') {
        resultImg.splice(resultImg.length-1, 1);
      }
      result.append('houseAddition.images', resultImg[c]);
    }

    console.log('resultImg', result);
    if (props.route.params.publishId) {
      result.append('id', publishId);
      props.updatePublishInfo(result, publishId, res => {
        console.log('resEdit', res);
        if (!res.code) {
          setLoading(false);
          showToast('修改成功');
          props.navigation.goBack();
        } else {
          setLoading(false);
          showToast(res.message);
        }
      })
    } else {
      result.append('houseId', houseId);
      props.publishHouse(result, res => {
        console.log('resAdd', res);
        if (!res.code) {
          setLoading(false);
          showToast('房源发布成功');
          props.navigation.goBack();
        } else {
          setLoading(false);
          showToast(res.message);
        }
      });
    }
  }

  const objToFormData = (key, data, result) => {
    for (let d in data) {
      result.append(key + '.' + d, data[d] + '');
      console.log('reddd', result);
    }
  };
  const setImageForm = (key, obj) => {
    console.log('test', obj);
    let data = []
    if (houseImages.length === key + 1 && houseImages.length < 9) {
      houseImages.push({uri: ''})
      data = Object.assign([], houseImages);
    } else {
      data = Object.assign([], houseImages);
    }
    data[key] = obj;
    setHouseImages(data);
  };
  const deleteImage = (index) => {
    let data = Object.assign([], houseImages);
    data.splice(index, 1);
    setHouseImages(data);
  }
  // 表单变化触发
  const setData = (key, value, type) => {
    if (type === 'houseRatePlan') {
      let data = Object.assign({}, houseRatePlan);
      data[key] = value;
      setHouseRatePlan(data);
    } else if (type === 'houseAddition') {
      let data = Object.assign({}, houseAddition);
      data[key] = value;
      setHouseAddition(data);
    }
  };
  const checkInputValue = (value) => {
    return value ? '' + value : value                  
  }
  return (
    <View style={{flex: 1}}>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '发布房源',
        }}
      />
      {loading ? (
        <Spinner  style={STYLES.spinner} color="#5C8BFF"/>
      ) : (
      <ScrollView bounces={false}>
        <View style={styles.container}>
          {/* 发布房间 */}
          <Text style={[styles.publishTitle, styles.specialPadding]}>
            发布房间
          </Text>
          <Form>
            <Item style={styles.marginLeft0} inlineLabel>
              <Label style={[styles.labelTitle, styles.defaultSize]}>
                发布标题
              </Label>
              <Input
                value={title}
                onChangeText={setTitle}
                placeholder="请输入房源标题"
                placeholderTextColor={Theme.textMuted}
                style={[styles.defaultSize, styles.textAlignR]}
              />
            </Item>
            <Item style={[styles.marginLeft0, {marginBottom: 15}]} inlineLabel>
              <Label
                style={[styles.labelTitle, styles.defaultSize]}>
                房间类型
              </Label>
              <View style={styles.flex1}>
                <TouchableOpacity
                  style={styles.input_item}
                  onPress={() => openSettings(houseTypeList, 2, 'houseType')}>
                  <Text
                    style={[{fontSize: $screen.scaleSize(14), paddingRight: 10}, styles.textAlignR]}>
                    {selectedTypeValue}
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
            {houseType === 'co_rent' ? (
              rooms.length ? (
                <LabelSelect
                  labelList={rooms}
                  checkItem={(item, i) => changeRooms(item, i)}
                />
              ) : (
                <View style={[styles.topViewFail]}>
                  <Text style={styles.topTextStyle1}>对不起，您尚未添加合租房间</Text>
                  <Text style={styles.topTextStyle2}>请设置完毕合租房间后，再添加合租住户</Text>
                </View> 
              )
            ) : (
              <Text />
            )}
          </Form>
          {/* 室内设施 */}
          <Text style={styles.publishTitle}>室内设施</Text>
          <Form>
            <Item style={styles.marginLeft0} inlineLabel>
              <Label
                style={[styles.labelTitle, styles.defaultSize]}>
                装修
              </Label>
              <View style={styles.flex1}>
                <TouchableOpacity
                  style={styles.input_item}
                  onPress={() => openSettings(houseDecorator, 4, 'decorator')}>
                  <Text
                    style={[{fontSize: $screen.scaleSize(14), paddingRight: 10}, styles.textAlignR]}>
                    {selectedDecoratorValue}
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
            <View style={styles.label_content}>
              <LabelSelect
                labelList={houseItem}
                checkItem={(item, i) => changeHouseItem(item, i)}
              />
            </View>
          </Form>
          {/* 房屋亮点 */}
          <Text style={styles.publishTitle}>房屋亮点</Text>
          <View>
            <LabelSelect
              labelList={houseSpots}
              checkItem={(item, i) => changeHouseSpots(item, i)}
            />
          </View>
          {/* 出租要求 */}
          <Text style={styles.publishTitle}>出租要求</Text>
          <View>
            <LabelSelect
              labelList={rentRequirements}
              checkItem={(item, i) => changeRentReq(item, i)}
            />
          </View>
          {/* 相关费用 */}
          <Text style={styles.publishTitle}>相关费用</Text>
          <Form>
            <Item style={styles.marginLeft0} inlineLabel>
              <Label style={[styles.labelTitle, styles.defaultSize]}>房租</Label>
              <Input
                value={checkInputValue(houseRatePlan.rentPrice)}
                keyboardType="numeric"
                onChange={e => {
                  setData('rentPrice', e.nativeEvent.text, 'houseRatePlan');
                }}
                style={[styles.defaultSize, styles.textAlignR]}
                placeholder={'请输入'}
                placeholderTextColor={Theme.textMuted}
              />
              <Text style={[styles.labelTitle, styles.defaultSize]}>元 / 月</Text>
            </Item>
            <Item style={styles.marginLeft0} inlineLabel>
              <Label style={[styles.labelTitle, styles.defaultSize, {flex: 3}]}>押金</Label>
              <View style={{flexDirection: 'row', alignItems: 'center', flex: 4}}>
                <Text style={[styles.labelTitle, styles.defaultSize]}>押</Text>
                <Input
                  keyboardType="numeric"
                  value={checkInputValue(houseRatePlan.deposit)}
                  onChange={e => {
                    setData('deposit', e.nativeEvent.text, 'houseRatePlan');
                  }}
                  style={[styles.defaultSize, styles.textAlignC]}
                  placeholder={'请输入'}
                  placeholderTextColor={Theme.textMuted}
                />
                <Text style={[styles.labelTitle, styles.defaultSize]}>月</Text>
                <Text style={{color: '#E9E9E9'}}> | </Text>
                <Text style={[styles.labelTitle, styles.defaultSize]}>付</Text>
                <Input
                  keyboardType="numeric"
                  value={checkInputValue(houseRatePlan.payment)}
                  onChange={e => {
                    setData('payment', e.nativeEvent.text, 'houseRatePlan');
                  }}
                  style={[styles.defaultSize, styles.textAlignC]}
                  placeholder={'请输入'}
                  placeholderTextColor={Theme.textMuted}
                />
                <Text style={[styles.labelTitle, styles.defaultSize]}>月</Text>
              </View>
            </Item>
            {houseFeeList.map((item, index) => {
              return (
                <Item style={styles.marginLeft0} inlineLabel>
                  <Label style={[styles.labelTitle, styles.defaultSize]}>
                    {item.name}
                  </Label>
                  <Input
                    value={checkInputValue(houseRatePlan[item.key])}
                    onChange={e => {
                      setData(item.key, e.nativeEvent.text, 'houseRatePlan');
                    }}
                    style={[styles.defaultSize, styles.textAlignR]}
                    placeholder={'非必填'}
                    placeholderTextColor={Theme.textMuted}
                  />
                  <Text style={[styles.labelTitle, styles.defaultSize]}>
                    {item.desc}
                  </Text>
                </Item>
              );
            })}
          </Form>
          {/* 房屋描述 */}
          <Text style={styles.publishTitle}>房屋描述</Text>
          <Form>
            <Textarea
              value={houseAddition.description}
              onChange={e => {
                setData('description', e.nativeEvent.text, 'houseAddition');
              }}
              style={{backgroundColor: Theme.cardBackground}}
              rowSpan={5}
              placeholder="补充介绍房屋及其周边交通、生活环境"
            />
          </Form>
          {/* 上传图片 */}
          <Text style={styles.ImgTitle}>上传图片</Text>
          <Text style={styles.imgDec}>最多9张，可上传户型图、室内室外图片</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingTop: 16,
            }}>
            {
              houseImages.map((item, index) => {
                return (
                  <View style={{width: Dimensions.get('window').width  * 0.3}}>
                  <ImageUpload imgUrl={item && item.uri || ''} handlerDelete={() => deleteImage(index)} setImageForm={obj => setImageForm(index, obj)} /></View>
                )
              })
            }
          </View>
          <Button
            full
            onPress={handlerPublish}
            style={{borderRadius: 40, marginVertical: 36}}>
            <Text>提交发布</Text>
          </Button>
        </View>
      </ScrollView>
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
    paddingBottom: 14,
    paddingTop: 22,
  },
  specialPadding: {
    paddingTop: 16,
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
    backgroundColor: Theme.background,
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
  topViewFail: {
    height: 70, 
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#FFECEC',
  },
  topTextStyle1: {
    fontSize: $screen.scaleSize(16),
    color: Theme.textDefault,
  },
  topTextStyle2: {
    fontSize: $screen.scaleSize(14),
    color: Theme.textSecondary,
    marginTop: 10,
  },
});
