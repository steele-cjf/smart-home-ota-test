import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Theme from '../../style/colors';
import HeaderCommon from '../Component/HeaderCommon'

export default AboutPage = (props) => {


  const basicData = [
    {title: "联系电话", content: '123123432432123'},
    {title: "企业邮箱", content: '12312431433@qq.com'},
    {title: "官方网址", content: 'www.asdasdad123123.com'},
    {title: "客服微信", content: 'dasdasdasd'},
    {title: "地址", content: '深圳市市南区沿山社区网谷科技大厦501'},
  ];

  return(
    <View style={styles.containerStyle}>
      <HeaderCommon
        options={{
        backTitle: '返回',
        title: '关于我们'
        }}
      />
      <View style={styles.imageContainerStyle}>
        <Image style={styles.imageStyle} />
      </View>
      <Text style={[styles.textTitle, {color: Theme.textDefault, textAlign: 'center'}]}>房屋租赁v1.0</Text>
      {
        basicData.map((item, index) => { 
          return (
            <View>
              <Text style={styles.textTitle}>{item.title}</Text>
              <Text style={styles.textContent}>{item.content}</Text>
            </View>
          ); 
        })
      }
      <View style={styles.imageContainerStyle}>
        <Image style={[styles.imageStyle, {marginTop: 20, marginBottom: 2}]} />
      </View>
      <Text style={[styles.textTitle, {textAlign: 'center'}]}>公众号：fangwuzuling2020</Text>
    </View>

  );
}


const styles = StyleSheet.create({  
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Theme.background,
  },
  imageContainerStyle: {
    alignItems: 'center',
    marginTop: 24,
  },
  imageStyle: {
    height: 128, 
    width: 128,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  textTitle: {
    paddingVertical: 11,
    fontSize: 14,
    color: Theme.textSecondary,
  },
  textContent: {
    position: 'absolute',
    left: 80,
    right: 0,
    paddingVertical: 11,
    textAlign: 'right',
    fontSize: 14,
    color: Theme.textDefault,
  },
});