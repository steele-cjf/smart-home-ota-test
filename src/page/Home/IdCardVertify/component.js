import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Form from '../../Component/form';
import ImageUpload from '../../Component/imageUpload';
import { AppRoute } from '../../../navigator/AppRoutes';
import { Spinner, Content } from 'native-base'
import vertifyCn from '../config/IdCardVertifyCn';
import Theme from '../../../style/colors';
import HeaderCommon from '../../Component/HeaderCommon'

export default function IdCardVertifyPage(props) {
  const [formData, setFormData] = useState({});
  const [formImage, setFormImage] = useState([]);
  const [userId, setUserId] = useState('');
  const [oldData, setOldData] = useState({});
  const [loading, setLoading] = useState(false);
  // const [imageUrl1, setImageUrl1] = useState(''); 
  // const [imageUrl2, setImageUrl2] = useState(''); 
  // const [imageUrl3, setImageUrl3] = useState(''); 

  // 初始化获取用户信息
  useEffect(() => {
    setUId();
    getAuthInfo(); 
  }, []); //props.userInfo

  function setUId() {
    const {params} = props.route;
    if (params && params.userId) {
      setUserId(params.userId);
    } else {
      setUserId(props.userInfo.data.id)
    }
  }

  function getAuthInfo() {
    setLoading(true);

    var uId = props.userInfo.data.id;
    console.log('^^^^^^^^uId:', uId);
    const {params} = props.route;
    if (params && params.userId) {
      uId= params.userId;
      // console.log('*************');
    }

    props.getManualAuditInfo(uId, res => {
      setLoading(false);

      if (!res.code) {
        // console.log('*************res:', res);
        if (!(res.data)
          || (res.data.identificationType !== 'id_card')) { 
          return;
        }

        let {name, identificationNo, gender,  nation, birthDate, identificationAddress} = res.data;
        var oldData = {name, identificationNo, gender,  nation, birthDate, identificationAddress};
        if (!oldData.gender) {
          oldData.gender = 'male';
        }
        console.log(999, oldData);
        setOldData(Object.assign({}, oldData));
        setFormData(oldData);

        console.log('data.imageUrls***', res.data.imageUrls);

        // if (res.data.imageUrls && res.data.imageUrls[0]) {
        //   $getImage(res.data.imageUrls[0], uri => {
        //     setImageUrl1(uri);
        //   });
        // }
        // if (res.data.imageUrls && res.data.imageUrls[1]) {
        //   $getImage(res.data.imageUrls[1], uri => {
        //     setImageUrl2(uri);
        //   });
        // }
        // if (res.data.imageUrls && res.data.imageUrls[2]) {
        //   $getImage(res.data.imageUrls[2], uri => {
        //     setImageUrl3(uri);
        //   });
        // }

      } else {
        showToast("90909"+res.message);
      }
    });
  }


  // 检查并提交form
  const handleConfirm = () => {
    let message = '';

    let index = vertifyCn.findIndex(item => {
      return item.required && !formData[item.key];
    });
    message = vertifyCn[index] && vertifyCn[index].errorMsg[0];

    // console.log('****3:', formData);
    // if (formData) {
    //   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 

    //   var nowDateTime = new Date();
    //   var selDateTime = new Date(formData.birthDate);

    //   if (!reg.test(formData.identificationNo)) {
    //     message = '身份证输入不合法';
    //   } else if ( nowDateTime.getTime() < selDateTime.getTime()) {
    //     message = '出生日期不能大于当前日期';
    //   }
    // } 

    // if (!message) {
    //   // const imageUrls = [imageUrl1, imageUrl2, imageUrl3];
    //   console.log(111, formImage);

    //   for (var i = 0; i < 3; i++) {
    //     let item = formImage[i];
    //     if (!item) {
    //       message = '请上传三张图片';
    //       break;
    //     }
    //   }
    // }

    if (message) {
      showToast(message);
      return;
    }
    
    var result = new FormData();
    changeToForm(result);
    result.append('userId', userId);
    result.append('identificationType', 'id_card');
    setLoading(true);
    console.log('99userId: ', userId);
    
    props.verifyIdCard(result, res => {
      setLoading(false)
      if (!res.code) {
        showToast('提交成功');
        NavigatorService.navigate(AppRoute.VERDETAILS);
        //NavigatorService.goBack();

        const {params} = props.route;
        if (params && params.refreshStatus) {
          params.refreshStatus();
        }

      } else {
        console.log('^^^^^^^^^^^^');
        showToast(res.message)
      }
    })
  };

  // 修改成能提交的数据结构
  const changeToForm = (result) => {
    for (var index in formData) {
      result.append(index, formData[index]);
    }
    for (var i in formImage) {
      result.append('images', formImage[i]);
    }
  };

  const setImageForm = (type, obj) => {
    let data = Object.assign([], formImage);
    data[type] = obj;
    setFormImage(data);
  };

  const changeForm = data => {
    setFormData(data);
  };

  return (
    <View style={styles.container}>
      <HeaderCommon
        options={{
        backTitle: '返回',
        title: '身份证认证'
        }}
      />
      {loading ? <Spinner></Spinner> :
      <Content>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.textTitle}>基本资料</Text>
          <Form
            config={vertifyCn}
            class={styles.formBox}
            changeForm={changeForm}
            oldData={oldData}
          />
          <Text style={styles.textTitle}>照片上传</Text>
          <View style={styles.ImageUploadBox}>
            <ImageUpload
              title="身份证正面"
              setImageForm={obj => setImageForm(0, obj)}
              //imgUrl={imageUrl1}
            />
            <ImageUpload
              title="身份证反面"
              setImageForm={obj => setImageForm(1, obj)}
              // imgUrl={imageUrl2}
            />
            <ImageUpload
              title="手持身份证"
              setImageForm={obj => setImageForm(2, obj)}
              // imgUrl={imageUrl3}
            />
          </View>
          <TouchableOpacity style={styles.Btn} onPress={() => { handleConfirm(); }}>
            <Text style={styles.btnText}>确认</Text>
          </TouchableOpacity>
        </ScrollView>
      </Content>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: Theme.background,
  },
  textTitle: {
    fontSize: $screen.scaleSize(16),
    color: Theme.textDefault,
  },
  formBox: {
    paddingBottom: 16,
    marginTop: 10,
  },
  ImageUploadBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  Btn: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 50,
    marginTop: 100,
    marginBottom: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.primary,
  },
  btnText: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: $screen.scaleSize(16),
    color: '#FFFFFF',
  },
});
