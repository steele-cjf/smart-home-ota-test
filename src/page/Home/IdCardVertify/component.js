import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import Form from '../../Component/form';
import ImageUpload from '../../Component/imageUpload';
// import {AppRoute} from '../../../navigator/AppRoutes';

import vertifyCn from '../config/IdCardVertifyCn';
export default function IdCardVertifyPage(props) {
  const [formData, setFormData] = useState({});
  const [formImage, setFormImage] = useState([]);

  // 检查并提交form
  const handleConfirm = () => {
    let message = ''
    let key = vertifyCn.findIndex((item) => { return (item.required && !formData[item.key]) })
    message = vertifyCn[key] && vertifyCn[key].errorMsg[0]

    if (!message) {
      for(var i = 0; i < 3; i++) {
        let item = formImage[i]
        if (!item) {
          message = '请上传图片'
          continue;
        }
      }
    }
    
    if (message) {
      showToast(message);
      return;
    }
    var result = new FormData()
    changeToForm(result)
    // 暂时写死
    result.append('userId', '478609054946578432')
    result.append('identificationType', 'id_card')

    props.verifyIdCard(result, (res)=> {
      console.log(res, 'end')
      showToast('success');
    })
    // props.navigation.navigate(AppRoute.UNRECORD);
  };
  // 修改成能提交的数据结构
  const changeToForm = (result) => {
    for (var index in formData) {
      result.append(index, formData[index])
    }
    for(var i in formImage) {
      result.append('images', formImage[i])
    }
  }
  const setImageForm = (type, obj) => {
    let data = Object.assign([], formImage)
    data[type] = obj
    setFormImage(data)
  }
  const changeForm = data => {
    setFormData(data);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.font18}>基本资料</Text>
        <Form
          config={vertifyCn}
          class={styles.formBox}
          changeForm={changeForm}
        />
        <Text style={[styles.font18, styles.title]}>照片上传</Text>
        <View style={styles.ImageUploadBox}>
          <ImageUpload title="身份证正面" setImageForm={(obj) => setImageForm(0, obj)} />
          <ImageUpload title="身份证反面" setImageForm={(obj) => setImageForm(1, obj)} />
          <ImageUpload title="手持身份证" setImageForm={(obj) => setImageForm(2, obj)} />
        </View>
        <Button
          title="确认"
          style={styles.Btn}
          onPress={() => {
            handleConfirm();
          }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 18,
  },
  scrollContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  font18: {
    fontSize: 18,
  },
  title: {
    marginTop: 20,
    paddingVertical: 20,
  },
  formBox: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 0,
    marginTop: 10,
  },
  ImageUploadBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Btn: {
    marginTop: 40,
    marginBottom: 60,
  },
});
