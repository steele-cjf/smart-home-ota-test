import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Theme from '../../../style/colors';
import {AppRoute} from '../../../navigator/AppRoutes'; 


const dataArr = [
  {title: "真实姓名", content: "张三"},
  {title: "", content: "2389***************2"},
  {title: "性别", content: "男"},
  {title: "民族", content: "汉族"},
  {title: "出生日期", content: "1990-8-7"},
  {title: "", content: "广东省深圳市南山区 南海大道1057号科技大厦二期A座809890890890"},
];

const authType = 2;  //1:身份证认证;   2:护照认证
const authStatus = 2;  //1:认证失败;   2:认证中

export default function VertifyDetailsPage(props) {

  // const data = {
  //   mobile: mobile,
  //   verifyCode: verifyCode,
  // };
  // props.handleLogin(data, res => {
  //   if (!res.code) {
  //     storage.set('token', res.data.accessToken);
  //     storageDataDictionary();
  //     props.navigation.navigate(AppRoute.HOME);
  //   } else {
  //     showToast(res.message);
  //   }
  // });

  // 暂时写死
  // result.append('userId', '478609054946578432')
  // result.append('identificationType', 'id_card')

  // props.verifyIdCard(result, (res) => {
  //     console.log(res, 'end')
  //     showToast('success');
  // })

  // const data = {
  //   userId: '478609054946578432',
  // };
  // props.getManualAuditInfo(data, res => {
  //   console.log('code', res);
  //   if (!res.code) {
  //     showToast('成功！');
     
  //   } else {
  //     showToast(res.message);
  //   }
  // });

  

  function handlModify() {
    //test
    const data = {
      userId: '478609054946578432',
    };
    props.getManualAuditInfo(data, res => {
      //console.log('code', res);
      console.log(7777);
      console.log(8888, res.message);

      if (!res.code) {
        showToast('成功！');
      } else {
        showToast("90909"+res.message);
      }
    });

    // if (authType === 1) {
    //   props.navigation.navigate(AppRoute.IDCARDVERTIFY);
    // } else {
    //   props.navigation.navigate(AppRoute.PASSPORTVERTIFY);
    // }

  }

  let typeTitle, typeAddr;
  if (authType === 1) {
    typeTitle = '身份证号码';
    typeAddr = '身份证地址';
  } else {
    typeTitle = '护照号';
    typeAddr = '国籍';
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

  return (
    <View style={styles.containerStyle}> 
      <View style={[styles.topViewFail, authStatus === 2 && styles.topViewWait]}>
        <Text style={styles.topTextStyle1}>{topTitle1}</Text>
        <Text style={styles.topTextStyle2}>{topTitle2}</Text>
      </View> 
      {
        dataArr.map((item, index) => {
          if (index === 1) {
            item.title = typeTitle;
          } else if (index === 5) {
            item.title = typeAddr;
          }

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
