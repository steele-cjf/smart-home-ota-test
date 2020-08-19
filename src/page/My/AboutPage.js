import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Theme from '../../style/colors';

export default AboutPage = (props) => {


  const basicData = [
    {title: "联系电话", content: '123123432432123'},
    {title: "企业邮箱", content: '12312431433@qq.com'},
    {title: "官方网址", content: 'www.asdasdad123123.com'},
    {title: "客服微信", content: 'dasdasdasd'},
    {title: "地址", content: '深圳市市南区沿山社区 网谷科技大厦501'},
  ];

  return(
    
    <View style={styles.containerStyle}>
      <Image style={styles.headImageStyle} />
      <Text style={[styles.textTitle]}>房屋租赁v1.0</Text>
      {
        basicData.map((item, index) => { 
          return (
            <View>
              <Text style={[styles.textTitle, styles.colorSecondary]}>{item.title}</Text>
              <Text style={[styles.textContent, styles.colorSecondary]}>{item.content}</Text>
            </View>
          ); 
        })
      }
      <Image style={styles.headImageStyle} />
      <Text style={[styles.textTitle]}>公众号：fangwuzuling2020</Text>
    </View>

  );
}


const styles = StyleSheet.create({  
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Theme.background,
  },
  headContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  headImageStyle: {
    // position: 'absolute',
    // right: 28,
    height: 128, 
    width: 128,
    borderRadius: 4,
    backgroundColor: 'gray',
  },
  sigContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  textTitle: {
    paddingVertical: 18,
    fontSize: 14,
    color: Theme.textDefault,
  },
  fontSize16: {
    fontSize: 16,
  },
  colorSecondary: {
    color: Theme.textSecondary,
    paddingVertical: 10,
  },
  textContent: {
    position: 'absolute',
    left: 80,
    right: 0,
    paddingVertical: 18,
    textAlign: 'right',
    fontSize: 14,
    color: Theme.textDefault,
  },
  rightInput: {
    fontSize: 14,
    paddingRight: 24,
  },
  rightArrow: {
    position: 'absolute', 
    right: -3, 
    top: 17,
    fontSize: 14, 
    color: Theme.textSecondary, 
    textAlign: 'right',
  },
  btnStyle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5C8BFF'
  },
  btnTextStyle: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 16, 
    color: '#FFFFFF', 
  },
});