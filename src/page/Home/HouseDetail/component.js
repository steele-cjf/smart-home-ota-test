import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Switch} from 'react-native';
import {Button, Text} from 'react-native-elements';
import ImageUpload from '../../Component/imageUpload';
import {AppRoute} from '../../../navigator/AppRoutes';

function HouseDetail(props) {
  const [houseDetail, setHouseDetail] = useState([
    {title: '房源状态', content: '系统审核中', type: 'button'},
    {title: '房产证照片', content: '查看', type: 'button'},
    {title: '出租类型', content: '合租/整租', type: 'text'},
    {title: '户型', content: '三室一厅', type: 'text'},
    {title: '房屋所有者', content: '张三', type: 'text'},
  ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {houseDetail.map((result, index) => {
          return (
            <View style={styles.item_content}>
              <Text style={styles.text_style}>{result.title}</Text>
              <Text
                style={
                  result.type === 'button' ? styles.blue : styles.text_style
                }>
                {result.content}
              </Text>
            </View>
          );
        })}
        <Button
          title="修改"
          style={{paddingTop: 30}}
          onPress={() => props.navigation.navigate(AppRoute.RECORD)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  item_content: {
    padding: 10,
    paddingTop: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text_style: {
    fontSize: 16,
    color: '#555',
  },
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  blue: {
    fontSize: 16,
    color: '#555',
    color: '#0d86ff',
  },
  title: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
  },
});
export default HouseDetail;
