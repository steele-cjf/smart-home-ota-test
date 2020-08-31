/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  Textarea,
  ActionSheet,
} from 'native-base';
import ImageUpload from '../../Component/imageUpload';
import LabelSelect from '../../Component/labelSelect';
import Theme from '../../../style/colors';
import houseFeeList from '../config/houseFee';
import showToast from '../../../util/toast';
import HeaderCommon from '../../Component/HeaderCommon';

export default function PublishHouse(props) {
  const [houseItem, setHouseItem] = useState([]);
  const [houseSpots, setHouseSpots] = useState([]);
  const [rentRequirements, setRentRequirements] = useState([]);
  const [houseTypeList, setHouseTypeList] = useState([]);
  const [houseDecorator, setHouseDecorator] = useState([]);
  const [houseImages, setHouseImages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedTypeValue, setSelectedTypeValue] = useState('');
  const [selectedDecoratorValue, setSelectedDecoratorValue] = useState('');
  // 后台请求参数
  const [publishId, setPublishId] = useState('');
  const [houseId, setHouseId] = useState('');
  const [title, setTitle] = useState('');
  const [houseType, setHouseType] = useState('');
  const [houseRatePlan, setHouseRatePlan] = useState({
    electricityFeeUnitPrice: 0,
    gasFeeUnitPrice: 0,
    heatingFeeUnitPrice: 0,
    managementFeeUnitPrice: 0,
    networkFeeUnitPrice: 0,
    waterFeeUnitPrice: 0,
    rentPrice: 0,
    deposit: 0,
    payment: 0,
  });
  const [houseAddition, setHouseAddition] = useState({});
  const [houseAmenity, setHouseAmenity] = useState({
    decoration: '',
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
        setPublishId(props.route.params.publishId)
        getDetail(props.route.params.publishId);
      }
      setHouseTypeList(handlerOptions(props.codeInfo.house_type));
      setHouseDecorator(handlerOptions(props.codeInfo.house_decorator));
    }
  );

  const getDetail = (id) => {
    props.getPublishHouseDetail(id, res => {
      if (!res.code) {
        const info = res.data;
        setTitle(info.title);
        setHouseRatePlan(info.houseRatePlan);
        setSelectedPros(props.roomList.data, 'rooms', info.roomIds);
        setHouseAddition({description: info.houseAddition.description});
        setSelectedPros(props.codeInfo.house_item, 'houseItem', info.houseAmenity.items);
        setSelectedPros(props.codeInfo.house_spots, 'houseSpots', info.houseAddition.spots);
        setSelectedPros(props.codeInfo.rent_requirements, 'rentReq', info.houseAddition.requirements);
        setHouseImages(info.houseAddition.images || []);

        setSelectedTypeValue(props.dictionaryMappings.house_type[info.houseType])
        setSelectedDecoratorValue(props.dictionaryMappings.house_decorator[info.houseAmenity.decoration])
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
    list.push({text: '取消', value: 'cancel'});
    return list;
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
    const items = getSelectedItem(houseItem);
    const spots = getSelectedItem(houseSpots);
    const requirements = getSelectedItem(rentRequirements);
    const roomIds = getSelectedItem(rooms);

    if (!houseType) {
      setHouseType(houseTypeList[0].value);
    }
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
    console.log('roomIds', roomIds);
    for (let c = 0; c < roomIds.length; c++) {
      result.append('roomIds', roomIds[c]);
    }
    console.log('houseImages', houseImages);
    for (let c = 0; c < houseImages.length; c++) {
      result.append('houseAddition.images', houseImages[c]);
    }
    console.log('ids', roomIds);

    if (props.route.params.publishId) {
      result.append('id', publishId);
      console.log('result1', result);
      props.updatePublishInfo(result, publishId, res => {
        console.log('resEdit', res);
        if (!res.code) {
          // props.route.params.refresh();
          props.navigation.goBack();
        } else {
          showToast(res.message);
        }
      })
    } else {
      result.append('houseId', houseId);
      props.publishHouse(result, res => {
        console.log('resAdd', res);
        if (!res.code) {
          props.navigation.goBack();
        } else {
          showToast(res.message);
        }
      });
    }
    
  }

  const objToFormData = (key, data, result) => {
    for (let d in data) {
      console.log('hahah', data[d]);
      result.append(key + '.' + d, data[d] + '');
      console.log('reddd', result);
    }
  };
  const setImageForm = (key, obj) => {
    let data = Object.assign([], houseImages);
    data[key] = obj;
    setHouseImages(data);
  };
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
    <View>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '发布房源',
        }}
      />
    <ScrollView>
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
              style={[styles.labelTitle, styles.defaultSize, styles.flex1]}>
              房间类型
            </Label>
            <TouchableOpacity
              style={styles.input_item}
              onPress={() => openSettings(houseTypeList, 2, 'houseType')}>
              <Text
                style={[{fontSize: 14, paddingRight: 10}, styles.textAlignR]}>
                {selectedTypeValue}
              </Text>
              <AntDesign
                name="right"
                style={{
                  fontSize: 12,
                  color: Theme.textSecondary,
                }}
              />
            </TouchableOpacity>
          </Item>
          {houseType === 'co_rent' ? (
            rooms.length ? (
              <LabelSelect
                labelList={rooms}
                checkItem={(item, i) => changeRooms(item, i)}
              />
            ) : (
              <Text style={{color: 'red', fontSize: 14}}>
                当前类型不可选, 请先添加房间
              </Text>
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
              style={[styles.labelTitle, styles.defaultSize, styles.flex1]}>
              装修
            </Label>
            <TouchableOpacity
              style={styles.input_item}
              onPress={() => openSettings(houseDecorator, 4, 'decorator')}>
              <Text
                style={[{fontSize: 14, paddingRight: 10}, styles.textAlignR]}>
                {selectedDecoratorValue}
              </Text>
              <AntDesign
                name="right"
                style={{
                  fontSize: 12,
                  color: Theme.textSecondary,
                }}
              />
            </TouchableOpacity>
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
              onChange={e => {
                setData('rentPrice', e.nativeEvent.text, 'houseRatePlan');
              }}
              style={[styles.defaultSize, styles.textAlignR]}
            />
            <Text style={[styles.labelTitle, styles.defaultSize]}>元 / 月</Text>
          </Item>
          <Item style={styles.marginLeft0} inlineLabel>
            <Label style={[styles.labelTitle, styles.defaultSize, {flex: 3}]}>押金</Label>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 2}}>
              <Text style={[styles.labelTitle, styles.defaultSize]}>押</Text>
              <Input
                value={checkInputValue(houseRatePlan.deposit)}
                onChange={e => {
                  setData('deposit', e.nativeEvent.text, 'houseRatePlan');
                }}
                style={[styles.defaultSize, styles.textAlignC]}
              />
              <Text style={[styles.labelTitle, styles.defaultSize]}>月</Text>
              <Text style={{color: '#E9E9E9'}}> | </Text>
              <Text style={[styles.labelTitle, styles.defaultSize]}>付</Text>
              <Input
                value={checkInputValue(houseRatePlan.payment)}
                onChange={e => {
                  setData('payment', e.nativeEvent.text, 'houseRatePlan');
                }}
                style={[styles.defaultSize, styles.textAlignC]}
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
            justifyContent: 'space-around',
            paddingTop: 16,
          }}>
          <ImageUpload setImageForm={obj => setImageForm(0, obj)} />
          <ImageUpload setImageForm={obj => setImageForm(1, obj)} />
          <ImageUpload setImageForm={obj => setImageForm(2, obj)} />
        </View>
        <Button
          full
          onPress={handlerPublish}
          style={{borderRadius: 40, marginVertical: 36}}>
          <Text>提交审核</Text>
        </Button>
      </View>
    </ScrollView>
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
  },
});
