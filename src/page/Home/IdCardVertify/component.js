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
  const [formImages, setFormImages] = useState(['', '', '']);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  // 初始化获取用户信息
  useEffect(() => {
    setUId();
    getAuthInfo();
  }, []); //props.userInfo

  function setUId() {
    const { params } = props.route;
    if (params && params.userId) {
      setUserId(params.userId);
    } else {
      setUserId(props.userInfo.data.id)
    }
  }

  function getAuthInfo() {
    setLoading(true);

    var uId = props.userInfo.data.id;

    const { params } = props.route;
    if (params && params.userId) {
      uId = params.userId;
    }

    props.getManualAuditInfo(uId, res => {
      console.log("1111111res1", res);
      setLoading(false);

      if (res.code === 0) {
        if (!(res.data)
          || (res.data.identificationType !== 'id_card')) {
          return;
        }

        let { name, identificationNo, gender, nation, birthDate, identificationAddress } = res.data;
        var oldData = { name, identificationNo, gender, nation, birthDate, identificationAddress };
        if (!oldData.gender) {
          oldData.gender = 'male';
        }
        setFormData(oldData);

        let imgs = [];
        if (res.data.imageUrls && res.data.imageUrls.length) {
          res.data.imageUrls.map((item, index) => {
            $getImage(item, response => {
              let data = Object.assign([], imgs);
              data[index] = response;
              setFormImages(data);

              imgs[index] = response;
              //setFormImages(imgs);
            }, true)
          })
        }

      } else {
        console.log("222222222res2", res);
        showToast(res.message);
      }
    });
  }


  // 检查并提交form
  const handleConfirm = () => {
    let message = '';
    console.log(111, formImages);

    let index = vertifyCn.findIndex(item => {
      return item.required && !formData[item.key];
    });
    message = vertifyCn[index] && vertifyCn[index].errorMsg[0];

    console.log('****3:', formData);
    if (formData) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

      var nowDateTime = new Date();
      var selDateTime = new Date(formData.birthDate);

      if (!reg.test(formData.identificationNo)) {
        message = '身份证输入不合法';
      } else if (nowDateTime.getTime() < selDateTime.getTime()) {
        message = '出生日期不能大于当前日期';
      }
    }

    if (!message) {
      console.log(111, formImages);

      for (var i = 0; i < 3; i++) {
        let item = formImages[i];
        if (!item) {
          message = '请上传三张图片';
          break;
        }
      }
    }

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

    const controller = new AbortController(); //test
    const { signal } = controller;
    console.log('^^^^^^^^^', controller);
   // console.log('!!!!!!!!!!!!', {signal});

    props.verifyIdCard(result, res => {
      console.log('^^^^^^res1',res)
      setLoading(false)
      if (res.code === 0) {
        showToast('提交成功');
        NavigatorService.navigate(AppRoute.VERDETAILS);
       
        const { params } = props.route;
        if (params && params.refreshStatus) {
          params.refreshStatus();
        }

      } else {
        console.log('^^^^^^res2',res)
        if (res === "timeout" || res.message === "Network request failed") {
          //showToast('网络请求失败')
        } else {
          showToast(res.message)
        }
      }
    })
  };

  // 修改成能提交的数据结构
  const changeToForm = (result) => {
    for (var index in formData) {
      result.append(index, formData[index]);
    }
    for (var i in formImages) {
      result.append('images', formImages[i]);
    }
  };

  const changeForm = data => {
    setFormData(data);
  };

  const setImageForm = (index, obj) => {
    let data = Object.assign([], formImages);
    data[index] = obj;
    setFormImages(data);
  };

  return (
    loading ? <Spinner style={STYLES.spinner} color="#5C8BFF"/> :
    <View style={styles.container}>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '身份证认证'
        }}
      />
      <Content>
        <ScrollView bounces={false} contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.textTitle}>基本资料</Text>
          <Form
            config={vertifyCn}
            class={styles.formBox}
            changeForm={changeForm}
            oldData={formData}
          />
          <Text style={styles.textTitle}>照片上传</Text>
          <View style={styles.ImageUploadBox}>
            <ImageUpload
              title="身份证正面"
              setImageForm={obj => setImageForm(0, obj)}
              //handlerDelete={() => deleteImage(0)}
              imgUrl={formImages[0] && formImages[0].uri}
            />
            <ImageUpload
              title="身份证反面"
              setImageForm={obj => setImageForm(1, obj)}
              //handlerDelete={() => deleteImage(1)}
              imgUrl={formImages[1] && formImages[1].uri}
            />
            <ImageUpload
              title="手持身份证"
              setImageForm={obj => setImageForm(2, obj)}
              //handlerDelete={() => deleteImage(2)}
              imgUrl={formImages[2] && formImages[2].uri}
            />
          </View>
          <TouchableOpacity style={styles.Btn} onPress={() => { handleConfirm(); }}>
            <Text style={styles.btnText}>确认</Text>
          </TouchableOpacity>
        </ScrollView>
      </Content>
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
