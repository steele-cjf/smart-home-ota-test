import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

export default function HouseBaseInfo(props) {
  const {detail} = props;
  const [houseList] = useState([
    {title: '房源状态', key: 'status', content: 'single', type: 'text'},
    {title: '出租状态', key: 'rentStatus', content: 'single', type: 'text'},
    {title: '房屋所有人', key: 'self', content: 'single', type: 'text'},
    {
      title: '房产证照片',
      key: 'housePropertyCertificateImageUrl',
      content: 'photo',
      type: 'button',
    },

    {title: '建筑面积', key: '', content: 'area', type: 'text'},
    {title: '楼层', key: '', content: 'floor', type: 'text'},
    {title: '户型', key: '', content: 'houseType', type: 'text'},
  ]);

  return (
    <View style={props.class}>
      {houseList.map((data, index) => {
        switch (data.content) {
          case 'single':
            return (
              <View key={index} style={styles.item_content}>
                <Text style={styles.text_style}>{data.title}</Text>
                <Text style={styles.text_style}>{detail[data.key]}</Text>
              </View>
            );
          case 'photo':
            return (
              <View key={index} style={styles.item_content}>
                <Text style={styles.text_style}>{data.title}</Text>
                <Text style={styles.blue}>查看</Text>
              </View>
            );
          case 'area':
            return (
              <View key={index}>
                {/* <View style={styles.groupTitle} /> */}
                <View style={styles.item_content}>
                  <Text style={styles.text_style}>{data.title}</Text>
                  <Text style={styles.text_style}>
                    {detail.houseLayout.area}㎡
                  </Text>
                </View>
              </View>
            );
          case 'floor':
            return (
              <View key={index} style={styles.item_content}>
                <Text style={styles.text_style}>{data.title}</Text>
                <Text style={styles.text_style}>
                  第{detail.houseLayout.floor}层&nbsp;共
                  {detail.houseLayout.floorCount}层&nbsp;
                  {detail.hasElevator}
                </Text>
              </View>
            );
          case 'houseType':
            return (
              <View key={index} style={styles.item_content}>
                <Text style={styles.text_style}>{data.title}</Text>
                <Text style={styles.text_style}>
                  {detail.houseLayout.roomCount}室&nbsp;
                  {detail.houseLayout.hallCount}厅&nbsp;
                  {detail.houseLayout.toiletCount}卫
                </Text>
              </View>
            );
          default:
            return null;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  item_content: {
    // padding: 10,
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
  blue: {
    fontSize: 16,
    color: '#0d86ff',
  },
  title: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
  },
  groupTitle: {
    height: 10,
    backgroundColor: '#ccc',
  },
});
