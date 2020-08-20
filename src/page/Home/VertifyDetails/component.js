import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Spinner, Header, Button, Title, Left, Right, Icon, Body} from 'native-base';
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
  null: {
    title: '服务返回认证状态null',
    reasonDesc: '',
    btnTitle: '重新提交',
  },
  'audit_pass': {
    title: '实名认证通过',
    reasonDesc: '',
    btnTitle: 'Test',
  },
}

export default function VertifyDetailsPage(props) {

  function handleModify() {
    NavigatorService.navigate(AppRoute.AUTHENTICATION);
  }

  useEffect(() => {
    getAuthInfo(); 
  }, []);

  //async function getAuthInfo() {
  function getAuthInfo() {
    // var info = await storage.get('info');
    // userId = info.id;  

    var info = props.userInfo;
    let userId = info.data.id;

    const {params} = props.route;
    if (params && params.userId) {
      userId = params.userId;
    } 
    console.log('params******', params);
    console.log('userId******', userId);

    props.getManualAuditInfo(userId, res => {
      console.log('*******AuditInfo-kk:*******', res);
      setLoading(false);

      if (!res.code) {
        dealDataRefresh(res.data);
      } else {
        showToast("90909"+res.message);
      }
    });
  }

  //刷新为服务数据
  function dealDataRefresh(data) { 
    var authStatus = data.auditStatus;      
    console.log('authStatus********: ', authStatus);

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

    $getImage(data.imageUrls[0], uri => {
      setImageUrl1(uri);
    });
    $getImage(data.imageUrls[1], uri => {
      setImageUrl2(uri);
    });
    $getImage(data.imageUrls[2], uri => {
      setImageUrl3(uri);
    });
  }

  const [authStatus, setAuthStatus] = useState('audit_pending');
  const [authOptions, setAuthOptions] = useState(auth_status['audit_pending']); 
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [imageUrl1, setImageUrl1] = useState('https://facebook.github.io/react-native/docs/assets/favicon.png'); 
  const [imageUrl2, setImageUrl2] = useState('https://facebook.github.io/react-native/docs/assets/favicon.png'); 
  const [imageUrl3, setImageUrl3] = useState('https://facebook.github.io/react-native/docs/assets/favicon.png'); 

  return (
    <View style={{flex: 1}}>
      <Header style={{backgroundColor: Theme.background, borderBottomColor: '#E9E9E9', height:44,}}>
        <Left>
          <Button transparent onPress={() => NavigatorService.goBack()} >
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

      {loading ? <Spinner></Spinner> :
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
          <Image style={styles.imageStyle} source={{uri: imageUrl1}}/> 
          <Image style={styles.imageStyle} source={{uri: imageUrl2}}/> 
          <Image style={styles.imageStyle} source={{uri: imageUrl3}} /> 
        </View>
      </View> 
      }  
    </View>
  );
}

const styles = StyleSheet.create({  
  headerText: {
    color: '#527BDF', 
    fontSize: 16,
    justifyContent: 'center', 
    paddingTop: 5, 
  },
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
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
});
