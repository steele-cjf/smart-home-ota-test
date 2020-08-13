import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { Spinner } from 'native-base'
import Theme from '../../../style/colors';
import {AppRoute} from '../../../navigator/AppRoutes'; 

const auth_status = {
  'audit_reject': {
    title: '实名认证审核失败',
    reasonDesc: '证件与本人不符，请修改',
    btnTitle: '重新提交',
  },
  'audit_pending': {
      title: '实名认证审核中',
      reasonDesc: '约两个工作日内完成审核',
      btnTitle: '修改',
  },
}

export default function VertifyDetailsPage(props) {

  //请求数据
  //getAuthInfo();

  //test
  function goPersonalInfo() {
    props.navigation.navigate(AppRoute.PERSONALINFO);
  }  

  function handleModify() {
    props.navigation.navigate(AppRoute.AUTHENTICATION);
  }

  //async function getAuthInfo() {
  function getAuthInfo() {
    // var info = await storage.get('info');
    // userId = info.id;
    var info = props.userInfo;
    userId = info.data.id;

    props.getManualAuditInfo(userId, res => {
      console.log('AuditInfo-kk:', res);
      setLoading(false);

      if (!res.code) {
        showToast('成功！');
        dealDataRefresh(res.data);
      } else {
        showToast("90909"+res.message);
      }
    });
  }

  //刷新为服务数据
  function dealDataRefresh(data) { 
    var auditStatus = data.auditStatus;      
    
    var sex = props.dictionaryMappings.gender[data.gender];
    let actualDataArr;
    if (data.identificationType === 'id_card') { 
      actualDataArr = [   
        {title: "真实姓名", content: data.name},
        {title: "身份证号码", content: data.identificationNo},
        {title: "性别", content: sex},
        {title: "民族", content: data.nation},
        {title: "出生日期", content: data.birthDate},
        {title: "身份证地址", content: data.identificationAddress}, 
      ];
    } else {
      actualDataArr = [
        {title: "真实姓名", content: data.name},
        {title: "护照号", content: data.identificationNo},
        {title: "性别", content: sex},
        {title: "出生日期", content: data.birthDate},
        {title: "国籍", content: data.country}, 
      ];
    }

    setAuthStatus(auditStatus);
    setAuthOptions(auth_status[auditStatus]);
    setData(actualDataArr);
  }

  const [authStatus, setAuthStatus] = useState('audit_pending');
  const [authOptions, setAuthOptions] = useState(auth_status['audit_pending']); 
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);

  return (
    loading ? <Spinner></Spinner> :
    <View style={styles.containerStyle}> 
      <View style={[styles.topViewFail, authStatus === 'audit_pending' && styles.topViewWait]}>
        <Text style={styles.topTextStyle1}>{authOptions.title}</Text>
        <Text style={styles.topTextStyle2}>{authOptions.reasonDesc}</Text>
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
      
      <TouchableOpacity style={[styles.btnStyle, styles.btnStyle3]} onPress={goPersonalInfo}> 
        <Text style={styles.btnTextStyle}>进入个人中心</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btnStyle, styles.btnStyle2]} onPress={getAuthInfo}> 
        <Text style={styles.btnTextStyle}>请求服务数据刷新</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnStyle} onPress={handleModify}> 
        <Text style={styles.btnTextStyle}>{authOptions.btnTitle}</Text>
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
  btnStyle2: {
    bottom: 110,
  },
  btnStyle3: {
    bottom: 170,
  },
  btnTextStyle: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 16, 
    color: '#FFFFFF', 
  },
});
