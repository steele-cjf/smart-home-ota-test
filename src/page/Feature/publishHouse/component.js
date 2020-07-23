/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Picker,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Input} from 'react-native-elements';
import ImageUpload from '../../Component/imageUpload';
import {AppRoute} from '../../../navigator/AppRoutes';
import {TextInput} from 'react-native-gesture-handler';

export default function PublishHouse(props) {
  const [list1, setList] = useState([
    {
      label: '毛呸',
      selected: true,
      code: 1,
    },
    {
      label: '简单装修',
      selected: false,
      code: 2,
    },
    {
      label: '精装修',
      selected: false,
      code: 3,
    },
    {
      label: '豪华装修',
      selected: false,
      code: 4,
    },
  ]);
  const [list2, setList2] = useState([
    {
      label: '冰箱',
      selected: true,
      code: 1,
    },
    {
      label: '空调',
      selected: false,
      code: 2,
    },
    {
      label: '洗衣机',
      selected: false,
      code: 3,
    },
    {
      label: '热水器',
      selected: false,
      code: 4,
    },
    {
      label: '沙发',
      selected: false,
      code: 13,
    },
    {
      label: '电视',
      selected: false,
      code: 24,
    },
    {
      label: '燃气灶',
      selected: false,
      code: 33,
    },
    {
      label: '电磁炉',
      selected: false,
      code: 34,
    },
    {
      label: '抽烟机',
      selected: false,
      code: 14,
    },
    {
      label: '微波炉',
      selected: false,
      code: 43,
    },
    {
      label: '暖气',
      selected: false,
      code: 41,
    },
    {
      label: '天然气',
      selected: false,
      code: 42,
    },
    {
      label: '桌椅',
      selected: false,
      code: 31,
    },
    {
      label: '衣柜',
      selected: false,
      code: 44,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  function handleSelect(item, i) {
    const newList = Object.assign([], list1);
    newList[i].selected = !item.selected;
    setList2(newList);
  }

  function _labelItem(list) {
    return (
      <View style={styles.flex_box}>
        {list.map((item, i) => {
          return (
            <TouchableOpacity
              style={[
                styles.label_style,
                item.selected ? styles.selected_bgColor : '',
              ]}
              onPress={() => handleSelect(item, i)}>
              <Text style={[item.selected ? styles.selected_color : '']}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>室内设施</Text>
        <View style={styles.house_content}>
          <Text
            style={styles.label}
            onPress={() => setModalVisible(!modalVisible)}>
            装修类型
          </Text>
          <View style={{padding: 15}}>{_labelItem(list1)}</View>
          <View style={styles.line} />
          <View style={{padding: 15}}>{_labelItem(list2)}</View>
        </View>

        <Text style={styles.title}>房屋亮点</Text>
        <View style={styles.house_content}>
          <View style={{padding: 15}}>{_labelItem(list2)}</View>
        </View>

        <Text style={styles.title}>出租要求</Text>
        <View style={styles.house_content}>
          <View style={{padding: 15}}>{_labelItem(list2)}</View>
        </View>

        <Text style={styles.title}>相关费用</Text>
        <View style={styles.house_content}>
          <Input
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>水费</Text>}
            rightIcon={<Text style={styles.label}>元每吨</Text>}
          />
          <Input
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>电费</Text>}
            rightIcon={<Text style={styles.label}>元每度</Text>}
          />
          <Input
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>宽带</Text>}
            rightIcon={<Text style={styles.label}>元每月</Text>}
          />
          <Input
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>物业</Text>}
            rightIcon={<Text style={styles.label}>元每月</Text>}
          />
          <Input
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>天然水</Text>}
            rightIcon={<Text style={styles.label}>元每立方</Text>}
          />
          <Input
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>暖气</Text>}
            rightIcon={<Text style={styles.label}>元每平方</Text>}
          />
        </View>

        <Text style={styles.title}>房屋描述</Text>
        <View style={styles.house_content}>
          <TextInput multiline={true} style={{margin: 10, height: 100}} />
        </View>

        <Text style={styles.title}>合租房间</Text>
        <View style={styles.house_content}>
          <Input
            placeholder="输入房间名，如南卧，主卧"
            inputStyle={styles.input_content}
            leftIcon={<Text style={styles.label}>房间名</Text>}
            rightIcon={<Button title="添加" />}
          />
        </View>
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
          onPress={() => props.navigation.navigate(AppRoute.HOUSEDETAIL)}
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
  house_content: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e2e3',
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
