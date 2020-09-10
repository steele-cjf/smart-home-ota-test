import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {Spinner, Header, Button, Title, Left, Right, Icon, Body} from 'native-base';
import Theme from '../../../style/colors';
import {AppRoute} from '../../../navigator/AppRoutes'; 
import { ScrollView } from 'react-native-gesture-handler';

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
  null: {
    title: '服务返回认证状态null',
    reasonDesc: '',
    btnTitle: '',
  },
  'audit_pass': {
    title: '实名认证通过',
    reasonDesc: '与上级界面状态可能不一致，数据有误',
    btnTitle: '',
  },
}

export default function VertifyDetailsPage(props) {

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getAuthInfo(); 
    }, [])
  );

  //async function getAuthInfo() {
  function getAuthInfo() {
    // var info = await storage.get('info');
    // userId = info.id;  

    var info = props.userInfo;
    userId = info.data.id;

    const {params} = props.route;
    if (params && params.userId && userId !== params.userId) {
      userId = params.userId;
      setCanDelete(true);
    } else {
      setCanDelete(false); 
    }

    props.getManualAuditInfo(userId, res => {
      console.log('*******AuditInfo-kk:*******', res);
      setLoading(false);
      if (!res.code) {
        dealDataRefresh(res.data);
      } else {
        showToast(res.message);
      }
    });
  }

  function dealDataRefresh(data) { 
    var authStatus = data.auditStatus;      
  
    if (authStatus === 'audit_reject' && data.auditOpinions) {
      auth_status['audit_reject'].reasonDesc = data.auditOpinions;
    }

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

    setAuthStatus(authStatus);
    setAuthOptions(auth_status[authStatus]);
    setData(actualDataArr);

    console.log('data.imageUrls***', data.imageUrls);
    if (data.imageUrls && data.imageUrls[0]) {
      $getImage(data.imageUrls[0], res => {
        console.log(':&&&&&&&res: ', res);
        setImage1({uri: res.uri});
      }, true);
    }
    if (data.imageUrls && data.imageUrls[1]) {
      $getImage(data.imageUrls[1], res => {
        setImage2({uri: res.uri});
      }, true);
    }
    if (data.imageUrls && data.imageUrls[2]) {
      $getImage(data.imageUrls[2], res => {
        setImage3({uri: res.uri});
      }, true);
    }
  }

  function handleModify() {
    NavigatorService.navigate(AppRoute.AUTHENTICATION, {userId: userId, authStatus: authStatus});
  }

  function alertDelete() {
    Alert.alert('确定删除', '', [
      { text: '取消', onPress: () => console.log('Ask me later pressed')},
      { text: '确定', onPress: () => deleteTenant() },
      {
        // cancelable and onDismiss only work on Android.
        cancelable: true,
        onDismiss: () =>
          console.log(
            'This alert was dismissed by tapping outside of the alert dialog.'
          )
      }
    ]);
  }

  function deleteTenant() {
    const {params} = props.route;
    console.log("%%%%2222222222", params);
 
    const data = {
      userId: params.userId,
      houseId: params.houseId,
      tenantUserId: params.tenantUserId,
    };

    props.deleteTenant(data, res => {
      console.log('deleteTenant****kkkk:', res);

      if (!res.code) {
        showToast("删除成功");
        if (params.familyMember) {
          NavigatorService.goBack();
        } else {
          NavigatorService.navigate(AppRoute.HOUSEDETAIL);
        }
      } else {
        showToast(res.message);
      }
    });
  }

  function goBackOrTop() {
    const {params} = props.route;
    if (params && params.userId) {
      NavigatorService.goBack();
    } else {
      props.navigation.popToTop();
    }
  }

  const img = require('../../../assets/images/head.png');

  const [authStatus, setAuthStatus] = useState('audit_pending');
  const [authOptions, setAuthOptions] = useState(auth_status['audit_pending']); 
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [image1, setImage1] = useState(img); 
  const [image2, setImage2] = useState(img); 
  const [image3, setImage3] = useState(img); 
  const [canDelete, setCanDelete] = useState(false); 

  return (
    <View style={{flex: 1}}>
      <Header style={{backgroundColor: Theme.background, borderBottomColor: '#E9E9E9', height:44,}}>
        <Left>
          <Button transparent onPress={goBackOrTop} >
            <Icon name="md-chevron-back" style={{justifyContent: 'center'}}/>
            <Text style={[styles.headerText, {marginLeft: -7}]}>返回</Text>
          </Button>
        </Left> 
        <Body>
          <Title>实名详情</Title>
        </Body>
        <Right>
          <Button transparent onPress={handleModify}>
            <Text style={[styles.headerText]}>{authOptions.btnTitle}</Text>
          </Button>
        </Right>
      </Header>
      {loading ? <Spinner style={STYLES.spinner} color="#5C8BFF"/> :
      <ScrollView contentContainerStyle={styles.containerStyle}> 
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
          <Image style={styles.imageStyle} source={image1}/>  
          <Image style={styles.imageStyle} source={image2}/> 
          <Image style={styles.imageStyle} source={image3} /> 
        </View>
        {!canDelete ?  null :
          <TouchableOpacity style={styles.btnStyle} onPress={alertDelete}>
            <Text style={styles.btnTextStyle}>删除</Text>
          </TouchableOpacity>
        }
      </ScrollView> 
      }  
    </View>
  );
}

const styles = StyleSheet.create({  
  headerText: {
    color: '#527BDF', 
    fontSize: $screen.scaleSize(16),
    justifyContent: 'center', 
    paddingTop: 5, 
  },
  containerStyle: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: Theme.background,
  },
  topViewFail: {
    //height: 70, 
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#FFECEC',
  },
  topViewWait: {
    backgroundColor: '#ECF2FF',
  },
  topTextStyle1: {
    fontSize: $screen.scaleSize(16),
    color: Theme.textDefault,
  },
  topTextStyle2: {
    fontSize: $screen.scaleSize(14),
    color: Theme.textSecondary,
    marginTop: 10,
  },
  textTitle: {
    paddingVertical: 10,
    fontSize: $screen.scaleSize(14),
    color: Theme.textSecondary,
  },
  textContent: {
    position: 'absolute',
    left: 80,
    right: 0,
    paddingVertical: 10,
    textAlign: 'right',
    fontSize: $screen.scaleSize(14),
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
    // position: 'absolute',
    // left: 16,
    // right: 16,
    // bottom: 50,
    marginTop: 100,
    marginBottom: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E7263E'
  },
  btnTextStyle: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: $screen.scaleSize(16),
    color: '#FFFFFF',
  },
});
