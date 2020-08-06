/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
  Textarea,
} from 'native-base';
import ImageUpload from '../../Component/imageUpload';
import LabelSelect from '../../Component/labelSelect';
import storage from '../../../util/storage';
import Theme from '../../../style/colors';
import houseFeeList from '../config/houseFee';

export default function PublishHouse(props) {
  const [houseItem, setHouseItem] = useState([]);
  const [houseSpots, setHouseSpots] = useState([]);
  const [rentRequirements, setRentRequirements] = useState([]);
  const [houseTypeList, setHouseTypeList] = useState([]);
  const [houseDecorator, setHouseDecorator] = useState([]);
  const [houseImages, setHouseImages] = useState([]);
  const [rooms, setRooms] = useState([
    {id: 1, name: '主卧'},
    {id: 2, name: '南卧'},
    {id: 3, name: '次卧'},
  ]);
  // 后台请求参数
  const [houseId] = useState('483710797791371264');
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
    storage.get('code').then(res => {
      setSelectedPros(res.house_item, 'houseItem');
      setSelectedPros(res.house_spots, 'houseSpots');
      setSelectedPros(res.rent_requirements, 'rentReq');
      setHouseTypeList(res.house_type);
      setHouseDecorator(res.house_decorator);
    });
  }, []);

  function setSelectedPros(list, type) {
    list.map(item => {
      item.selected = false;
    });
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
    }
  }

  function changeHouseItem(item, i) {
    const newList = Object.assign([], houseItem);
    newList[i].selected = !item.selected;
    setHouseItem(newList);
  }
  function changeHouseSpots(item, i) {
    const newList = Object.assign([], houseSpots);
    newList[i].selected = !item.selected;
    setHouseSpots(newList);
  }
  function changeRentReq(item, i) {
    const newList = Object.assign([], rentRequirements);
    newList[i].selected = !item.selected;
    setRentRequirements(newList);
  }
  function changeRooms(item, i) {
    const newList = Object.assign([], rooms);
    newList[i].selected = !item.selected;
    setRooms(newList);
  }

  function getSelectedItem(list) {
    return list
      .filter(item => item.selected === true)
      .map((value, index) => {
        return value.code;
      });
  }

  function handlerPublish() {
    const items = getSelectedItem(houseItem);
    const spots = getSelectedItem(houseSpots);
    const requirements = getSelectedItem(rentRequirements);
    if (!houseType) {
      setHouseType(houseTypeList[0].value);
    }
    let result = new FormData();

    objToFormData('houseRatePlan', houseRatePlan, result);

    objToFormData('houseAddition', houseAddition, result);
    // 出租要求,亮点
    result.append('title', title);
    result.append('houseId', houseId);
    result.append('houseType', houseType);

    for (let c = 0; c < requirements.length; c++) {
      result.append('houseAddition.requirements', requirements[c]);
    }
    for (let c = 0; c < spots.length; c++) {
      result.append('houseAddition.spots', spots[c]);
    }
    for (let c = 0; c < items.length; c++) {
      result.append('houseAmenity.items', items[c]);
    }

    for (let c = 0; c < houseImages.length; c++) {
      result.append('houseAddition.images', houseImages[c]);
    }

    console.log('result', result);
    props.publishHouse(result, res => {
      console.log('res', res);
    });
  }

  const objToFormData = (key, data, result) => {
    for (let d in data) {
      result.append(key + '.' + d, data[d]);
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

  return (
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
          <Item picker style={{marginBottom: 15}}>
            <Label
              style={[styles.labelTitle, styles.defaultSize, styles.flex1]}>
              房间类型
            </Label>
            <Picker
              mode="dropdown"
              selectedValue={houseType}
              onValueChange={value => setHouseType(value)}
              iosIcon={
                <AntDesign
                  name="right"
                  style={{fontSize: 12, color: Theme.textSecondary}}
                />
              }>
              {houseTypeList.map((item, index) => {
                return <Picker.Item label={item.value} value={item.code} />;
              })}
            </Picker>
          </Item>
          {houseType === 'co_rent' ? (
            <LabelSelect
              labelList={rooms}
              checkItem={(item, i) => changeRooms(item, i)}
            />
          ) : (
            <Text />
          )}
        </Form>
        {/* 室内设施 */}
        <Text style={styles.publishTitle}>室内设施</Text>
        <Form>
          <Item picker>
            <Label
              style={[styles.labelTitle, styles.defaultSize, styles.flex1]}>
              装修
            </Label>
            <Picker
              mode="dropdown"
              selectedValue={houseAmenity.decoration}
              onValueChange={value => setHouseAmenity({decoration: value})}
              iosIcon={
                <AntDesign
                  name="right"
                  style={{fontSize: 12, color: Theme.textSecondary}}
                />
              }>
              {houseDecorator.map((item, index) => {
                return <Picker.Item label={item.value} value={item.code} />;
              })}
            </Picker>
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
              value={houseRatePlan.rentPrice}
              onChange={e => {
                setData('rentPrice', e.nativeEvent.text, 'houseRatePlan');
              }}
              style={[styles.defaultSize, styles.textAlignR]}
            />
            <Text style={[styles.labelTitle, styles.defaultSize]}>元 / 月</Text>
            <Text style={{width: 80}} />
            <Text style={[styles.labelTitle, styles.defaultSize]}>押</Text>
            <Input
              value={houseRatePlan.deposit}
              onChange={e => {
                setData('deposit', e.nativeEvent.text, 'houseRatePlan');
              }}
              style={[styles.defaultSize, styles.textAlignC]}
            />
            <Text style={[styles.labelTitle, styles.defaultSize]}>付</Text>
            <Input
              value={houseRatePlan.payment}
              onChange={e => {
                setData('payment', e.nativeEvent.text, 'houseRatePlan');
              }}
              style={[styles.defaultSize, styles.textAlignC]}
            />
          </Item>
          {houseFeeList.map((item, index) => {
            return (
              <Item style={styles.marginLeft0} inlineLabel>
                <Label style={[styles.labelTitle, styles.defaultSize]}>
                  {item.name}
                </Label>
                <Input
                  value={houseRatePlan[item.key]}
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
});
