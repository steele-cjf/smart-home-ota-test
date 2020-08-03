/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
// import {Button, Text, Input} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  Picker,
  Icon,
} from 'native-base';
import RadioForm from 'react-native-simple-radio-button';
import ImageUpload from '../../Component/imageUpload';
// import {AppRoute} from '../../../navigator/AppRoutes';
import {TextInput} from 'react-native-gesture-handler';
import LabelSelect from '../../Component/labelSelect';
import storage from '../../../util/storage';
import Theme from '../../../style/colors';

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
  const [modalVisible, setModalVisible] = useState(false);
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
      setHouseDecorator(setRadioProps(res.house_decorator));
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
  function setRadioProps(list) {
    return list.map(item => {
      return {
        label: item.value,
        value: item.code,
      };
    });
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
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.publishTitle}>发布房间</Text>
        <Form>
          <Item style={styles.marginLeft0} inlineLabel>
            <Label style={[styles.labelTitle, styles.defaultSize]}>
              发布标题
            </Label>
            <Input
              placeholder="请输入房源标题"
              placeholderTextColor={Theme.textMuted}
              style={[styles.defaultSize, styles.textAlignR]}
            />
          </Item>
          <Item picker>
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
        </Form>
        <Input
          value={title}
          onChangeText={setTitle}
          inputStyle={styles.input_content}
          leftIcon={<Text style={styles.label}>发布标题</Text>}
        />
        <Text style={styles.title}>发布房间</Text>
        <RadioForm
          formHorizontal={true}
          radio_props={houseTypeList}
          onPress={value => {
            setHouseType(value);
          }}
        />
        {houseType === 'co_rent' ? (
          <LabelSelect
            labelList={rooms}
            checkItem={(item, i) => changeRooms(item, i)}
          />
        ) : (
          <Text />
        )}
        <Text style={styles.title}>室内设施</Text>
        <View style={styles.common_content}>
          <Text
            style={styles.label}
            onPress={() => setModalVisible(!modalVisible)}>
            装修类型
          </Text>
          <RadioForm
            formHorizontal={true}
            radio_props={houseDecorator}
            onPress={value => {
              setHouseAmenity({decoration: value});
            }}
          />
          <View style={styles.line} />
          <View style={styles.house_content}>
            <LabelSelect
              labelList={houseItem}
              checkItem={(item, i) => changeHouseItem(item, i)}
            />
          </View>
        </View>
        <Text style={styles.title}>房屋亮点</Text>
        <View style={[styles.house_content, styles.common_content]}>
          <LabelSelect
            labelList={houseSpots}
            checkItem={(item, i) => changeHouseSpots(item, i)}
          />
        </View>
        <Text style={styles.title}>出租要求</Text>
        <View style={[styles.house_content, styles.common_content]}>
          <LabelSelect
            labelList={rentRequirements}
            checkItem={(item, i) => changeRentReq(item, i)}
          />
        </View>
        <Text style={styles.title}>相关费用</Text>
        <View style={styles.house_content}>
          <View>
            <Input
              value={houseRatePlan.rentPrice}
              onChange={e => {
                setData('rentPrice', e.nativeEvent.text, 'houseRatePlan');
              }}
              inputStyle={styles.input_content}
              leftIcon={<Text style={styles.label}>房租</Text>}
              rightIcon={<Text style={styles.label}>元每月</Text>}
            />
            <Input
              value={houseRatePlan.deposit}
              onChange={e => {
                setData('deposit', e.nativeEvent.text, 'houseRatePlan');
              }}
              inputStyle={styles.input_content}
              leftIcon={<Text style={styles.label}>押</Text>}
            />
            <Input
              value={houseRatePlan.payment}
              onChange={e => {
                setData('payment', e.nativeEvent.text, 'houseRatePlan');
              }}
              inputStyle={styles.input_content}
              leftIcon={<Text style={styles.label}>付</Text>}
            />
          </View>
          <Input
            value={houseRatePlan.waterFeeUnitPrice}
            onChange={e => {
              setData('waterFeeUnitPrice', e.nativeEvent.text, 'houseRatePlan');
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>水费</Text>}
            rightIcon={<Text style={styles.label}>元每吨</Text>}
          />
          <Input
            value={houseRatePlan.electricityFeeUnitPrice}
            onChange={e => {
              setData(
                'electricityFeeUnitPrice',
                e.nativeEvent.text,
                'houseRatePlan',
              );
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>电费</Text>}
            rightIcon={<Text style={styles.label}>元每度</Text>}
          />
          <Input
            value={houseRatePlan.networkFeeUnitPrice}
            onChange={e => {
              setData(
                'networkFeeUnitPrice',
                e.nativeEvent.text,
                'houseRatePlan',
              );
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>宽带</Text>}
            rightIcon={<Text style={styles.label}>元每月</Text>}
          />
          <Input
            value={houseRatePlan.managementFeeUnitPrice}
            onChange={e => {
              setData(
                'managementFeeUnitPrice',
                e.nativeEvent.text,
                'houseRatePlan',
              );
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>物业</Text>}
            rightIcon={<Text style={styles.label}>元每月</Text>}
          />
          <Input
            value={houseRatePlan.gasFeeUnitPrice}
            onChange={e => {
              setData('gasFeeUnitPrice', e.nativeEvent.text, 'houseRatePlan');
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>天然水</Text>}
            rightIcon={<Text style={styles.label}>元每立方</Text>}
          />
          <Input
            value={houseRatePlan.heatingFeeUnitPrice}
            onChange={e => {
              setData(
                'heatingFeeUnitPrice',
                e.nativeEvent.text,
                'houseRatePlan',
              );
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>暖气</Text>}
            rightIcon={<Text style={styles.label}>元每平方</Text>}
          />
        </View>
        <Text style={styles.title}>房屋描述</Text>
        <View style={[styles.common_content]}>
          <TextInput
            value={houseAddition.description}
            onChange={e => {
              setData('description', e.nativeEvent.text, 'houseAddition');
            }}
            multiline={true}
            style={{margin: 10, height: 100}}
          />
        </View>
        <Text style={styles.title}>上传图片（最多9张）</Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          <ImageUpload setImageForm={obj => setImageForm(0, obj)} />
          <ImageUpload setImageForm={obj => setImageForm(1, obj)} />
          <ImageUpload setImageForm={obj => setImageForm(2, obj)} />
        </View>
        <Button
          title="发布"
          style={{marginBottom: 40}}
          onPress={handlerPublish}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textAlignR: {
    textAlign: 'right',
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
  labelTitle: {
    color: Theme.textDefault,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.background,
    paddingLeft: 15,
    paddingRight: 15,
  },
  flex_box: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    paddingLeft: 15,
    paddingTop: 15,
  },
  label_style: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 3,
  },
  selected_bgColor: {
    backgroundColor: 'green',
  },
  selected_color: {
    color: '#fff',
  },
  title: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  common_content: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e2e3',
  },
  house_content: {
    // marginHorizontal: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  line: {
    height: 1,
    opacity: 1,
    backgroundColor: 'darkgray',
  },
  input_content: {
    margin: 0,
    padding: 0,
  },
});
