/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Picker,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Input} from 'react-native-elements';
import ImageUpload from '../../Component/imageUpload';
import {AppRoute} from '../../../navigator/AppRoutes';
import {TextInput} from 'react-native-gesture-handler';
import LabelSelect from '../../Component/labelSelect';
import storage from '../../../util/storage';
import Tags from '../../Component/tagsInput/index';

export default function PublishHouse(props) {
  const [houseItem, setHouseItem] = useState([]);
  const [houseSpots, setHouseSpots] = useState([]);
  const [rentRequirements, setRentRequirements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: [],
  });
  // 后台请求参数
  const [houseRatePlan, setHouseRatePlan] = useState({
    electricityFeeUnitPrice: 0,
    gasFeeUnitPrice: 0,
    heatingFeeUnitPrice: 0,
    managementFeeUnitPrice: 0,
    networkFeeUnitPrice: 0,
    waterFeeUnitPrice: 0,
  });
  const [houseAddition, setHouseAddition] = useState({
    description: '',
    images: [],
    requirements: [],
    spots: [],
  });
  const [houseAmenity, setHouseAmenity] = useState({
    decoration: '',
    items: [],
  });
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    storage.get('code').then(res => {
      setSelectedPros(res.house_item, 'houseItem');
      setSelectedPros(res.house_spots, 'houseSpots');
      setSelectedPros(res.rent_requirements, 'rentReq');
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

  function getSelectedItem(list) {
    return list
      .filter(item => item.selected === true)
      .map((value, index) => {
        return value.code;
      });
  }

  function addRoom() {
    console.log(123);
    console.log(roomName);
    if (!roomName) {
      return;
    }
    let arr = [...rooms];
    arr.push(roomName);
    console.log(arr);
    setRooms(arr);
    setRoomName('');
  }

  function handlerPublish() {
    const items = getSelectedItem(houseItem);
    const spots = getSelectedItem(houseSpots);
    const reqs = getSelectedItem(rentRequirements);

    // props.publishHouse('483710797791371264', data, res => {
    //   console.log('res', res);
    // });
  }

  // 表单变化触发
  const setData = (key, value) => {
    let data = Object.assign({}, houseRatePlan);
    let dataKey = Object.assign({}, houseAddition);
    data[key] = value;
    dataKey[key] = value;
    setHouseRatePlan(data);
    setHouseAddition(dataKey);
  };
  // const updateTagState = state => {
  //   setTags({state});
  // };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>室内设施</Text>
        <View style={styles.common_content}>
          <Text
            style={styles.label}
            onPress={() => setModalVisible(!modalVisible)}>
            装修类型
          </Text>
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
          <Input
            value={houseRatePlan.waterFeeUnitPrice}
            onChange={e => {
              setData('houseRatePlan', e.nativeEvent.text);
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>水费</Text>}
            rightIcon={<Text style={styles.label}>元每吨</Text>}
          />
          <Input
            value={houseRatePlan.electricityFeeUnitPrice}
            onChange={e => {
              setData('houseRatePlan', e.nativeEvent.text);
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>电费</Text>}
            rightIcon={<Text style={styles.label}>元每度</Text>}
          />
          <Input
            value={houseRatePlan.networkFeeUnitPrice}
            onChange={e => {
              setData('houseRatePlan', e.nativeEvent.text);
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>宽带</Text>}
            rightIcon={<Text style={styles.label}>元每月</Text>}
          />
          <Input
            value={houseRatePlan.managementFeeUnitPrice}
            onChange={e => {
              setData('houseRatePlan', e.nativeEvent.text);
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>物业</Text>}
            rightIcon={<Text style={styles.label}>元每月</Text>}
          />
          <Input
            value={houseRatePlan.gasFeeUnitPrice}
            onChange={e => {
              setData('houseRatePlan', e.nativeEvent.text);
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>天然水</Text>}
            rightIcon={<Text style={styles.label}>元每立方</Text>}
          />
          <Input
            value={houseRatePlan.heatingFeeUnitPrice}
            onChange={e => {
              setData('houseRatePlan', e.nativeEvent.text);
            }}
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>暖气</Text>}
            rightIcon={<Text style={styles.label}>元每平方</Text>}
          />
        </View>

        <Text style={styles.title}>房屋描述</Text>
        <View style={[styles.common_content]}>
          <TextInput
            // value={houseAddition.description}
            // onChange={e => {
            //   setData('houseAddition', e.nativeEvent.text);
            // }}
            multiline={true}
            style={{margin: 10, height: 100}}
          />
        </View>
        <Text style={styles.title}>合租房间</Text>
        <View style={styles.house_content}>
          <Input
            value={roomName}
            onChangeText={setRoomName}
            placeholder="输入房间名，如南卧，主卧"
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>房间名</Text>}
            rightIcon={<Button title="添加" onPress={addRoom} />}
          />
        </View>
        {/* <Text>dgsgsg</Text> */}
        <Text>
          {rooms.length &&
            rooms.map((item, index) => {
              return <Text>{item}&nbsp;&nbsp;</Text>;
            })}
        </Text>

        {/* <View style={styles.house_content}>
          <Tags
            updateState={updateTagState}
            tags={tags}
            placeholder="输入房间名，如南卧、主卧"
            leftElement={<Text>房间名</Text>}
            leftElementContainerStyle={{marginLeft: 3}}
            containerStyle={{width: Dimensions.get('window').width - 40}}
            autoCorrect={false}
            tagStyle={styles.tag}
            tagTextStyle={styles.tagText}
            keysForTag={', '}
          />
        </View> */}
        <Text style={styles.title}>上传图片（最多9张）</Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          <ImageUpload />
          <ImageUpload />
          <ImageUpload />
          <ImageUpload />
          <ImageUpload />
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
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
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
