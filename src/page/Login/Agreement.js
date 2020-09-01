import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from '../../style/colors';
import HeaderCommon from '../Component/HeaderCommon'

import {NativeModules, Dimensions, StatusBar} from 'react-native'; //test

export default AgreementPage = (props) => {

  //test1
  function submitInfo() {

    NativeModules.WifiInfo.getWifi((ssid) => {
      //返回结果
      console.log("******ssid: *****", ssid);
    });
    return;
  }

  const {width, height} = Dimensions.get('window');
  var v = Dimensions.get('window');
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
  console.log("{width, height}******", {width, height});
  console.log("v******", v);
  console.log("STATUS_BAR_HEIGHT******", STATUS_BAR_HEIGHT);


  const sp = "        ";

  const a = "本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，"
  const b = "本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。"
  const c = "除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。"
  const d = "您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。"

  const e = "(a) 在您注册本应用帐号时，您根据本应用要求提供的个人注册信息；\n"
  const f = "(b) 在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；"
  
  const g = "在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：\n"
  const h = "(a) 经您事先同意，向第三方披露；\n"
  const i = "(b)为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；\n"
  const j = "(c)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；\n"
  const k = "(d)如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；\n"
  const l = "(e)如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；"

  return(
    <View>  
      <HeaderCommon
        options={{
        backTitle: '返回',
        title: '房屋租赁服务协议'
        }}
      />
    <ScrollView>
      <Text style={styles.tipText}>
        {sp+a+b+c+d}
      </Text>
      <Text style={[styles.tipText, {fontSize: 18,}]}>
        {"1. 适用范围"}
      </Text>
      <Text style={styles.tipText}>
        {sp+e+sp+f}
      </Text>
      <Text style={[styles.tipText, {fontSize: 18}]}>
        {"2. 信息使用"}
      </Text>
      <Text style={styles.tipText}>
        {sp+g+sp+h}
      </Text>
      <Text style={[styles.tipText, {fontSize: 18}]}>
        {"3. 信息披露"}
      </Text>
      <Text style={styles.tipText}>
        {sp+g+sp+h+sp+i+sp+j+sp+k+sp+l}
      </Text>
      <Text style={[styles.tipText, {fontSize: 18}]}>
        {"4. 信息存储和交换"}
      </Text>
      <Text style={styles.tipText}>
        {sp+g+sp+h+sp+i+sp+j+sp+k+sp+l}
      </Text>


      {/* <Text>{'TestWifi' || '未能获取wifi'}</Text>
      <Text>{'' || '未能获取wifi'}</Text>
      <Text>{'' || ''}</Text>
      <Text>{0 || '未能获取wifi'}</Text> */}

      <TouchableOpacity style={styles.btnStyle} onPress={submitInfo}>
        <Text style={styles.btnTextStyle}>提交</Text>
      </TouchableOpacity>

    </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Theme.background,
  },
  tipText: {
    paddingTop: 8,
    fontSize: 14,
    color: Theme.textSecondary,
    borderRadius: 4,
    lineHeight: 20,
    backgroundColor: '#F0F0F0',
  },
  btnStyle: {
    marginTop: 40,
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