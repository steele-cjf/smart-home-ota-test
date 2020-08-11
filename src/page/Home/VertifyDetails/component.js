import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Theme from '../../../style/colors';
import {AppRoute} from '../../../navigator/AppRoutes'; 


export default function VertifyDetailsPage(props) {

  //async function handlModify() {
  function handlModify() {
    //路由到其他界面
    // if (authType === 1) {
    //   props.navigation.navigate(AppRoute.IDCARDVERTIFY);
    // } else {
    //   props.navigation.navigate(AppRoute.PASSPORTVERTIFY);
    // }

    //请求数据
    // var info = await storage.get('info');
    // userId = info.id;
    var info = props.userInfo;
    userId = info.data.id;

    props.getManualAuditInfo(userId, res => {
      console.log('code-res-kk:', res);
      console.log(8888, res.message);

      if (!res.code) {
        showToast('成功！');
        dealDataRefresh(res.data);
      } else {
        showToast("90909"+res.message);
      }
    });

    //test 模拟刷新成服务数据
    // const rightContentData = {
    // name: '莉丝', identificationType: 2, identificationNo: '7878787887887887',  
    // gender: '女', nation: '哈哈族', birthDate: '1990-09-09',
    // identificationAddress : '海南省看电视看风景看酸辣粉是对抗肌肤开始地方端口克林顿的多的是 111',
    // country: '法国',
    // };
    // dealDataRefresh(rightContentData);  
  }

  //刷新为服务数据
  function dealDataRefresh(data) { 
    let actualDataArr;
    if (data.identificationType === 1) {
      actualDataArr = [   
        {title: "真实姓名", content: data.name},
        {title: "身份证号码", content: data.identificationNo},
        {title: "性别", content: data.gender},
        {title: "民族", content: data.nation},
        {title: "出生日期", content: data.birthDate},
        {title: "身份证地址", content: data.identificationAddress}, 
      ];
    } else {
      actualDataArr = [
        {title: "真实姓名", content: data.name},
        {title: "护照号", content: data.identificationNo},
        {title: "性别", content: data.gender},
        {title: "出生日期", content: data.birthDate},
        {title: "国籍", content: data.userId},  //data.country lyq test
      ];
    }

    console.log('*********************', actualDataArr);
    setData(actualDataArr);
  }

  //初始化默认数据（因服务数据暂缺）
  const authType = 1;  //1:身份证认证;   2:护照认证
  const authStatus = 2;  //1:认证失败;   2:认证中

  let dataArr;
  if (authType === 1) {
    dataArr = [
      {title: "真实姓名", content: "张三"},
      {title: "身份证号码", content: "2389***************2"},
      {title: "性别", content: "男"},
      {title: "民族", content: "汉族"},
      {title: "出生日期", content: "1990-8-7"},
      {title: "身份证地址", content: "广东省深圳市南山区 南海大道1057号科技大厦二期A座809890890890"},
    ];
  } else {
    dataArr = [
      {title: "真实姓名", content: "张三"},
      {title: "护照号", content: "2389***************2"},
      {title: "性别", content: "男"},
      {title: "出生日期", content: "1990-8-7"},
      {title: "国籍", content: "广东省深圳市南山区 南海大道1057号科技大厦二期A座809890890890"},
    ];
  }

  let topTitle1, topTitle2, btnTitle;
  if (authStatus === 1) {
    topTitle1 = '实名认证审核失败';
    topTitle2 = '证件与本人不符，请修改';
    btnTitle = '重新提交';
  } else {
    topTitle1 = '实名认证审核中';
    topTitle2 = '约两个工作日内完成审核';
    btnTitle = '修改';
  } 


  const [data, setData] = useState(dataArr);

  return (
    <View style={styles.containerStyle}> 
      <View style={[styles.topViewFail, authStatus === 2 && styles.topViewWait]}>
        <Text style={styles.topTextStyle1}>{topTitle1}</Text>
        <Text style={styles.topTextStyle2}>{topTitle2}</Text>
      </View> 
      {
        data.map((item, index) => { 
          return (
            <View>
              <Text style={styles.textTitle}>{item.title}</Text>
              <Text style={styles.textContent} numberOfLines={2} ellipsizeMode={'tail'}>{item.content}</Text>
            </View>
          ); 
        })
      }
      <Text style={[styles.topTextStyle1, styles.space]}>{'照片上传'}</Text> 
      <View style={styles.ImageBox}>
        <Image style={styles.imageStyle} source={{uri:'blob:CF57F991-A050-4ED4-A8B0-4C7FB817663A?offset=0&size=221112',}}/> 
        <Image style={styles.imageStyle} source={{uri:'blob:CF57F991-A050-4ED4-A8B0-4C7FB817663A?offset=0&size=221112',}}/> 
        <Image style={styles.imageStyle} source={{uri:'blob:CF57F991-A050-4ED4-A8B0-4C7FB817663A?offset=0&size=221112',}}/> 
      </View>

      <TouchableOpacity style={styles.btnStyle} onPress={handlModify}> 
        <Text style={styles.btnTextStyle}>{btnTitle}</Text>
      </TouchableOpacity>

    </View>
  );

}

const styles = StyleSheet.create({  
  containerStyle: {
    flex: 1,
    padding: 16,
    backgroundColor: Theme.background,
  },
  topViewFail: {
    height: 70, 
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#FFECEC',
  },
  topViewWait: {
    backgroundColor: '#ECF2FF',
  },
  topTextStyle1: {
    fontSize: 16,
    color: Theme.textDefault,
  },
  topTextStyle2: {
    fontSize: 14,
    color: Theme.textSecondary,
    marginTop: 10,
  },
  textTitle: {
    paddingVertical: 10,
    fontSize: 14,
    color: Theme.textSecondary,
  },
  textContent: {
    position: 'absolute',
    left: 80,
    right: 0,
    paddingVertical: 10,
    textAlign: 'right',
    fontSize: 14,
    color: Theme.textDefault,
  },
  space: {
    marginTop: 45,
  },
  ImageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  imageStyle: {
    width: 116,
    height: 87,
    resizeMode: 'cover',
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: 4,
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
